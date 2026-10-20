import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import type {
  PDFDocumentProxy,
  PDFDocumentLoadingTask,
  PDFPageProxy,
  RenderTask,
} from 'pdfjs-dist';
import { Region } from './detector';
import { VIDEO_LIBRARY } from './video-library';
import { PDF_LIBRARY, LibraryEntry } from './pdf-library';

@Component({ selector: 'app-root', templateUrl: './app.html', styleUrl: './app.css' })
export class App implements OnDestroy {
  readonly sections = [
    { id: 'pdf', label: 'PDF Library', panel: 'pdf-library' },
    { id: 'videos', label: 'Video Library', panel: 'video-library' },
    { id: 'local', label: 'Open local file', panel: 'local-panel' },
    { id: 'help', label: 'Help', panel: 'help-panel' },
  ] as const;
  readonly activeTab = signal<'pdf' | 'videos' | 'local' | 'help'>('local');
  selectTab(tab: 'pdf' | 'videos' | 'local' | 'help') {
    this.closeDetail();
    if (tab !== 'pdf') this.cancelLibraryRequest();
    this.activeTab.set(tab);
    this.libraryVisible.set(tab === 'pdf');
    this.videosVisible.set(tab === 'videos');
  }
  tabKey(event: KeyboardEvent) {
    const current = this.sections.findIndex((section) => section.id === this.activeTab());
    let next: number;
    switch (event.key) {
      case 'ArrowRight':
        next = (current + 1) % this.sections.length;
        break;
      case 'ArrowLeft':
        next = (current + this.sections.length - 1) % this.sections.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = this.sections.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    this.selectTab(this.sections[next].id);
    document.getElementById('tab-' + this.sections[next].id)?.focus();
  }

  readonly videos = VIDEO_LIBRARY;
  readonly videosVisible = signal(false);
  toggleVideos() {
    this.selectTab('videos');
  }
  readonly library = PDF_LIBRARY;
  readonly libraryVisible = signal(false);
  readonly libraryQuery = signal('');
  readonly libraryLoading = signal<string | null>(null);
  readonly libraryError = signal('');
  readonly documentOrigin = signal<'local' | 'library'>('local');
  readonly filteredLibrary = computed(() =>
    this.library.filter((entry) =>
      entry.title.toLowerCase().includes(this.libraryQuery().trim().toLowerCase()),
    ),
  );
  private libraryRequest?: AbortController;

  toggleLibrary() {
    this.selectTab('pdf');
  }
  cancelLibraryRequest() {
    this.libraryRequest?.abort();
    this.libraryRequest = undefined;
    this.libraryLoading.set(null);
  }
  async openLibrary(entry: LibraryEntry) {
    this.cancelLibraryRequest();
    const request = new AbortController();
    this.libraryRequest = request;
    this.libraryLoading.set(entry.file);
    this.libraryError.set('');
    try {
      const url = new URL(`library/${encodeURIComponent(entry.file)}`, document.baseURI);
      const response = await fetch(url, { signal: request.signal });
      if (!response.ok) throw new Error('PDF unavailable');
      const blob = await response.blob();
      const signature = await blob.slice(0, 1024).text();
      if (!signature.includes('%PDF-')) throw new Error('Invalid PDF response');
      if (this.libraryRequest !== request || request.signal.aborted) return;
      this.libraryRequest = undefined;
      this.libraryLoading.set(null);
      this.libraryVisible.set(false);
      await this.open(new File([blob], entry.file, { type: 'application/pdf' }), 'library');
    } catch {
      if (this.libraryRequest !== request || request.signal.aborted) return;
      this.libraryError.set(
        'Could not load this library PDF. Check your connection and try again.',
      );
    } finally {
      if (this.libraryRequest === request) {
        this.libraryRequest = undefined;
        this.libraryLoading.set(null);
      }
    }
  }
  @ViewChild('pageCanvas', { static: true }) private pageCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('detailCanvas', { static: true }) private detailCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('detailViewport', { static: true })
  private detailViewport!: ElementRef<HTMLDivElement>;
  @ViewChild('closeButton', { static: true }) private closeButton!: ElementRef<HTMLButtonElement>;
  readonly fileName = signal('');
  readonly page = signal(1);
  readonly pageCount = signal(0);
  readonly busy = signal(false);
  readonly searching = signal(false);
  readonly detailBusy = signal(false);
  readonly error = signal('');
  readonly detectionError = signal('');
  readonly regions = signal<Region[]>([]);
  readonly selected = signal<number | null>(null);
  readonly showFrames = signal(true);
  readonly dragging = signal(false);
  readonly pageWidth = signal(800);
  readonly pageZoom = signal(1);
  readonly ratio = signal(1);
  readonly zoom = signal(1);
  readonly brightness = signal(1);
  readonly contrast = signal(1);
  readonly passwordNeeded = signal(false);
  readonly passwordHint = signal('');
  readonly filter = computed(() => `brightness(${this.brightness()}) contrast(${this.contrast()})`);
  readonly boardLabel = computed(() =>
    this.regions().length ? `${this.regions().length} diagrams on this page` : 'No diagrams found',
  );
  private pdf?: PDFDocumentProxy;
  private loading?: PDFDocumentLoadingTask;
  private bitmap?: ImageBitmap;
  private source?: HTMLCanvasElement;
  private worker?: Worker;
  private workerTimer?: ReturnType<typeof setTimeout>;
  private renders = new Set<RenderTask>();
  private cached = new Map<number, Region[]>();
  private revision = 0;
  private detailRevision = 0;
  private rotation = 0;
  private returnFocus?: HTMLElement;
  private passwordCallback?: (password: string | Error) => void;
  private resizeTimer?: ReturnType<typeof setTimeout>;
  private pointer?: { x: number; y: number; left: number; top: number };
  private touches = new Map<number, { x: number; y: number }>();
  private pinch?: { distance: number; zoom: number };

  async choose(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (file) await this.open(file);
  }
  dragOver(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'copy';
    this.dragging.set(true);
  }
  async drop(event: DragEvent) {
    event.preventDefault();
    this.dragging.set(false);
    if (event.dataTransfer?.files[0]) await this.open(event.dataTransfer.files[0]);
  }
  async open(file: File, origin: 'local' | 'library' = 'local') {
    this.cancelLibraryRequest();
    if (!/\.(pdf|png|jpe?g|webp)$/i.test(file.name)) {
      this.error.set('Choose a PDF, PNG, JPEG or WebP file.');
      return;
    }
    if (file.size > 100 * 1024 * 1024) {
      this.error.set('Maximum file size is 100 MB.');
      return;
    }
    this.disposeDocument();
    const token = ++this.revision;
    this.busy.set(true);
    this.error.set('');
    this.detectionError.set('');
    this.selectTab('local');
    this.fileName.set(file.name);
    this.videosVisible.set(false);
    this.documentOrigin.set(origin);
    this.libraryVisible.set(false);
    this.pageCount.set(0);
    this.regions.set([]);
    this.rotation = 0;
    this.pageZoom.set(1);
    this.page.set(1);
    try {
      if (/\.pdf$/i.test(file.name)) {
        const pdfjs = await import('pdfjs-dist');
        if (token !== this.revision) return;
        pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs/pdf.worker.min.mjs';
        const bytes = new Uint8Array(await file.arrayBuffer());
        if (token !== this.revision) return;
        const loading = pdfjs.getDocument({
          data: bytes,
          cMapUrl: 'pdfjs/cmaps/',
          cMapPacked: true,
          standardFontDataUrl: 'pdfjs/standard_fonts/',
          wasmUrl: 'pdfjs/wasm/',
        });
        this.loading = loading;
        loading.onPassword = (callback: (password: string | Error) => void, reason: number) => {
          if (token !== this.revision) return;
          this.passwordCallback = callback;
          this.passwordHint.set(
            reason === 2
              ? 'Incorrect password. Please try again.'
              : 'This PDF is password protected.',
          );
          this.passwordNeeded.set(true);
          setTimeout(() => document.getElementById('pdf-password')?.focus());
        };
        const pdf = await loading.promise;
        if (token !== this.revision) {
          await loading.destroy();
          return;
        }
        this.pdf = pdf;
        if (pdf.numPages > 500)
          throw new Error('This PDF has more than 500 pages. Open a smaller document.');
        this.pageCount.set(pdf.numPages);
      } else {
        const bitmap = await createImageBitmap(file);
        if (token !== this.revision) {
          bitmap.close();
          return;
        }
        if (bitmap.width * bitmap.height > 40_000_000) {
          bitmap.close();
          throw new Error('This image exceeds 40 megapixels. Please resize it.');
        }
        this.bitmap = bitmap;
        this.pageCount.set(1);
      }
      if (token === this.revision) await this.renderPage();
    } catch (e) {
      if (token !== this.revision) return;
      this.error.set(
        e instanceof Error && /500|megapixel/.test(e.message)
          ? e.message
          : 'Could not open the file. Check that it is a valid, supported document.',
      );
      this.disposeDocument();
      this.pageCount.set(0);
      this.busy.set(false);
      this.passwordNeeded.set(false);
    }
  }
  submitPassword(value: string) {
    if (!value) return;
    this.passwordNeeded.set(false);
    this.passwordCallback?.(value);
  }
  cancelPassword() {
    this.passwordNeeded.set(false);
    this.disposeDocument();
    this.revision++;
    this.busy.set(false);
    this.pageCount.set(0);
    this.error.set('Opening PDF cancelled.');
  }

  async changePage(value: number) {
    if (!Number.isInteger(value) || value < 1 || value > this.pageCount() || value === this.page())
      return;
    this.closeDetail();
    this.page.set(value);
    await this.renderPage();
  }
  async rotate() {
    if (!this.pageCount() || this.busy()) return;
    this.closeDetail();
    this.rotation = (this.rotation + 90) % 360;
    this.cached.clear();
    await this.renderPage();
  }
  private async renderPage() {
    const token = ++this.revision;
    this.stopDetection();
    this.cancelRenders();
    this.busy.set(true);
    this.error.set('');
    this.regions.set([]);
    this.detectionError.set('');
    try {
      let canvas: HTMLCanvasElement;
      if (this.pdf) {
        const page = await this.pdf.getPage(this.page());
        if (token !== this.revision) return;
        const base = page.getViewport({ scale: 1, rotation: (page.rotate + this.rotation) % 360 });
        const scale = Math.min(2.5, 2000 / Math.max(base.width, base.height));
        canvas = await this.renderPdf(page, scale);
      } else if (this.bitmap) {
        const image = this.bitmap,
          sideways = this.rotation % 180 !== 0;
        const w = sideways ? image.height : image.width,
          h = sideways ? image.width : image.height;
        const scale = Math.min(1, 2000 / Math.max(w, h));
        canvas = document.createElement('canvas');
        canvas.width = Math.round(w * scale);
        canvas.height = Math.round(h * scale);
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(
          image,
          (-image.width * scale) / 2,
          (-image.height * scale) / 2,
          image.width * scale,
          image.height * scale,
        );
      } else return;
      if (token !== this.revision) return;
      this.source = canvas;
      this.ratio.set(canvas.width / canvas.height);
      this.pageWidth.set(Math.min(900, canvas.width));
      const target = this.pageCanvas.nativeElement;
      target.width = canvas.width;
      target.height = canvas.height;
      target.getContext('2d')!.drawImage(canvas, 0, 0);
      this.busy.set(false);
      const cached = this.cached.get(this.page());
      if (cached) this.regions.set(cached);
      else this.search();
    } catch (e) {
      if (token !== this.revision) return;
      this.error.set('Could not display this page. Try another page or file.');
      this.busy.set(false);
    }
  }
  search() {
    if (!this.source || this.busy()) return;
    this.stopDetection();
    this.closeDetail();
    this.regions.set([]);
    this.detectionError.set('');
    this.searching.set(true);
    const canvas = document.createElement('canvas'),
      scale = Math.min(1, 1400 / Math.max(this.source.width, this.source.height));
    canvas.width = Math.round(this.source.width * scale);
    canvas.height = Math.round(this.source.height * scale);
    const context = canvas.getContext('2d', { willReadFrequently: true })!;
    context.drawImage(this.source, 0, 0, canvas.width, canvas.height);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    try {
      const worker = new Worker(new URL('./detection.worker', import.meta.url), { type: 'module' });
      this.worker = worker;
      worker.onmessage = ({ data }: MessageEvent<{ regions?: Region[]; error?: string }>) => {
        if (this.worker !== worker) return;
        if (data.error) this.detectionError.set(data.error);
        else {
          this.regions.set(data.regions ?? []);
          this.cached.set(this.page(), data.regions ?? []);
        }
        this.stopDetection();
      };
      worker.onerror = () => {
        if (this.worker === worker) {
          this.stopDetection();
          this.detectionError.set('Board detection failed. Try another page or reopen the file.');
        }
      };
      worker.postMessage({ pixels, width: canvas.width, height: canvas.height }, [pixels.buffer]);
      this.workerTimer = setTimeout(() => {
        if (this.worker === worker) {
          this.stopDetection();
          this.detectionError.set('Board detection timed out. Please try another file.');
        }
      }, 20_000);
    } catch {
      this.stopDetection();
      this.detectionError.set('Your browser could not start board detection.');
    }
  }
  private async renderPdf(page: PDFPageProxy, scale: number, region?: Region) {
    const viewport = page.getViewport({ scale, rotation: (page.rotate + this.rotation) % 360 });
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(viewport.width * (region?.width ?? 1)));
    canvas.height = Math.max(1, Math.round(viewport.height * (region?.height ?? 1)));
    const task = page.render({
      canvas,
      viewport,
      background: 'white',
      transform: region
        ? [1, 0, 0, 1, -region.x * viewport.width, -region.y * viewport.height]
        : undefined,
    });
    this.renders.add(task);
    try {
      await task.promise;
    } finally {
      this.renders.delete(task);
    }
    return canvas;
  }
  async openDetail(index: number, opener?: EventTarget | null) {
    if (!this.regions()[index]) return;
    if (this.selected() === null)
      this.returnFocus =
        opener instanceof HTMLElement ? opener : (document.activeElement as HTMLElement);
    this.selected.set(index);
    this.zoom.set(1);
    this.detailBusy.set(true);
    const token = ++this.detailRevision,
      pageToken = this.revision,
      region = this.regions()[index];
    this.cancelRenders();
    setTimeout(() => this.closeButton.nativeElement.focus());
    try {
      let canvas: HTMLCanvasElement;
      const maxSide = Math.min(
        3500,
        Math.max(window.innerWidth, window.innerHeight) * Math.min(window.devicePixelRatio || 1, 2),
      );
      if (this.pdf) {
        const page = await this.pdf.getPage(this.page());
        if (token !== this.detailRevision || pageToken !== this.revision) return;
        const base = page.getViewport({ scale: 1, rotation: (page.rotate + this.rotation) % 360 });
        const scale = Math.min(
          maxSide / Math.max(base.width * region.width, base.height * region.height),
          Math.sqrt(12_000_000 / (base.width * region.width * base.height * region.height)),
        );
        canvas = await this.renderPdf(page, scale, region);
      } else {
        if (!this.bitmap) return;
        const image = this.bitmap,
          sideways = this.rotation % 180 !== 0;
        const w = sideways ? image.height : image.width,
          h = sideways ? image.width : image.height;
        const scale = Math.min(1, maxSide / Math.max(w * region.width, h * region.height));
        canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(w * region.width * scale));
        canvas.height = Math.max(1, Math.round(h * region.height * scale));
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.translate((w / 2 - region.x * w) * scale, (h / 2 - region.y * h) * scale);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.drawImage(
          image,
          (-image.width * scale) / 2,
          (-image.height * scale) / 2,
          image.width * scale,
          image.height * scale,
        );
      }
      if (token !== this.detailRevision || pageToken !== this.revision) return;
      const target = this.detailCanvas.nativeElement;
      target.width = canvas.width;
      target.height = canvas.height;
      target.getContext('2d')!.drawImage(canvas, 0, 0);
      this.fitDetail();
      this.detailViewport.nativeElement.scrollTo(0, 0);
    } catch {
      if (token === this.detailRevision) {
        this.closeDetail();
        this.error.set('Could not enlarge this diagram. Please try opening it again.');
      }
    } finally {
      if (token === this.detailRevision) this.detailBusy.set(false);
    }
  }
  closeDetail() {
    if (this.selected() === null) return;
    this.selected.set(null);
    this.detailRevision++;
    this.detailBusy.set(false);
    this.cancelRenders();
    this.pointer = undefined;
    this.touches.clear();
    this.pinch = undefined;
    this.returnFocus?.focus();
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => {});
  }
  nextDetail(direction: number) {
    const n = (this.selected() ?? 0) + direction;
    if (n >= 0 && n < this.regions().length) void this.openDetail(n);
  }
  setZoom(value: number) {
    this.zoom.set(Math.min(4, Math.max(1, value)));
    this.fitDetail();
  }
  private fitDetail() {
    const canvas = this.detailCanvas.nativeElement,
      viewport = this.detailViewport.nativeElement;
    if (!canvas.width) return;
    const scale =
      Math.min(
        Math.max(100, viewport.clientWidth - 40) / canvas.width,
        Math.max(100, viewport.clientHeight - 40) / canvas.height,
      ) * this.zoom();
    canvas.style.width = `${canvas.width * scale}px`;
    canvas.style.height = `${canvas.height * scale}px`;
  }
  wheel(event: WheelEvent) {
    if (event.ctrlKey || event.metaKey) {
      event.preventDefault();
      this.setZoom(this.zoom() + (event.deltaY < 0 ? 0.2 : -0.2));
    }
  }
  panStart(event: PointerEvent) {
    if (event.pointerType === 'touch') {
      this.touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
      this.detailViewport.nativeElement.setPointerCapture(event.pointerId);
      if (this.touches.size === 2) {
        const [a, b] = [...this.touches.values()];
        this.pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), zoom: this.zoom() };
        this.pointer = undefined;
        return;
      }
    }
    if (this.zoom() <= 1 || event.button !== 0) return;
    const el = this.detailViewport.nativeElement;
    el.setPointerCapture(event.pointerId);
    this.pointer = { x: event.clientX, y: event.clientY, left: el.scrollLeft, top: el.scrollTop };
    event.preventDefault();
  }
  panMove(event: PointerEvent) {
    if (this.touches.has(event.pointerId))
      this.touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (this.pinch && this.touches.size === 2) {
      const [a, b] = [...this.touches.values()];
      this.setZoom(
        (this.pinch.zoom * Math.hypot(a.x - b.x, a.y - b.y)) / Math.max(1, this.pinch.distance),
      );
      return;
    }
    if (this.pointer) {
      const el = this.detailViewport.nativeElement;
      el.scrollLeft = this.pointer.left - event.clientX + this.pointer.x;
      el.scrollTop = this.pointer.top - event.clientY + this.pointer.y;
    }
  }
  panEnd(event: PointerEvent) {
    this.pointer = undefined;
    this.touches.delete(event.pointerId);
    this.pinch = undefined;
  }
  async fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      this.error.set('Full screen is unavailable in this browser.');
    }
  }
  adjust(kind: 'brightness' | 'contrast', event: Event) {
    this[kind].set(Number((event.target as HTMLInputElement).value));
  }
  reset() {
    this.brightness.set(1);
    this.contrast.set(1);
  }
  @HostListener('window:resize') onResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => this.fitDetail(), 100);
  }
  @HostListener('document:keydown', ['$event']) onKey(event: KeyboardEvent) {
    if (this.passwordNeeded() || (event.target as HTMLElement)?.getAttribute('role') === 'tab')
      return;
    const tag = (event.target as HTMLElement)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (event.key === 'Escape') {
      this.closeDetail();
      return;
    }
    if (this.selected() !== null && event.key === 'Tab') {
      const dialog = document.getElementById('diagram-dialog')!;
      const buttons = Array.from(
        dialog.querySelectorAll<HTMLButtonElement>('button:not(:disabled)'),
      );
      const first = buttons[0],
        last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const d = event.key === 'ArrowRight' ? 1 : -1;
    if (this.selected() !== null) this.nextDetail(d);
    else if (!this.busy()) void this.changePage(this.page() + d);
  }
  private stopDetection() {
    this.worker?.terminate();
    this.worker = undefined;
    clearTimeout(this.workerTimer);
    this.searching.set(false);
  }
  private cancelRenders() {
    for (const render of this.renders) render.cancel();
    this.renders.clear();
  }
  private disposeDocument() {
    this.stopDetection();
    this.cancelRenders();
    this.detailRevision++;
    this.selected.set(null);
    if (this.loading) void this.loading.destroy().catch(() => {});
    this.loading = undefined;
    this.pdf = undefined;
    this.bitmap?.close();
    this.bitmap = undefined;
    this.source = undefined;
    this.cached.clear();
    this.passwordCallback = undefined;
  }
  ngOnDestroy() {
    this.cancelLibraryRequest();
    this.revision++;
    this.disposeDocument();
    clearTimeout(this.resizeTimer);
  }
}
