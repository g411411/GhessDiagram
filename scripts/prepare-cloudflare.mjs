import { mkdir, readFile, readdir, stat, writeFile, unlink, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../dist/ChessDiagrams/browser/', import.meta.url));
const limit = 25 * 1024 * 1024,
  chunkSize = 20 * 1024 * 1024;
const library = path.join(root, 'library');
for (const name of await readdir(library)) {
  if (!name.endsWith('.pdf')) continue;
  const target = path.join(library, name);
  if ((await stat(target)).size <= limit) continue;
  const original = await readFile(target),
    parts = [];
  for (let offset = 0; offset < original.length; offset += chunkSize) {
    const part = `${name}.part-${parts.length + 1}`;
    await writeFile(path.join(library, part), original.subarray(offset, offset + chunkSize));
    parts.push(part);
  }
  const restored = Buffer.concat(
    await Promise.all(parts.map((part) => readFile(path.join(library, part)))),
  );
  const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
  if (hash(original) !== hash(restored)) throw new Error('Reassembly verification failed');
  await writeFile(
    `${target}.parts.json`,
    JSON.stringify({ parts: parts.length, bytes: original.length }),
  );
  // Only the generated build copy is removed; public/library keeps the original.
  if (!target.startsWith(path.resolve(root) + path.sep)) throw new Error('Unexpected output path');
  await unlink(target);
  console.log(`Split ${name} into ${parts.length} assets; SHA-256 verified.`);
}
await copyFile(
  path.join(root, '..', '3rdpartylicenses.txt'),
  path.join(root, '3rdpartylicenses.txt'),
);
async function check(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, item.name);
    if (item.isDirectory()) await check(target);
    else if ((await stat(target)).size > limit)
      throw new Error(`Asset exceeds Cloudflare limit: ${item.name}`);
  }
}
await check(root);
console.log('Cloudflare Pages build ready: all assets are at most 25 MiB.');
