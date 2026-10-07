# Tornado-survival GUI image pack

Finished transparent PNG assets inspired by your **later viral-game reference upload**, mapped to the features in your existing tornado-survival GUI. No web project or replacement game is required.

**Give Claude Code [CLAUDE_CODE_HANDOFF.md](CLAUDE_CODE_HANDOFF.md) and this entire folder.**

## Included

| PNG file | Contents |
| --- | --- |
| `textures/navigation-icons.png` | 16 icons: rewards, base, pets, gifts, quests, rebirth, pass, settings, cash, strength, tornado, luck, building, salvage, shield, close |
| `textures/headers-atlas.png` | 8 blank colored menu / warning headers |
| `textures/controls-atlas.png` | 8 blank button faces, including green normal/hover/pressed and gray disabled |
| `textures/rarity-cards.png` | 8 blank collectible card backgrounds: six rarities, locked, selected |
| `textures/panel-shell.png` | One reusable dark nine-slice modal frame |

**41 named elements across 5 RGBA PNGs**, each 1254 × 1254 pixels. They have actual alpha transparency. The checkerboard visible in the preview is only a transparency aid, not part of the files. Image-generation output dimensions were measured; do not assume 1024 × 1024 or equal grid cells.

`manifest.json` provides measured pixel rectangles, scaling modes, content padding, color tokens and file hashes. `roblox/StormGuiAssets.luau` contains the same named coordinates and an appearance-only adapter for ImageLabels/ImageButtons. Empty image IDs are intentional; no Roblox upload has been performed.

## Preview

Open **`preview.html` directly in a browser**. It works offline, without installation. Keep `preview.js`, `manifest.js`, and `textures/` beside it. It shows My Base, Daily Rewards, Quests and HUD layout studies, plus every sprite and complete PNG sheet. Text, item names and values in these layout studies are illustrative overlays, not baked into the images or proposed changes to your economy.

Alternatively, from the repository root:

```bash
python3 -m http.server 8030 --directory gui-assets --bind 127.0.0.1
```

Open `preview.html` on that local server in your own browser. Stop the server with Ctrl+C. This chat's cloud onboarding UI does not provide a public web preview.

## Use in Roblox

1. Upload the **five full PNGs** to the actual experience owner/group. Follow [the upload checklist](roblox/UPLOAD_CHECKLIST.md).
2. Supply their image content IDs in `StormGuiAssets.luau`. If Roblox resizes the files during upload, set the actual dimensions in `Assets.UploadedSizes`; the module scales crop coordinates automatically.
3. Ask Claude Code to apply them to the existing UI following [the screen recipes](roblox/ScreenRecipes.md). All numbers, labels, rarity badges, item/pet renderings, progress fills and purchase logic remain native game objects.

Example after uploading and placing the ModuleScript in your project's shared UI location:

```lua
local Assets = require(game.ReplicatedStorage.StormGuiAssets)
Assets.Apply(existingHeaderImage, "header.base")
Assets.Apply(existingHomeIcon, "icon.base")
Assets.Apply(existingBuyButtonImage, "control.green")
Assets.Apply(existingLootCardImage, "card.rare")
Assets.Apply(existingModalImage, "panel.shell")
```

The variables above stand for your actual existing Instances; this snippet does not invent a hierarchy or event handlers. The module intentionally does not change size/position, parent, visibility, input bindings or game data. Add or retain a native label above each textured control.

Atlas elements should normally keep the aspect ratios in the manifest. The standalone panel supports nine-slice resizing; card and header patterns stretch if you substantially change their proportions. Use native Frames/UIStroke/UIGradient for extreme alternate aspect ratios rather than distorting the artwork.

## Validation

From the repository root, with Python 3 (standard library only):

```bash
python3 gui-assets/tools/validate_assets.py
```

Checks PNG structure and CRCs, decompressed image sizes, RGBA format, SHA-256 hashes, sprite bounds, panel slice bounds, manifest synchronization and required handoff files. The pack was also checked for alpha transparency and inspected in a browser at desktop and phone widths. See [VALIDATION.md](VALIDATION.md) for actual completed checks.

Roblox image moderation, asset ownership permissions, final uploaded dimensions, Studio rendering, and integration with the real game must be verified in Studio. The game source is not present in this repository, so no live game UI or gameplay script has been modified.

## References and scope

[REFERENCE_MAP.md](reference/REFERENCE_MAP.md) distinguishes your existing UI from the later style references using Git upload history. All original screenshots and the original root README are unchanged. Art in this pack is newly generated; it does not reuse other games' branded characters or item thumbnails.

The earlier, unfinished browser prototype was paused and preserved outside this repository at `/workspace/scratch/gui-tornado-web-draft`. It is not a dependency and is not included in this asset pack.
