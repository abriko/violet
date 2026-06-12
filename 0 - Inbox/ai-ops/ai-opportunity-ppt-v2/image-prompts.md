| Slide | Asset                             | Status                     | Why it exists                                            | Ratio |
| ----: | --------------------------------- | -------------------------- | -------------------------------------------------------- | ----- |
|    01 | —                                 | No generated image planned | Cover remains text-led in v2/v3                          | —     |
|    02 | pain-point.png                    | Existing internal asset    | Survey / pain-point evidence visual if needed later      | N/A   |
|    03 | core-judgment-bg.png              | Existing internal asset    | Subtle background support for the core judgment slide    | 16:9  |
|    04 | —                                 | No generated image planned | Live proof page should stay card-led after v3            | —     |
|    05 | —                                 | No generated image planned | Strategy slide is intentionally text-first               | —     |
|    06 | governance.png                    | Existing internal asset    | Governance visual / approval gate now provided in assets | N/A   |
|    07 | —                                 | No generated image planned | Roadmap remains text-and-shape first                     | —     |
|    08 | —                                 | No generated image planned | Ask slide should stay numerical and direct               | —     |
|    09 | —                                 | No generated image planned | Decision slide should stay action-led                    | —     |
|    10 | —                                 | No generated image planned | Appendix A is data detail                                | —     |
|    11 | —                                 | No generated image planned | Appendix B is risk detail                                | —     |
|    12 | aiops-architecture.excalidraw.png | Existing internal asset    | Architecture / governance appendix                       | N/A   |
|    13 | —                                 | No generated image planned | Closing remains text-led in v2/v3                        | —     |

## core-judgment-bg.png · Core judgment backdrop · 16:9

```
A horizontal composition. A subtle executive background illustration for a judgment slide about operations scale outgrowing manual coverage. The image should suggest mounting operational complexity, service sprawl, and the limit of human-only response, but without showing panic or literal incidents. Think layered service nodes, faint connection paths, a few calm signal pulses, and soft structural depth fading into the right side. The feeling should be pressure and scale, not chaos.

Composition: 16:9 landscape orientation, 1920 by 1080. Keep the center and left-center relatively calm because the main quote sits in the middle of the slide. Concentrate most visual density in the right 32 percent of the frame and lightly in the far left edge only. Leave the bottom 18 percent quiet for footer and logo safety. Use a soft white or very light gray base, hex #F7F9FC or #F2F4F8, with restrained navy blue, hex #002060, muted teal, hex #06C7BA, and very small touches of green, hex #00A758. Contrast must stay low enough for large navy quote text to remain dominant.

Style: understated corporate concept illustration, premium keynote background, abstract service-map atmosphere, controlled complexity, low contrast, calm executive tone, clean depth layering, not a dashboard screenshot, not a literal architecture diagram.

Do not include: any text, letters, numbers, logos, watermarks, dashboards, screenshots, code, tables, charts, alert badges, human faces, human hands, robots, neon sci-fi effects, flames, warning triangles, red error screens, AI artifacts.
```

## Existing internal assets already referenced by the deck

- slide02 can optionally use `assets/pain-point.png` later if you want to turn the current-state page into a more visual evidence layout.
- slide03 now uses `assets/core-judgment-bg.png` directly, cropped toward the upper-right and held at low opacity so the centered quote stays dominant.
- slide06 now uses `assets/governance.png` directly, so no generation is needed for the governance page.
- slide12 now uses `assets/aiops-architecture.excalidraw.png` directly, so no generation is needed for the appendix.
- the project also includes `assets/manulife-logo.png` and `assets/manulife-logo.svg`, extracted from the official template, for footer branding consistency.

## Slides intentionally kept image-free in v3

Slides 01, 04, 05, 07, 08, 09, 10, 11, and 13 are intentionally text-first in v3. These pages are carrying proof, prioritization, roadmap, ask, appendix detail, or closing emphasis. Decorative images there would weaken decision clarity.
