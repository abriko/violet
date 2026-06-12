# AIOps visual-deck skeleton — Manulife style

This project is an English visual-deck starter for the AIOps executive proposal.

Assumptions used:
- Language: English
- Style reference: ~/Downloads/PPT template.pptx
- Primary font: Manulife JH Sans
- Structure: 12 slides total
  - 1 cover
  - 8 core narrative slides
  - 2 appendix slides
  - 1 closing slide

Why a custom theme exists:
- The stock visual-deck themes are dark and cinematic.
- Your reference template is light, corporate, and Manulife-branded.
- So this project adds a local `themes/manulife-light.css` instead of forcing dark-coral / dark-teal where they do not fit.

Project structure:
- slides/              HTML slides
- themes/              Manulife light theme
- tools/               overflow / auto-fix helpers copied from visual-deck skill
- references/          local copies of the visual-deck contract docs
- notes-map.js         speaker notes and overflow text
- image-prompts.md     Nano Banana prompt pack for future visual generation
- html2pptx.js         local renderer copied from visual-deck pipeline

Recommended next steps:
1. Install dependencies
   npm install
2. Preview slides
   open player.html
3. Run structural lint
   node build.js --lint
4. Generate images from image-prompts.md and replace placeholder visual panes where needed
5. Build PPTX
   node build.js

Important note:
- The slides are intentionally buildable without images right now.
- Visual placeholders mark where final generated art should go.
- This avoids the common trap where the deck cannot even lint until the image pipeline is complete.
