# Screen recipes

**Version 2 appearance:** use [POLISHED_DESIGN.md](../POLISHED_DESIGN.md), the current full-screen PNGs, and `StormGuiSurfaces.luau` for button/card/header/panel visuals. These recipes still describe the original feature bindings; older surface-name examples below are compatibility references.

Use existing names and game data. The screenshot names below identify current UI, not a requirement to rebuild the instance tree.

## Shared visual language

- Smooth surfaces only: no studs, rivets, repeating dots or embossed patterns.
- Near-black outlines, compact corner radii, vivid flat color, one top highlight and a darker lower lip.
- White primary text with a black stroke; gold/yellow section headings where already used; vivid green income values.
- `Enum.Font.FredokaOne` is a suitable starting point. Confirm glyph coverage for the game's languages; retain its current compatible font when needed. Use bounded text sizing rather than scaling every label arbitrarily.
- Large icons, less empty padding inside data grids, stronger separation of rarity. Keep gameplay visible around modals.
- Base panel: `panel.shell` (standalone, nine-slice). Header: named `header.*` atlas sprite, with title and close action as separate objects.
- Button faces: `control.*`. Use dark text with an outline or white with a black outline, whichever passes contrast against that face.
- Rarity: `card.common`, `.uncommon`, `.rare`, `.epic`, `.legendary`, `.mythic`. Keep an explicit rarity TextLabel. `card.locked` is for undiscovered objects; overlay the game's own silhouette and `???` label. `card.selected` is an optional selection treatment; it must not conceal rarity information.
- Icons use `ScaleType.Fit`, preserving their aspect ratio. Headers/buttons/cards use the atlas crop and Stretch at their documented aspect ratio; moderate resizing is fine. For radically different shapes, build an equivalent native Frame + UIStroke + UIGradient from the color tokens instead of distorting the atlas.
- Do not apply SliceCenter to an atlas sprite. Only the separate panel texture has a supported nine-slice configuration.

### Full-width header placement

The header ImageLabel fills the panel interior width, with no horizontal content padding. Put padding on its title/icon children, not on the header container. `Assets.Apply` fills header backgrounds using `fillColor` so transparent edge pixels cannot reveal a dark inset gap. Keep the close button within that full-width header. The title is MY FARM and the Farm/loot navigation uses the original cow motif.

## HUD — screenshot 134312

Top: existing build material/progress and storm state, using an unobtrusive dark panel. A red `header.warning` can back the tornado alert; the live phase/countdown and distance remain native text. Keep build fill animated from game state using a clipped native Frame, never by stretching text in an image.

Left: `icon.cash`, `icon.strength`, `icon.salvage`, `icon.tornado`. Preserve cash, cash/sec, multiplier, carrying strength, loot capacity, index count, and tornadoes survived. Income is a live label beside `icon.cash`; this pack does not add economy ticks.

Right: existing shop/boost controls. Use `icon.cash`, `icon.strength`, `icon.luck`; retain existing product metadata and Roblox purchase icons from the approved project assets. No made-up Robux icon or product price is supplied.

Bottom: Free → `icon.freeRewards`; Farm → `icon.base`; Pets → `icon.pets`; Gifts → `icon.playtime`; Quests → `icon.quests`; Rebirth → `icon.rebirth`; Pass → `icon.pass`; Settings → `icon.settings`. Put native labels beneath icons. Keep notification dots and counters as separate objects. The close icon is `icon.close`.

## My Farm / base — 134221, 134230, 134256, 134300

- Orange `header.base`, cow icon, separate close button.
- Preserve Loot / Index / Rebirth / Decor tabs and active state. Selected tab can use a colored `control.*`, inactive tab the native dark treatment.
- Above grid: live owned/capacity count left, cash/sec right.
- Loot cards: rarity backdrop, existing item thumbnail or ViewportFrame, name, income, and separate orange sell button. Preserve confirmation behavior and authoritative sell value.
- Index cards: bright rarity backdrops; silhouette/unknown state and counts are native overlays. Right detail pane uses a plain dark native frame.
- Rebirth: `header.rebirth`, `icon.rebirth`, live multiplier/requirements, native progress track, disabled/available confirmation state. Keep irreversible-action confirmation if present.
- Decor: same structure as loot; use existing decoration thumbnails and bonus labels. No decoration illustrations are invented in this pack.

## Storm Pups / Pets / Eggs — 134236, 134240

- Pink `header.pets`, `icon.pets`, separate close action.
- Preserve Pets / Eggs tabs, equipped capacity and owned count.
- Pet art comes from the existing game. Use matching rarity card backgrounds and independent Golden/Rainbow/equipped badges.
- Equip Best uses a gold button face; equip/unequip uses a green face plus explicit state.
- Keep the combined-bonus pane readable at the right on desktop; stack it beneath the grid on narrow displays.
- Egg panels keep the existing egg art, hatch odds and actual purchase bindings. The generic salvage-crate icon is not a replacement for eggs.

## Free rewards / daily rewards — 134214

- Lime `header.rewards`, `icon.freeRewards`, square reward cards with blue/gold rarity accents.
- Preserve seven days, streak state, claimed state, all currency amounts and existing eligibility.
- A large final-day card may use the existing actual reward's rarity background; do not imply an unimplemented reward.
- Claimed overlays and check marks should be native text or existing game icons; inactive artwork alone is not a sufficient state indicator.
- Favorite/notification actions retain the game's supported platform APIs and reward validation.

## Playtime gifts — 134245

- Gold `header.gifts`, `icon.playtime` or `icon.freeRewards` depending on existing identity.
- Reward grid uses existing rewards and timer data. Locked/ready/claimed overlays stay native and update from the existing reward state.
- Green claim buttons change to disabled gray after a confirmed claim. Do not start independent client timers for eligibility.

## Quests — 134251

- Royal-blue `header.quests`, `icon.quests`.
- Compact daily/weekly groups, large objective text, existing reward thumbnails, and a clipped native progress fill.
- Rewards and reset times come from the game's existing model. Claim actions must remain server-validated.

## Storm Pass — 134305

- Violet `header.rebirth` is deliberately shared by Rebirth and Storm Pass; use `icon.pass` and a `STORM PASS` native title here.
- Keep the free/premium two-track structure, current XP/tier and actual premium ownership.
- Gold purchase face and existing premium purchase flow; green claim face for eligible free rewards.
- Preserve horizontal/vertical scroll behavior, tooltips and premium lock affordances.

## Build / survive / salvage prompts

- Build phase: orange header or a compact native band with `icon.build`; retain the actual round timer and shared base progress.
- Tornado phase: red warning header and `icon.tornado`, with the existing evacuation/shelter instruction and accessibility cue.
- Loot return: `icon.salvage`, live backpack count, green confirm/deposit action if already present.
- Return to base: show the actual increase in base income using `icon.cash`; no fixed dollar value is baked into art.

The assets are an appearance layer. They do not implement or alter any of these game systems.
