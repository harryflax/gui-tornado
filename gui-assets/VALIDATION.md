# Validation record

Version 1.2 full-screen pack verified on 8 October 2026. Core atlas checks from version 1.1 were also rerun.

## Full-screen checks passed

- All eleven 1920 × 1080 PNGs exported in Chromium and visually inspected.
- Each full menu fits its content area without vertical or horizontal clipping. Every modal header fills its interior width.
- Farm/Pets tabs, bottom navigation, close button, Escape, preview action messages and the mobile screen selector were exercised. No JavaScript errors or failed HTTP requests occurred.
- A 390 × 844 browser viewport has no horizontal page overflow. The art composition scales as a whole; this is not a production mobile Roblox layout.
- The new 1536 × 1024 RGBA item atlas has 24 measured square crops; manifest JSON/JS and Luau coordinates agree. Transparent background pixels were verified (alpha zero); the icon interiors reach alpha 254.
- All new PNG chunk CRCs and decoded pixel lengths pass; item atlas SHA-256 matches the manifest.
- Fredoka is bundled locally with its OFL license; the preview needs no font service or network dependency.
- The browser exporter is included at `tools/export_screens.cjs`.

## Core pack checks passed

- Five original PNG files decoded successfully at 1254 × 1254, 8-bit RGBA.
- All five contain actual alpha-transparent pixels; alpha spans 0–255. No checkerboard background is baked into them.
- PNG signatures, chunk CRCs, decompressed byte lengths and SHA-256 hashes pass the standard-library validator.
- All 41 named sprites are inside their source image bounds. Icon crop boundaries have alpha at or below 1/255. Headers deliberately crop the opaque colored inner face so their color reaches the full display width.
- The panel's nine-slice center is inside its image bounds.
- The offline JavaScript manifest matches `manifest.json`; all named coordinates match the Luau adapter.
- Chromium loaded the local HTTP preview: all 41 gallery entries rendered, all four example layouts switched, and no JavaScript errors occurred.
- Full-width header placement passed a browser geometry check: no more than 8 display pixels between the header edge and outer frame.
- Header, button and rarity-card art was visually checked for smooth surfaces without studs. Farm/loot cow, paw prints, quest parchment, rebirth arrows and the tornado were compared to the original HUD.
- The preview was inspected at 1440 × 1100 and 390 × 844. No horizontal page overflow at the phone width.
- Git-tracked source screenshots and the original README remain unchanged.

Run reproducible file validation with:

```bash
python3 gui-assets/tools/validate_assets.py
```

## Not claimed

- The managed cloud Chromium policy blocks `file://` navigation. Browser validation used the documented temporary local HTTP server. The preview uses only sibling scripts and image files and is designed to open directly in ordinary local browsers; direct-file execution was not verified in this managed browser.
- No Roblox image upload or moderation was performed. The five core image-ID entries and the optional new item-atlas ID remain intentionally empty.
- Roblox may resize uploads. Verify uploaded dimensions and set `Assets.UploadedSizes` before applying crops.
- The Luau adapter has not been run in Roblox Studio. Studio is required to verify engine rendering, final asset IDs, owner/group permissions and the actual game's integration.
- This repository contains screenshots, not the actual game's source. No live UI instances, server scripts, economy or multiplayer behavior were changed.

## Environment

No installation script, application service, API credentials or npm dependencies are needed for this image pack. Python 3 is used only for optional local preview serving and file validation. No cloud setup configuration was changed for the asset-only workflow.
