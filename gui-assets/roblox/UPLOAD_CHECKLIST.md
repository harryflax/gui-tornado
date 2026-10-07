# Import into Roblox

1. Open the intended published experience in Roblox Studio under the user/group that owns it.
2. Open Asset Manager (or the current Creator Dashboard image upload flow) and import each of the five PNG files from `../textures/` as an image. Keep the entire atlas intact. Do not upload reference screenshots or the HTML preview.
3. Record the usable image content asset ID for each texture. An uploaded decal/container ID can differ from its image content ID; use the ID that resolves as an ImageLabel.Image. Verify with a temporary ImageLabel in Studio instead of assuming IDs are interchangeable.
4. Set `AssetIds.Panel`, `AssetIds.Icons`, `AssetIds.Controls`, `AssetIds.Headers`, and `AssetIds.Cards` at the top of `StormGuiAssets.luau` to the corresponding `rbxassetid://…` content IDs. Empty strings are deliberately left as placeholders.
5. Check actual uploaded image dimensions. The manifest and module contain rectangles for the delivered native PNG sizes. If Roblox resized an atlas, scale BOTH the rectangle offset and size by the actual/native ratio; adjust panel SliceCenter similarly. Avoid importing a resized preview image by mistake.
6. Wait for any required moderation and verify that the experience owner/group is permitted to use the images. Test in the target experience, not only in an unrelated personal place.
7. Run Studio Play and exercise each skin element. Keep blank or unapproved images behind the existing UI until they resolve successfully.

This pack requires no npm packages, web build, API key, or service. Uploading images and wiring them into the actual Roblox project remain integration steps; this repository contains reference screenshots and the asset pack, not the game's source.
