import { afterEach, vi } from 'vitest';

import { downloadLibraryPdf } from './download-library';
afterEach(() => vi.unstubAllGlobals());
describe('Cloudflare PDF assets', () => {
  it('reassembles a PDF from ordered chunks when the original exceeds the hosting limit', async () => {
    vi.stubGlobal('Blob', (await new Response('').blob()).constructor);
    const first = '%PDF-1.7\n',
      last = 'fixture';
    const mock = vi
      .fn()
      .mockResolvedValueOnce(new Response('<html>fallback</html>'))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ parts: 2, bytes: first.length + last.length })),
      )
      .mockResolvedValueOnce(new Response(first))
      .mockResolvedValueOnce(new Response(last));
    vi.stubGlobal('fetch', mock);
    const url = new URL('https://example.com/chess/library/book.pdf');
    const blob = await downloadLibraryPdf(url, true, new AbortController().signal);
    expect(await blob.text()).toBe(first + last);
    expect(mock.mock.calls[2][0].href).toBe(url.href + '.part-1');
    expect(mock.mock.calls[3][0].href).toBe(url.href + '.part-2');
  });
  it('rejects a missing chunk rather than opening an incomplete book', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(new Response('', { status: 404 }))
        .mockResolvedValueOnce(new Response(JSON.stringify({ parts: 2, bytes: 20 })))
        .mockResolvedValueOnce(new Response('', { status: 404 })),
    );
    await expect(
      downloadLibraryPdf(
        new URL('https://example.com/book.pdf'),
        true,
        new AbortController().signal,
      ),
    ).rejects.toThrow('part unavailable');
  });
  it('keeps ordinary PDFs on the original one-request download path', async () => {
    const mock = vi.fn().mockResolvedValue(new Response('%PDF-1.7\noriginal'));
    vi.stubGlobal('fetch', mock);
    const blob = await downloadLibraryPdf(
      new URL('https://example.com/book.pdf'),
      false,
      new AbortController().signal,
    );
    expect(await blob.text()).toContain('original');
    expect(mock).toHaveBeenCalledOnce();
  });
});
