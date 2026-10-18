/// <reference lib="webworker" />
import { detectBoards } from './detector';
addEventListener(
  'message',
  ({ data }: MessageEvent<{ pixels: Uint8ClampedArray; width: number; height: number }>) => {
    try {
      postMessage({ regions: detectBoards(data.pixels, data.width, data.height) });
    } catch {
      postMessage({ error: 'Could not complete board detection. Try another page.' });
    }
  },
);
