import { detectBoards } from './detector';

function page(
  boards: {
    x: number;
    y: number;
    cell: number;
    hatch?: boolean;
    color?: boolean;
    border?: boolean;
  }[],
) {
  const width = 600,
    height = 800,
    pixels = new Uint8ClampedArray(width * height * 4).fill(255);
  const paint = (x: number, y: number, value: number[]) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = (y * width + x) * 4;
    pixels[i] = value[0];
    pixels[i + 1] = value[1];
    pixels[i + 2] = value[2];
  };
  for (const b of boards) {
    for (let y = 0; y < b.cell * 8; y++)
      for (let x = 0; x < b.cell * 8; x++) {
        const dark = (Math.floor(x / b.cell) + Math.floor(y / b.cell)) % 2 === 1;
        const value = dark
          ? b.hatch
            ? (x + y) % 4 === 0
              ? [40, 40, 40]
              : [255, 255, 255]
            : b.color
              ? [90, 140, 75]
              : [70, 70, 70]
          : [245, 245, 225];
        paint(b.x + x, b.y + y, value);
      }
    if (b.border)
      for (let i = 0; i < b.cell * 8; i++)
        for (let k = 0; k < 2; k++) {
          paint(b.x + i, b.y + k, [0, 0, 0]);
          paint(b.x + i, b.y + b.cell * 8 - 1 - k, [0, 0, 0]);
          paint(b.x + k, b.y + i, [0, 0, 0]);
          paint(b.x + b.cell * 8 - 1 - k, b.y + i, [0, 0, 0]);
        }
  }
  return { pixels, width, height };
}

describe('Automatic board detection', () => {
  for (const style of [{}, { color: true }, { hatch: true }, { hatch: true, border: true }]) {
    it(`finds separate 8x8 boards: ${JSON.stringify(style)}`, () => {
      const { pixels, width, height } = page([
        { x: 35, y: 45, cell: 25, ...style },
        { x: 330, y: 450, cell: 28, ...style },
      ]);
      const found = detectBoards(pixels, width, height);
      expect(found).toHaveLength(2);
      expect(Math.abs(found[0].x * width - 35)).toBeLessThan(12);
      expect(found[0].width * width).toBeGreaterThan(190);
      expect(found[1].x).toBeGreaterThan(0.5);
    });
  }
  it('does not invent boards on an empty page', () => {
    const { pixels, width, height } = page([]);
    expect(detectBoards(pixels, width, height)).toEqual([]);
  });
  it('does not reuse a preceding page result', () => {
    const first = page([{ x: 35, y: 45, cell: 25 }]);
    expect(detectBoards(first.pixels, first.width, first.height)).toHaveLength(1);
    const second = page([]);
    expect(detectBoards(second.pixels, second.width, second.height)).toEqual([]);
  });
});
