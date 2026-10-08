# Version 2 surface source

Current buttons, cards, panels, tabs and headers are authored in `screens-polish.css` and exported from `surface-kit.html` using Chromium. They are blank reusable UI surfaces; text and icons remain separate. The eleven full-screen PNGs are browser exports of the layered layouts. Regenerate with the two export scripts described in [POLISHED_DESIGN.md](../POLISHED_DESIGN.md).

The earlier image-generation prompts below document the retained icon and item artwork and legacy v1 surfaces. Do not regenerate old glossy surface art when targeting v2.

# Version 1.1 art direction

The current pack supersedes the original studded version. Do not bring back stud textures or the elaborate house/crystal-crate icons.

## Requirements

- Keep the current bright simulator palette and clear silhouette hierarchy.
- All headers, buttons and rarity cards have smooth gradients. No studs, repeating squares, rivets or embossed dots.
- Colored headers must run edge to edge. Header sprites crop the inner colored face; matching `fillColor` fills the ImageLabel background. Put horizontal padding on title/icon children rather than insetting the header container.
- Icons should resemble the original tornado game: simpler emoji-like shapes, minimal shading, no elaborate gem highlights.
- All external background pixels are transparent. Leave room between sprites for independent rectangular cropping.
- No baked prices, reward values, names, timers or other live game text.

## Icon atlas prompt

Sixteen simple flat game icons in a 4×4 arrangement with large transparent gutters. Rounded emoji-like proportions, smooth clean shapes and restrained shading. Row 1: yellow present with red ribbon, black-and-white dairy cow, two reddish-brown paw prints, ivory/red alarm clock with yellow bells. Row 2: beige parchment with short orange lines, white circular arrows on a cyan square, yellow lightning bolt, gray-blue gear. Row 3: green cash bundle with yellow band, yellow flexed arm, pale blue-gray tornado with spiral curves, green four-leaf clover. Row 4: crossed wood planks, second cow for loot, cyan shield, red square with white close cross. No textures, labels, background, particles or elaborate 3D rendering.

## Surface edits

Headers: remove all studs and the broad black side caps/bottom trough. Use a smooth colored rectangle with a thin dark edge and restrained diagonal shine. Preserve orange/cyan/pink/lime/gold/blue/violet/red order.

Buttons: remove all square motifs and embossed bumps. Keep green normal/hover/pressed, gray disabled, cyan, gold, orange and pink faces with one top highlight and a shallow lower lip.

Rarity cards: remove every repeated stud. Smooth bright-to-dark gradients with a clean colored rim; preserve gray, lime, blue, violet, gold, rainbow-rimmed pink, dark gray-blue and selected green order.

## Coordinate handling

The delivered version 1.1 PNGs are 1254×1254. Generation does not guarantee fixed positioning or dimensions. Re-measure artwork after any regeneration; update manifest.json, manifest.js, the Luau adapter and SHA-256 hashes together. All sprite names remain compatible with version 1.0 but the four revised atlas image IDs and coordinates must be replaced together.

## Version 1.2 supplementary artwork

The existing five textures are unchanged. A new transparent 6-column × 4-row sheet adds these simple original-game motifs, with smooth shading, generous gutters and no text:

1. Toilet, pig, mailbox, mallard duck, pink tulip, water fountain.
2. Bee, tent-like gazebo symbol, golden cow, blue diamond, gold crown, money bag.
3. Owl, penguin, bunny, hamster, puppy, kitten.
4. Fox, green dragon, cream egg, cardboard crate, rocket, catching hands.

Actual output: 1536 × 1024. The delivered alpha channel removes the background; measure silhouettes instead of assuming equal grid cells. The two hands share one crop. Coordinates and hash are recorded separately in `content-manifest.json`, `content-manifest.js` and `roblox/ScreenItemAssets.luau`.

`storm-background.png` was generated from the user's original HUD screenshot with its UI removed: retain the storm-dark village, grassy terrain, houses, water tower, player and pets; no menus, text or icons. This opaque background is presentation-only. Full-screen menus are rendered from editable HTML/CSS using the source atlas images, so labels and prices remain separate layers in the source.
