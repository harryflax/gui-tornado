# Full original-game menu templates

Eleven finished **1920 × 1080 PNGs**, based on your original game screenshots, with bright full-width headers, smooth surfaces and familiar game icons. Click any image to view it directly on GitHub.

| Menu | Finished image | Original screenshot |
| --- | --- | --- |
| My Farm — Loot | [farm-loot.png](screens/farm-loot.png) | `134221` |
| My Farm — Index | [loot-index.png](screens/loot-index.png) | `134230` |
| Storm Pups — Pets | [pets.png](screens/pets.png) | `134236` |
| Storm Pups — Eggs | [eggs.png](screens/eggs.png) | `134240` |
| Free Rewards | [free-rewards.png](screens/free-rewards.png) | `134214` |
| Playtime Gifts | [playtime-gifts.png](screens/playtime-gifts.png) | `134245` |
| Quests | [quests.png](screens/quests.png) | `134251` |
| My Farm — Rebirth | [rebirth.png](screens/rebirth.png) | `134256` |
| My Farm — Decor | [decor.png](screens/decor.png) | `134300` |
| Storm Pass | [storm-pass.png](screens/storm-pass.png) | `134305` |
| Gameplay HUD | [hud.png](screens/hud.png) | `134312` |

Original filenames are `Screenshot 2026-10-07 <number>.png` in the repository root. The originals are unchanged.

## Open the preview

1. On the repository home page, choose **Code → Download ZIP**.
2. Extract the ZIP completely.
3. Open **gui-assets/screens.html** in your browser. No install or build is needed.
4. Use the screen selector, bottom menu buttons and Farm/Pets tabs. Close a menu or press Escape to see the HUD. The toolbar downloads the selected PNG.

GitHub's HTML file page displays source code; download the repository to run the preview. Keep the entire `gui-assets` folder together. Opening `screens.js` by itself will not show the menus.

## Claude Code source files

Start with [CLAUDE_CODE_HANDOFF.md](CLAUDE_CODE_HANDOFF.md). Include this folder and your actual Roblox project.

- `screens/*.png`: complete visual references with sample text and game context.
- `screens.html`, `screens.css`, `screens.js`: editable layout source. Design canvas: 1600 × 900, exported at 1.2×. Modal: position (210, 80), size 1180 × 706; header fills its interior width.
- `textures/`: reusable transparent image layers. The five core atlases retain their existing `manifest.json` and `StormGuiAssets.luau` mappings.
- `textures/menu-items.png`: **24 additional item/pet illustrations**, 1536 × 1024 RGBA. Exact square crop rectangles are in `content-manifest.json`; `content-manifest.js` supports offline preview.
- `roblox/ScreenItemAssets.luau`: optional item atlas adapter. Upload the whole atlas, set `ImageId`, and adjust `UploadedSize` if Roblox resizes it. Prefer existing thumbnails/ViewportFrames when they provide the correct item or mutation appearance.
- `fonts/Fredoka.ttf` and `fonts/OFL.txt`: local preview font and license. Use Roblox's FredokaOne for live native text.

Build live menus from native Roblox labels, controls, layouts and image layers. Full-screen PNGs contain text and scenery, so use them as design references. `screens/storm-background.png` is newly generated presentation scenery based on your HUD reference; do not install it over gameplay.

## Sample data and sizing

Most names, values, schedules and states come from the original screenshots. This preview is static: purchase, claim and equip actions only show a message. Bind live game data during integration.

Where content was obscured or outside the screenshot, the layout uses illustrative placeholders: weekly quest progress is 0/800; extra pet/index rows complete the visible grid; milestone endpoints continue the visible sequence. Two offscreen decor prices show VIEW without invented prices. Use the existing game's data and complete scrollable inventories in Roblox.

The preview scales the whole 16:9 composition to fit the browser. It is a desktop art reference. For Roblox phones, retain readable native text and touch targets and scroll menu content as described in the handoff.

## Re-export after editing

Viewing requires no dependencies. Optional automated export needs Node.js, Playwright and Chromium. Install Playwright in a separate tooling folder and run `npx playwright install chromium` there. Set `PLAYWRIGHT_MODULE_PATH` to that folder's `node_modules/playwright`; alternatively use a Playwright installation resolvable by Node. Set `CHROMIUM_PATH` to use an existing Chromium executable.

Start the Python server documented in [README.md](README.md), then run from the repository root:

```bash
node gui-assets/tools/export_screens.cjs
```

The exporter saves all eleven PNGs and checks menu clipping, full-width headers, navigation, close/Escape, preview-only actions, mobile selector and JavaScript/network errors. `GUI_PREVIEW_ORIGIN` overrides the default local server origin. Do not commit tooling `node_modules`.
