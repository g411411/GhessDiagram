# Chess Diagrams

Angular application for viewing chess diagrams from PDF books and images. Files are opened and processed locally in the browser; no upload server is used.

## Run

Node.js 22.19 or another version supported by the installed Angular and PDF.js dependencies.

```sh
npm install
npm start -- --open
```

If npm 10 fails with `Cannot read properties of null (reading edgesOut)`, use `npx --yes npm@11 install` to install dependencies.

```sh
npm run build
npm test -- --watch=false
```

Production output: `dist/ChessDiagrams/browser`. Serve this directory over HTTP/HTTPS, including the `pdfjs` assets. A static file host is sufficient; SSR/backend are not required.

## Use

1. Open a PDF, PNG, JPEG or WebP file, or drop it onto the application.
2. Wait for automatic board detection on the current page.
3. Click a detected board to show it in the full-window viewer.
4. Use arrows to switch diagrams; Escape returns to the page. In page view, arrows switch pages.
5. Use zoom buttons, Ctrl+wheel, mouse drag, or touch pinch/pan in the diagram viewer. Brightness and contrast apply to both views.

Page rotation, page magnification, optional overlays and password-protected PDFs are supported. There is no manual selection or boundary editor.

## Detection

The browser worker analyzes a raster of the current page. It smooths printed hatching, extracts candidate square components and frames, and verifies alternating 8x8 cell structure. It works independently of PDF object structure and does not identify individual pieces, generate FEN, solve puzzles or use a chess engine.

Detection results are cached per page within the current document and session. Rotating the document clears the cache. Export/import of detection data, persistence across reloads, ML inference and perspective correction are not implemented in this first version.

This is a geometric detector, not a guarantee that every diagram style will be found. Low contrast, strong skew, photos with perspective, atypical board layouts, damaged scans, and other checkerboard graphics can cause misses or false detections. The UI reports empty results; no fallback region is invented.

Limits: 100 MiB/file, 500 PDF pages, 40 megapixels per image. Analysis is limited to a 1400-pixel longest side in a worker with a 20-second timeout. The page preview is limited to a 2000-pixel longest side. Enlarged PDFs are rendered again for the crop; enlarged images use the decoded original. Crop rendering is capped at 12 megapixels.

## Main implementation

- `src/app/app.ts`: local loading, document lifecycle, per-page state, PDF/image rendering and viewer controls.
- `src/app/app.html`, `app.css`: responsive English interface with large, readable controls and keyboard-accessible region buttons.
- `src/app/detector.ts`: pure raster detection and normalized coordinates.
- `src/app/detection.worker.ts`: background detection; old workers are terminated on navigation or replacement.
- `angular.json`: PDF.js worker, font, CMap and WASM assets bundled locally.

## Validation

Unit tests cover solid, colored, hatched and borderless synthetic boards, an empty page, independent results on different pages, upload format/size validation and the initial UI. Browser checks cover actual PDF upload, selecting a middle board, next board, Escape, and page navigation. Sample checks on the first pages of six original PDFs returned 9, 9, 9, 9, 9 and 6 boards. Counts alone are not precision/recall measurements; a separately annotated held-out corpus is still needed to validate broad coverage.

## Deployment

Build with relative asset paths for root or subfolder hosting:

    npm run build -- --configuration production --base-href ./

Upload the contents of dist/ChessDiagrams/browser/ and dist/ChessDiagrams/3rdpartylicenses.txt to static hosting. Preserve the pdfjs/ directory. See [deployment instructions](docs/DEPLOYMENT_RU.md).

## Website PDF library

Use **PDF Library** in the header to browse and search the twelve bundled books and worksheets. **Open PDF** downloads the selected file from the same website and opens the normal diagram viewer. Local file upload remains available. The library requires a network connection to the website; it does not require access to files on the user's computer.

The original PDFs are stored in `public/library/` and are copied by Angular into `dist/ChessDiagrams/browser/library/`. The catalog is `src/app/pdf-library.ts`. To add a document, copy it into `public/library/` and add its filename, title and size to the catalog. Include the entire `library/` directory when deploying. These files are served to visitors as normal website assets.

Library fetching supports filenames with spaces, root and subfolder hosting, cancellation, missing-file errors and rejection of HTML returned by a misconfigured server. Library PDFs use exactly the same rendering/detection path and file-size/page-count limits as local PDFs.

## Video lessons

Video Library lists five curated YouTube lessons. Watch on YouTube opens the selected lesson in a new tab, preserving the current PDF. Videos remain hosted on YouTube and require internet access; no embedded player or video downloads are used. The catalog is src/app/video-library.ts.

## Coach instructions

The welcome screen gives coaches three quick steps for choosing materials, presenting a position and moving through a lesson. Coach's quick guide is available alongside both libraries and any open document, covering local files, full screen, arrow keys, Escape and YouTube tabs.
