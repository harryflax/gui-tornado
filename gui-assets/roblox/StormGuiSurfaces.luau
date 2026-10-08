-- Clean v2 surfaces. Upload polished-surfaces.png and set ImageId.
local Assets = {}
Assets.ImageId = ""
Assets.UploadedSize = Vector2.new(1536, 1408)
Assets.Sprites = {
    ["button.green"] = { offset = Vector2.new(32, 32), size = Vector2.new(336, 88), slice = Rect.new(32, 32, 304, 56) },
    ["button.gold"] = { offset = Vector2.new(408, 32), size = Vector2.new(336, 88), slice = Rect.new(32, 32, 304, 56) },
    ["button.orange"] = { offset = Vector2.new(784, 32), size = Vector2.new(336, 88), slice = Rect.new(32, 32, 304, 56) },
    ["button.pink"] = { offset = Vector2.new(1160, 32), size = Vector2.new(336, 88), slice = Rect.new(32, 32, 304, 56) },
    ["button.blue"] = { offset = Vector2.new(32, 152), size = Vector2.new(336, 88), slice = Rect.new(32, 32, 304, 56) },
    ["button.disabled"] = { offset = Vector2.new(408, 152), size = Vector2.new(336, 88), slice = Rect.new(32, 32, 304, 56) },
    ["button.greenHover"] = { offset = Vector2.new(784, 152), size = Vector2.new(336, 88), slice = Rect.new(32, 32, 304, 56) },
    ["button.greenPressed"] = { offset = Vector2.new(1160, 152), size = Vector2.new(336, 88), slice = Rect.new(32, 32, 304, 56) },
    ["card.common"] = { offset = Vector2.new(32, 284), size = Vector2.new(232, 260), slice = Rect.new(32, 32, 200, 228) },
    ["card.uncommon"] = { offset = Vector2.new(320, 284), size = Vector2.new(232, 260), slice = Rect.new(32, 32, 200, 228) },
    ["card.rare"] = { offset = Vector2.new(608, 284), size = Vector2.new(232, 260), slice = Rect.new(32, 32, 200, 228) },
    ["card.epic"] = { offset = Vector2.new(32, 576), size = Vector2.new(232, 260), slice = Rect.new(32, 32, 200, 228) },
    ["card.legendary"] = { offset = Vector2.new(320, 576), size = Vector2.new(232, 260), slice = Rect.new(32, 32, 200, 228) },
    ["card.mythic"] = { offset = Vector2.new(608, 576), size = Vector2.new(232, 260), slice = Rect.new(32, 32, 200, 228) },
    ["header.base"] = { offset = Vector2.new(916, 296), size = Vector2.new(576, 64), slice = Rect.new(16, 16, 560, 48), fillColor = "#da7524" },
    ["header.pets"] = { offset = Vector2.new(916, 408), size = Vector2.new(576, 64), slice = Rect.new(16, 16, 560, 48), fillColor = "#bc438a" },
    ["header.gifts"] = { offset = Vector2.new(916, 520), size = Vector2.new(576, 64), slice = Rect.new(16, 16, 560, 48), fillColor = "#c38e24" },
    ["header.quests"] = { offset = Vector2.new(916, 632), size = Vector2.new(576, 64), slice = Rect.new(16, 16, 560, 48), fillColor = "#2277c2" },
    ["header.pass"] = { offset = Vector2.new(916, 744), size = Vector2.new(576, 64), slice = Rect.new(16, 16, 560, 48), fillColor = "#7950d5" },
    ["panel.shell"] = { offset = Vector2.new(32, 892), size = Vector2.new(700, 480), slice = Rect.new(32, 32, 668, 448) },
    ["tab.normal"] = { offset = Vector2.new(792, 910), size = Vector2.new(320, 72), slice = Rect.new(32, 32, 288, 40) },
    ["tab.selected"] = { offset = Vector2.new(792, 1018), size = Vector2.new(320, 72), slice = Rect.new(32, 32, 288, 40) },
    ["hud.stat"] = { offset = Vector2.new(792, 1130), size = Vector2.new(320, 112), slice = Rect.new(32, 32, 288, 80) },
}
function Assets.Apply(target, name)
    local spec = assert(Assets.Sprites[name], "Unknown surface: " .. name)
    assert(Assets.ImageId ~= "", "Upload polished-surfaces.png and set StormGuiSurfaces.ImageId")
    local scale = Assets.UploadedSize / Vector2.new(1536, 1408)
    target.Image = Assets.ImageId
    target.ImageRectOffset = spec.offset * scale
    target.ImageRectSize = spec.size * scale
    target.ScaleType = Enum.ScaleType.Slice
    target.SliceCenter = Rect.new(spec.slice.Min * scale, spec.slice.Max * scale)
    target.BackgroundTransparency = if spec.fillColor then 0 else 1
    if spec.fillColor then target.BackgroundColor3 = Color3.fromHex(spec.fillColor) end
end
return Assets
