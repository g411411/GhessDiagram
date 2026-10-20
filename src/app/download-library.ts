/** Download the original PDF, or reassemble the Cloudflare build's smaller assets. */
export async function downloadLibraryPdf(
  url: URL,
  large: boolean,
  signal: AbortSignal,
): Promise<Blob> {
  const response = await fetch(url, { signal });
  if (response.ok) {
    const blob = await response.blob();
    if ((await blob.slice(0, 1024).text()).includes('%PDF-')) return blob;
  }
  if (!large || signal.aborted) throw new Error('PDF unavailable');
  const metadata = await fetch(new URL(url.href + '.parts.json'), { signal });
  if (!metadata.ok) throw new Error('PDF metadata unavailable');
  const { parts, bytes } = await metadata.json();
  if (
    !Number.isInteger(parts) ||
    parts < 1 ||
    parts > 5 ||
    !Number.isInteger(bytes) ||
    bytes < 1 ||
    bytes > 100 * 1024 * 1024
  )
    throw new Error('Invalid PDF metadata');
  const buffers: ArrayBuffer[] = [];
  for (let part = 1; part <= parts; part++) {
    const response = await fetch(new URL(url.href + `.part-${part}`), { signal });
    if (!response.ok) throw new Error('PDF part unavailable');
    buffers.push(await response.arrayBuffer());
  }
  const blob = new Blob(buffers, { type: 'application/pdf' });
  if (blob.size !== bytes || !(await blob.slice(0, 1024).text()).includes('%PDF-'))
    throw new Error('Incomplete PDF download');
  return blob;
}
