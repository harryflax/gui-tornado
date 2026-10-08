# Version 2 — clean storm GUI

The eleven full-screen designs now use a shared blue panel system, clean beveled buttons, subtle rarity borders, larger item artwork, inset tabs and a compact navigation dock. The text, prices, stats, reward schedules and menu actions are unchanged from version 1.2.

**Open `screens.html` after extracting the repository ZIP.** [All finished PNGs](FULL_SCREENS.md) have been replaced with the redesigned 1920 × 1080 exports. Open `preview.html` to inspect the new reusable surfaces; previous v1 surfaces are labeled legacy.

![Redesigned Farm menu](screens/farm-loot.png)

## Files for Claude

| File | Purpose |
| --- | --- |
| `screens-polish.css` | Current appearance specification, loaded after the base layout CSS |
| `screens.css` / `screens.js` | Layout geometry and unchanged sample information |
| `textures/polished-surfaces.png` | 1536 × 1408 transparent atlas containing 23 blank surfaces |
| `surface-manifest.json` | Measured rectangles, slice centers, content padding and hash |
| `roblox/StormGuiSurfaces.luau` | Appearance-only adapter for the new atlas |
| `surface-kit.html` / `surface-kit.js` | Editable blank surface source, sharing the actual screen styles |

The atlas contains eight button faces (five colors, disabled, green hover and green pressed), six rarity cards, five headers, a modal panel, two tab states and a HUD stat panel. All are blank: icons, text, item illustrations and data remain separate.

For the v2 look, use **three image atlases**: `polished-surfaces.png`, the existing `navigation-icons.png` and the existing `menu-items.png`. The old controls, headers, cards and panel textures are retained for compatibility; do not use those older surfaces when targeting the new screens.

## Roblox integration

1. Upload the new atlas under the experience owner/group and set `StormGuiSurfaces.ImageId` to its real image content ID. Verify actual uploaded dimensions and adjust `UploadedSize` if resized. No Roblox image upload has been performed here.
2. Apply the new surfaces to ImageLabels/ImageButtons with `Surfaces.Apply(target, "button.green")`, `card.rare`, `header.base`, `panel.shell`, etc. Exact names are in the manifest. Retain the existing game hierarchy and data bindings.
3. Use `StormGuiAssets` only for the retained navigation/game icons, and `ScreenItemAssets` for the optional item/pet illustrations. Existing game thumbnails/ViewportFrames can remain in place.
4. Keep native labels above the surfaces. Use rounded medium-weight white text on panels, dark text on bright buttons, and muted blue secondary text. Do not add the old thick black text strokes back. Recommended button label colors: green `#173622`, gold `#573C19`, orange `#56301B`, pink `#5B2346`, blue `#1D3B58`, disabled `#8CA1B8`.
5. Most atlas rectangles include **12 source pixels of shadow padding** on each edge. Oversize an appearance-only child image around the actual interactive control, or account for that inset when aligning. Do not reduce the hit target to the visible artwork. Header rectangles crop to the colored face; the adapter supplies a matching native background fill so headers still span the entire modal interior.
6. Nine-slice preserves corners. For greatly different aspect ratios or exact responsive gradients, recreate the surface with native Frame/UICorner/UIStroke/UIGradient using `screens-polish.css` as the visual specification. Preserve the layout of labels and artwork separately.

Hover raises an enabled button slightly and brightens it; press lowers it. Disabled controls stay visibly muted. Apply those states through the existing game input system, including touch/gamepad; do not enable a disabled claim or purchase because its art changed. Respect reduced-motion preferences where available.

The preview's world blur is presentation-only. Retain the game's camera and existing menu effects. The user information, multiplayer behavior and economy remain the responsibility of the original game scripts.

## Rebuild and verify

Use the Playwright/Chromium environment described in [FULL_SCREENS.md](FULL_SCREENS.md). With the preview server running:

```bash
node gui-assets/tools/export_surfaces.cjs
node gui-assets/tools/export_screens.cjs
python3 gui-assets/tools/validate_assets.py
```

The first command regenerates the transparent atlas, JSON/JS metadata and Luau mapping from the shared styles. The second regenerates all eleven screens and verifies their text against `tools/screen-content.json`, captured from v1.2 before this redesign. It also checks full-width headers, clipping and navigation. Update the content fixture only when the user intentionally changes game information.

Studio integration and image moderation still require the actual Roblox project and uploaded asset IDs.
