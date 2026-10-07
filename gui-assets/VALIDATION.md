# Validation record

Completed on 7 October 2026.

## Passed

- Five original PNG files decoded successfully at 1254 × 1254, 8-bit RGBA.
- All five contain actual alpha-transparent pixels; alpha spans 0–255. No checkerboard background is baked into them.
- PNG signatures, chunk CRCs, decompressed byte lengths and SHA-256 hashes pass the standard-library validator.
- All 41 named sprites are inside their source image bounds. Measured crop boundaries have alpha at or below 24/255; no opaque artwork crosses a crop edge.
- The panel's nine-slice center is inside its image bounds.
- The offline JavaScript manifest matches `manifest.json`; all named coordinates match the Luau adapter.
- Chromium loaded the local HTTP preview: all 41 gallery entries rendered, all four example layouts switched, and no JavaScript errors occurred.
- The preview was inspected at 1440 × 1100 and 390 × 844. No horizontal page overflow at the phone width.
- Git-tracked source screenshots and the original README remain unchanged.

Run reproducible file validation with:

```bash
python3 gui-assets/tools/validate_assets.py
```

## Not claimed

- The managed cloud Chromium policy blocks `file://` navigation. Browser validation used the documented temporary local HTTP server. The preview uses only sibling scripts and image files and is designed to open directly in ordinary local browsers; direct-file execution was not verified in this managed browser.
- No Roblox image upload or moderation was performed. The five image-ID entries remain intentionally empty.
- Roblox may resize uploads. Verify uploaded dimensions and set `Assets.UploadedSizes` before applying crops.
- The Luau adapter has not been run in Roblox Studio. Studio is required to verify engine rendering, final asset IDs, owner/group permissions and the actual game's integration.
- This repository contains screenshots, not the actual game's source. No live UI instances, server scripts, economy or multiplayer behavior were changed.

## Environment

No installation script, application service, API credentials or npm dependencies are needed for this image pack. Python 3 is used only for optional local preview serving and file validation. No cloud setup configuration was changed for the asset-only workflow.
