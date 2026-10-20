# Cloudflare Pages deployment

Use a Pages project connected to GitHub repository g411411/GhessDiagram.

- Production branch: main
- Framework preset: None
- Root directory: leave empty
- Build command: npx --yes npm@11.6.2 ci && npm run build:cloudflare
- Build output directory: dist/ChessDiagrams/browser
- Environment variable NODE_VERSION: 22.19.0
- Environment variable SKIP_DEPENDENCY_INSTALL: 1

Skip the automatic dependency install because the build command installs the exact lockfile with npm 11, avoiding the npm 10 resolver failure previously encountered in this project. No deploy command is required for Pages.

From the dashboard, open Compute, find Workers & Pages, choose Create application, then Pages / Connect to Git and select the repository. Choose the settings above, then Save and Deploy. Dashboard wording may vary. Do not create a Worker requiring a Wrangler deploy command for this static Pages build.

## Large PDF

Cloudflare Pages limits individual assets to 25 MiB. The original 31.35 MiB Ben-Igor book remains unchanged in public/library and in Git. build:cloudflare creates 20 MiB chunks in the generated output, writes a .parts.json manifest, verifies reconstruction with SHA-256, and removes only the oversized generated copy. The browser reassembles these parts into one PDF. Standard npm run build keeps the original unsplit file for other hosts.

The deployment folder must include all part files, manifests, library PDFs, PDF.js assets and JavaScript bundles. Do not upload an older generic ZIP that still contains the oversized PDF.

After deployment, verify PDF Library, the Ben-Igor book (52 pages), diagram enlargement, all four tabs and the YouTube links. The project is prepared for deployment; these instructions alone do not publish it or create a Cloudflare project.

Sources:
https://developers.cloudflare.com/pages/framework-guides/deploy-an-angular-site/
https://developers.cloudflare.com/pages/platform/limits/
https://developers.cloudflare.com/pages/configuration/build-image/
