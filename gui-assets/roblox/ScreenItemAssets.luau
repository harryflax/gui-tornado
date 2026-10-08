-- Optional original-game item illustrations. Upload menu-items.png and set ImageId.
local Assets = {}
Assets.ImageId = ""
Assets.UploadedSize = Vector2.new(1536, 1024)
Assets.Sprites = {
    ["item.toilet"] = { offset = Vector2.new(36, 70), size = Vector2.new(205, 205) },
    ["item.pig"] = { offset = Vector2.new(282, 72), size = Vector2.new(227, 227) },
    ["item.mailbox"] = { offset = Vector2.new(533, 68), size = Vector2.new(212, 212) },
    ["item.duck"] = { offset = Vector2.new(790, 66), size = Vector2.new(211, 211) },
    ["item.tulip"] = { offset = Vector2.new(1036, 70), size = Vector2.new(208, 208) },
    ["item.fountain"] = { offset = Vector2.new(1290, 91), size = Vector2.new(195, 195) },
    ["item.bee"] = { offset = Vector2.new(38, 315), size = Vector2.new(213, 213) },
    ["item.gazebo"] = { offset = Vector2.new(276, 303), size = Vector2.new(240, 240) },
    ["item.goldenCow"] = { offset = Vector2.new(536, 300), size = Vector2.new(233, 233) },
    ["item.diamond"] = { offset = Vector2.new(801, 322), size = Vector2.new(199, 199) },
    ["item.crown"] = { offset = Vector2.new(1029, 310), size = Vector2.new(222, 222) },
    ["item.moneybag"] = { offset = Vector2.new(1286, 314), size = Vector2.new(208, 208) },
    ["item.owl"] = { offset = Vector2.new(44, 545), size = Vector2.new(204, 204) },
    ["item.penguin"] = { offset = Vector2.new(287, 541), size = Vector2.new(213, 213) },
    ["item.bunny"] = { offset = Vector2.new(542, 538), size = Vector2.new(201, 201) },
    ["item.hamster"] = { offset = Vector2.new(794, 550), size = Vector2.new(189, 189) },
    ["item.puppy"] = { offset = Vector2.new(1020, 533), size = Vector2.new(232, 232) },
    ["item.kitten"] = { offset = Vector2.new(1289, 544), size = Vector2.new(201, 201) },
    ["item.fox"] = { offset = Vector2.new(38, 763), size = Vector2.new(214, 214) },
    ["item.dragon"] = { offset = Vector2.new(271, 743), size = Vector2.new(267, 267) },
    ["item.egg"] = { offset = Vector2.new(556, 779), size = Vector2.new(191, 191) },
    ["item.crate"] = { offset = Vector2.new(783, 766), size = Vector2.new(208, 208) },
    ["item.rocket"] = { offset = Vector2.new(1024, 766), size = Vector2.new(212, 212) },
    ["item.hands"] = { offset = Vector2.new(1272, 758), size = Vector2.new(228, 228) },
}
function Assets.Apply(target, name)
    local spec = assert(Assets.Sprites[name], "Unknown item sprite: " .. name)
    assert(Assets.ImageId ~= "", "Upload menu-items.png and set ScreenItemAssets.ImageId")
    local scale = Assets.UploadedSize / Vector2.new(1536, 1024)
    target.Image = Assets.ImageId
    target.ImageRectOffset = spec.offset * scale
    target.ImageRectSize = spec.size * scale
    target.ScaleType = Enum.ScaleType.Fit
    target.BackgroundTransparency = 1
end
return Assets
