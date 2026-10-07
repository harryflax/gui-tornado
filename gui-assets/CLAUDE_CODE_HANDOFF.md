# Claude Code handoff — tornado-survival GUI reskin

Copy the following task into Claude Code with this repository and the actual Roblox source available.

---

Reskin my EXISTING Roblox tornado-survival game using `gui-assets/`. This is an image asset integration task, not a new website or a replacement game.

First read:

1. `gui-assets/README.md`
2. `gui-assets/reference/REFERENCE_MAP.md`
3. `gui-assets/manifest.json`
4. `gui-assets/roblox/StormGuiAssets.luau`
5. `gui-assets/roblox/ScreenRecipes.md`

My game loop is: build a base with friends in short rounds, survive the tornado, collect storm loot, return it to the base, earn cash per second. The screenshots uploaded in commit `8b81e70` show my existing screens. The screenshots uploaded later in `59b573c` show the viral-game visual direction I want. Preserve my screen names, features, and existing data. Use the brighter, squarer, bold-outline style of the later references.

## Work to perform

- Inspect my actual ScreenGui hierarchy and LocalScripts before editing. If this checkout only contains the screenshots and asset pack, do not invent game source or pretend integration is complete. Locate the actual Roblox project or request its location.
- Use the finished PNG textures in `gui-assets/textures/`. They are sprite sheets plus one standalone panel frame. Do not use the screenshots as in-game textures.
- Read the asset manifest for exact image dimensions, names, pixel rectangles, safe-area notes, and scale behavior. Atlas rectangles are zero-based pixels, not normalized UV coordinates. Upload each ENTIRE PNG once. Do not individually upload crops.
- Roblox needs uploaded image asset IDs. Follow `roblox/UPLOAD_CHECKLIST.md`, then fill the five ID entries at the top of `StormGuiAssets.luau`. Do not fabricate `rbxassetid://` numbers or reuse another developer's assets. A local PNG filename cannot be an ImageLabel.Image at runtime.
- Place the module in ReplicatedStorage or the project's existing shared UI location. The module only applies image properties; it must not create RemoteEvents or replace game services.
- Apply these images to existing ImageLabels/ImageButtons, retaining their original parent, layout order, anchors, input handlers, and authoritative data bindings. If replacing a Frame/TextButton is necessary, migrate its children and existing bindings deliberately. Do not drop event handlers while replacing an Instance.
- Put all text in native TextLabels/TextButtons ABOVE the artwork: names, prices, cash, cash/sec, countdowns, capacity, rarity, pet bonuses, ownership, build progress, pass XP and purchase labels. Use a heavy rounded Roblox font such as FredokaOne, with a near-black UIStroke. Preserve localization. Do not bake current values into images.
- Use ViewportFrames or the existing owned item/pet thumbnails over blank rarity cards. Keep sell/equip/claim controls separate and interactive. The art is a background, not a whole clickable menu.
- Follow `ScreenRecipes.md` to map the art to the existing HUD and every shown screen.
- Preserve all RemoteEvents, server-side purchase validation, MarketplaceService flows, timers, progress persistence, monetization product IDs, pet stats, item values and co-op behavior. Do not add fake multiplayer, fake purchases, or placeholder economy logic.
- Make a reversible visual change. Prefer a feature flag or a skin module that leaves the old visuals available until reviewed.

## Layout and behavior

- Keep the gameplay center clear. Cash/income/strength/capacity stay at the left, shop/boost actions at the right, navigation at the bottom, build and storm status near the top.
- Respect Roblox's topbar/device safe area. Preserve the project's screen inset policy; do not force IgnoreGuiInset across all ScreenGuis.
- Make modal content scroll rather than shrink text on small devices. Use UIListLayout/UIGridLayout, UIAspectRatioConstraint for icons, UISizeConstraint and UITextSizeConstraint where appropriate.
- Aim for at least 48 x 48 screen-pixel touch hit areas. Visible icons can be smaller inside their transparent padding.
- Atlas artwork includes transparent padding. Use manifest.contentInset or visually inspect the preview when aligning labels; cell edges are not always the visible button edges.
- Prefer `ImageButton.Activated` for shared mouse/touch/gamepad actions. Keep the existing navigation selection order, visible focus state and controller back action.
- Pair color with text or icons: selected tab, equipped, claimed, locked, rarity and warning states must remain understandable without color alone.
- Animate UI scale lightly if the game already supports animation preferences; never make a hover state the only input affordance.

## Acceptance checks

1. Desktop, narrow phone, tablet and gamepad navigation remain usable; no clipped labels, offscreen close buttons or hidden primary actions.
2. Every modal opens/closes, all tabs work, scrolling works, and no visual overlay intercepts the wrong input.
3. Cash/sec, wallet, build progress and round timers still update from the original game data.
4. Buy/sell/equip/claim/rebirth/pass actions call their ORIGINAL validated game logic exactly once.
5. Image transparency is clean; sprites do not show neighboring cells or become blurred from double-scaling.
6. All uploaded image IDs resolve in the experience owner's permissions context after moderation.
7. Test in Roblox Studio Play mode with multiple players for shared base actions. Report which checks actually ran and any external blocker. The asset pack itself has not been tested in Studio.
8. Keep this task restricted to UI assets and integration. Do not rebuild the game as React, HTML, or a simulator.

Give me a concise summary of the scripts/instances touched, screenshots of the new GUI in Studio if available, and any remaining asset-ID or access requirements.

---
