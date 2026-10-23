import { TestBed } from '@angular/core/testing';
import { afterEach, vi } from 'vitest';
import { App } from './app';
import { PDF_LIBRARY } from './pdf-library';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

async function app() {
  await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  return TestBed.createComponent(App).componentInstance;
}

describe('Website PDF library', () => {
  it('offers all twelve distinct PDFs including answers', () => {
    expect(PDF_LIBRARY).toHaveLength(11);
    expect(new Set(PDF_LIBRARY.map((entry) => entry.file)).size).toBe(11);
    expect(PDF_LIBRARY.filter((entry) => entry.title.includes('Answers'))).toHaveLength(3);
  });
  it('downloads a selected PDF relative to the deployed application and opens the existing viewer', async () => {
    const viewer = await app();
    const entry = PDF_LIBRARY.find((e) => e.file === 'mat 1 move1.pdf')!;
    const fetchMock = vi.fn().mockResolvedValue(new Response('%PDF-1.7\nfixture'));
    vi.stubGlobal('fetch', fetchMock);
    const open = vi.spyOn(viewer, 'open').mockResolvedValue(undefined);
    viewer.libraryVisible.set(true);
    await viewer.openLibrary(entry);
    expect(fetchMock.mock.calls[0][0].href).toBe(
      new URL('library/mat%201%20move1.pdf', document.baseURI).href,
    );
    expect(open).toHaveBeenCalledOnce();
    const [file, origin] = open.mock.calls[0];
    expect(file.name).toBe(entry.file);
    expect(file.type).toBe('application/pdf');
    expect(origin).toBe('library');
    expect(viewer.libraryVisible()).toBe(false);
    expect(viewer.libraryLoading()).toBeNull();
  });
  it('preserves the current document if a hosted PDF is missing', async () => {
    const viewer = await app();
    viewer.fileName.set('already-open.pdf');
    viewer.libraryVisible.set(true);
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('', { status: 404 })));
    const open = vi.spyOn(viewer, 'open');
    await viewer.openLibrary(PDF_LIBRARY[0]);
    expect(open).not.toHaveBeenCalled();
    expect(viewer.fileName()).toBe('already-open.pdf');
    expect(viewer.libraryError()).toContain('Could not load');
    expect(viewer.libraryVisible()).toBe(true);
    expect(viewer.libraryLoading()).toBeNull();
  });
  it('rejects an HTML fallback returned by a misconfigured host', async () => {
    const viewer = await app();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('<html>Not a PDF</html>')));
    const open = vi.spyOn(viewer, 'open');
    await viewer.openLibrary(PDF_LIBRARY[0]);
    expect(open).not.toHaveBeenCalled();
    expect(viewer.libraryError()).toContain('Could not load');
  });
  it('does not open a late response after the download was cancelled', async () => {
    const viewer = await app();
    let finish!: (response: Response) => void;
    vi.stubGlobal(
      'fetch',
      vi.fn().mockImplementation(
        () =>
          new Promise<Response>((resolve) => {
            finish = resolve;
          }),
      ),
    );
    const open = vi.spyOn(viewer, 'open');
    const pending = viewer.openLibrary(PDF_LIBRARY[0]);
    viewer.cancelLibraryRequest();
    finish(new Response('%PDF-1.7\nfixture'));
    await pending;
    expect(open).not.toHaveBeenCalled();
    expect(viewer.libraryLoading()).toBeNull();
    expect(viewer.libraryError()).toBe('');
  });
});
