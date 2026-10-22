# Ecomify Media

Open `index.html` locally. The client reviews page is `reviews.html`.
No installation or build step is needed. Fonts, SVG branding, styles, scripts,
and review images are included locally.

Changes in this revision:

- The site now keeps only contact@ecomifymedia.com for email contact.
- The top navigation uses a purely white SVG logo on a transparent background.
- The original magnifying-glass and growth-arrow mark has been recreated as
  editable SVG geometry. The old white disc and halftone backdrop are removed.
- The hero and footer use the transparent colour mark with white lettering.
- WhatsApp icons use one clean filled glyph rather than a stroked handset.

Logo assets:

- assets/ecomify-logo-white.svg — monochrome header logo.
- assets/ecomify-logo.svg — colour symbol with white lettering.
- assets/ecomify-icon.svg — transparent symbol used as the favicon.

The logo lettering is outlined as vector paths, so it displays consistently
without installing a font. All SVG versions have a transparent background.
The SVG artwork is a vector recreation based on the supplied raster logo.

This repository contains the approved Ecomify Media redesign.
The previous website remains available through Git history.

The original seven services, three case studies, review screenshots, WhatsApp
URL, Instagram URL, Facebook URL, and contact email remain available.

For an optional local HTTP server, run:

    python -m http.server 8000

Then open http://localhost:8000/.

The source snapshot was downloaded from Kahaf-Soomro/ecomify-media, main,
commit 93bf02e2828ec80b5aac58d508f35f4997cbd854.

Fonts are bundled with their licenses in assets/fonts/.
