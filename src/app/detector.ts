export interface Region {
  x: number;
  y: number;
  width: number;
  height: number;
  score: number;
}
interface Box {
  x: number;
  y: number;
  size: number;
}

/** Raster-only detector. Coordinates are normalized to the oriented source page. */
export function detectBoards(rgba: Uint8ClampedArray, width: number, height: number): Region[] {
  const gray = new Uint8Array(width * height);
  for (let i = 0; i < gray.length; i++) {
    const alpha = rgba[i * 4 + 3] / 255;
    gray[i] =
      (rgba[i * 4] * 0.299 + rgba[i * 4 + 1] * 0.587 + rgba[i * 4 + 2] * 0.114) * alpha +
      255 * (1 - alpha);
  }
  // A small box filter joins printed hatching inside a cell and suppresses scan noise.
  const raw = gray.slice();
  const radius = 2;
  const horizontal = new Float32Array(gray.length);
  for (let y = 0; y < height; y++) {
    let sum = 0;
    for (let x = -radius; x <= radius; x++)
      sum += raw[y * width + Math.max(0, Math.min(width - 1, x))];
    for (let x = 0; x < width; x++) {
      horizontal[y * width + x] = sum / 5;
      sum +=
        raw[y * width + Math.min(width - 1, x + radius + 1)] -
        raw[y * width + Math.max(0, x - radius)];
    }
  }
  for (let x = 0; x < width; x++) {
    let sum = 0;
    for (let y = -radius; y <= radius; y++)
      sum += horizontal[Math.max(0, Math.min(height - 1, y)) * width + x];
    for (let y = 0; y < height; y++) {
      gray[y * width + x] = sum / 5;
      sum +=
        horizontal[Math.min(height - 1, y + radius + 1) * width + x] -
        horizontal[Math.max(0, y - radius) * width + x];
    }
  }
  const framed: Box[] = [];
  const cells: Box[] = [];
  const stack = new Int32Array(gray.length);
  for (const threshold of [100, 170, 200, 220, 240]) {
    const seen = new Uint8Array(gray.length);
    for (let p = 0; p < gray.length; p++) {
      if (seen[p] || gray[p] >= threshold) continue;
      let count = 0,
        top = 1,
        minX = width,
        minY = height,
        maxX = 0,
        maxY = 0;
      stack[0] = p;
      seen[p] = 1;
      while (top) {
        const n = stack[--top],
          x = n % width,
          y = Math.floor(n / width);
        count++;
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
        if (x > 0) visit(n - 1);
        if (x + 1 < width) visit(n + 1);
        if (y > 0) visit(n - width);
        if (y + 1 < height) visit(n + width);
      }
      const w = maxX - minX + 1,
        h = maxY - minY + 1;
      if (w > 65 && h > 65 && w / h > 0.9 && w / h < 1.11 && count / (w * h) > 0.025) {
        framed.push({ x: minX, y: minY, size: (w + h) / 16 });
      }
      if (
        w >= 6 &&
        h >= 6 &&
        w / h > 0.84 &&
        w / h < 1.19 &&
        count / (w * h) > 0.48 &&
        count / (w * h) < 1.01
      ) {
        const size = (w + h) / 2;
        if (size * 8 < Math.max(width, height) * 1.03) cells.push({ x: minX, y: minY, size });
      }
      function visit(n: number) {
        if (!seen[n] && gray[n] < threshold) {
          seen[n] = 1;
          stack[top++] = n;
        }
      }
    }
  }
  // Each dark square votes for the possible 8x8 board origins. Votes from
  // different squares, including pages without an outside border, reinforce.
  const votes = new Map<string, { x: number; y: number; size: number; count: number }>();
  for (const c of cells) {
    const sizeKey = Math.round(Math.log(c.size) / Math.log(1.055));
    const size = Math.pow(1.055, sizeKey),
      quantum = Math.max(2, size * 0.2);
    for (let row = 0; row < 8; row++)
      for (let col = 0; col < 8; col++) {
        const x = c.x - col * c.size,
          y = c.y - row * c.size;
        if (x < -3 || y < -3 || x + c.size * 8 > width + 3 || y + c.size * 8 > height + 3) continue;
        const key = `${sizeKey}:${Math.round(x / quantum)}:${Math.round(y / quantum)}`;
        const old = votes.get(key);
        if (old) {
          old.x += x;
          old.y += y;
          old.size += c.size;
          old.count++;
        } else votes.set(key, { x, y, size: c.size, count: 1 });
      }
  }
  for (const b of framed)
    votes.set(`frame:${b.x}:${b.y}:${b.size}`, {
      x: b.x * 8,
      y: b.y * 8,
      size: b.size * 8,
      count: 8,
    });
  const candidates: Region[] = [];
  for (const v of [...votes.values()]
    .filter((v) => v.count >= 4)
    .sort((a, b) => b.count - a.count)
    .slice(0, 240)) {
    let best = { x: v.x / v.count, y: v.y / v.count, size: v.size / v.count, score: 0 };
    for (const ds of [0.985, 1, 1.015])
      for (const dx of [-0.12, 0, 0.12])
        for (const dy of [-0.12, 0, 0.12]) {
          const size = (v.size / v.count) * ds,
            x = v.x / v.count + dx * size,
            y = v.y / v.count + dy * size;
          const score = checkerScore(x, y, size);
          if (score > best.score) best = { x, y, size, score };
        }
    if (best.score < 0.56) continue;
    const pad = best.size * 0.12,
      x = Math.max(0, best.x - pad),
      y = Math.max(0, best.y - pad);
    candidates.push({
      x: x / width,
      y: y / height,
      width: (Math.min(width, best.x + best.size * 8 + pad) - x) / width,
      height: (Math.min(height, best.y + best.size * 8 + pad) - y) / height,
      score: best.score,
    });
  }
  const output: Region[] = [];
  for (const c of candidates.sort((a, b) => b.score - a.score)) {
    if (output.some((r) => overlap(c, r) > 0.35)) continue;
    // Prefer a complete outer boundary over an over-tight match inside the board.
    const matches = candidates.filter(
      (r) => overlap(c, r) > 0.9 && r.score > 0.7 && r.width * r.height < c.width * c.height * 1.35,
    );
    const complete = matches.sort((a, b) => b.width * b.height - a.width * a.height)[0] ?? c;
    output.push(complete);
  }
  return output.sort((a, b) =>
    Math.abs(a.y - b.y) < Math.min(a.height, b.height) * 0.4 ? a.x - b.x : a.y - b.y,
  );

  function checkerScore(x: number, y: number, s: number): number {
    if (x < -1 || y < -1 || x + 8 * s > width + 1 || y + 8 * s > height + 1) return 0;
    const values: number[] = [];
    // Sample the cell interiors rather than the pieces at their centers.
    for (let row = 0; row < 8; row++)
      for (let col = 0; col < 8; col++) {
        const samples: number[] = [];
        for (const fy of [0.17, 0.3, 0.7, 0.83])
          for (const fx of [0.17, 0.3, 0.7, 0.83]) {
            const px = Math.max(0, Math.min(width - 1, Math.round(x + (col + fx) * s)));
            const py = Math.max(0, Math.min(height - 1, Math.round(y + (row + fy) * s)));
            samples.push(gray[py * width + px]);
          }
        samples.sort((a, b) => a - b);
        values.push(samples.slice(4, 12).reduce((a, b) => a + b, 0) / 8);
      }
    let even = 0,
      odd = 0;
    for (let i = 0; i < 64; i++) {
      if ((Math.floor(i / 8) + (i % 8)) % 2) odd += values[i];
      else even += values[i];
    }
    even /= 32;
    odd /= 32;
    const contrast = Math.abs(even - odd);
    if (contrast < 16) return 0;
    const sign = even > odd ? 1 : -1;
    let good = 0,
      pairs = 0,
      consistent = 0;
    for (let r = 0; r < 8; r++)
      for (let c = 0; c < 8; c++) {
        const i = r * 8 + c,
          expected = (r + c) % 2 ? odd : even;
        if (Math.abs(values[i] - expected) < contrast * 0.68 + 12) consistent++;
        for (const j of [c < 7 ? i + 1 : -1, r < 7 ? i + 8 : -1]) {
          if (j < 0) continue;
          pairs++;
          if ((values[i] - values[j]) * ((r + c) % 2 ? -sign : sign) > contrast * 0.2) good++;
        }
      }
    const regularity = good / pairs,
      agreement = consistent / 64;
    if (regularity < 0.72 || agreement < 0.72) return 0;
    return regularity * 0.55 + agreement * 0.25 + Math.min(contrast / 100, 1) * 0.2;
  }
}

export function overlap(a: Region, b: Region): number {
  const intersection =
    Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x)) *
    Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
  return intersection / Math.min(a.width * a.height, b.width * b.height);
}
