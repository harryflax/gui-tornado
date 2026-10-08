--!strict
-- Appearance-only adapter. Upload the five PNGs and enter their IMAGE content IDs.
-- This module does not create UI, change data, or connect game actions.
local Assets = {}

Assets.AssetIds = {
    Panel = "", -- textures/panel-shell.png
    Icons = "", -- textures/navigation-icons.png
    Controls = "", -- textures/controls-atlas.png
    Headers = "", -- textures/headers-atlas.png
    Cards = "", -- textures/rarity-cards.png
} :: {[string]: string}

-- Set to the actual image dimensions AFTER Roblox upload if it resized a texture.
-- All delivered PNGs are 1254 x 1254; do not guess whether upload kept this size.
-- Example after verifying a 1024 x 1024 upload: Assets.UploadedSizes.Icons = Vector2.new(1024, 1024)
Assets.UploadedSizes = {
    Panel = Vector2.new(1254, 1254),
    Icons = Vector2.new(1254, 1254),
    Controls = Vector2.new(1254, 1254),
    Headers = Vector2.new(1254, 1254),
    Cards = Vector2.new(1254, 1254),
} :: {[string]: Vector2}

type Sprite = {
    texture: string,
    offset: Vector2,
    size: Vector2,
    scale: Enum.ScaleType,
    slice: Rect?,
    background: Color3?,
}

Assets.Sprites = {
    ["panel.shell"] = { texture = "Panel", offset = Vector2.new(0, 0), size = Vector2.new(1254, 1254), scale = Enum.ScaleType.Slice, slice = Rect.new(112, 112, 1142, 1142) },
    ["control.green"] = { texture = "Controls", offset = Vector2.new(21, 106), size = Vector2.new(601, 217), scale = Enum.ScaleType.Stretch },
    ["control.greenHover"] = { texture = "Controls", offset = Vector2.new(632, 106), size = Vector2.new(602, 217), scale = Enum.ScaleType.Stretch },
    ["control.greenPressed"] = { texture = "Controls", offset = Vector2.new(21, 369), size = Vector2.new(601, 218), scale = Enum.ScaleType.Stretch },
    ["control.disabled"] = { texture = "Controls", offset = Vector2.new(632, 369), size = Vector2.new(602, 218), scale = Enum.ScaleType.Stretch },
    ["control.blue"] = { texture = "Controls", offset = Vector2.new(21, 647), size = Vector2.new(601, 218), scale = Enum.ScaleType.Stretch },
    ["control.gold"] = { texture = "Controls", offset = Vector2.new(632, 647), size = Vector2.new(602, 218), scale = Enum.ScaleType.Stretch },
    ["control.orange"] = { texture = "Controls", offset = Vector2.new(21, 915), size = Vector2.new(601, 220), scale = Enum.ScaleType.Stretch },
    ["control.pink"] = { texture = "Controls", offset = Vector2.new(632, 915), size = Vector2.new(602, 220), scale = Enum.ScaleType.Stretch },
    ["header.base"] = { texture = "Headers", offset = Vector2.new(34, 174), size = Vector2.new(570, 155), scale = Enum.ScaleType.Stretch, background = Color3.fromRGB(255, 131, 0) },
    ["header.index"] = { texture = "Headers", offset = Vector2.new(650, 174), size = Vector2.new(570, 155), scale = Enum.ScaleType.Stretch, background = Color3.fromRGB(0, 191, 255) },
    ["header.pets"] = { texture = "Headers", offset = Vector2.new(34, 432), size = Vector2.new(570, 154), scale = Enum.ScaleType.Stretch, background = Color3.fromRGB(255, 26, 180) },
    ["header.rewards"] = { texture = "Headers", offset = Vector2.new(650, 432), size = Vector2.new(570, 154), scale = Enum.ScaleType.Stretch, background = Color3.fromRGB(103, 242, 0) },
    ["header.gifts"] = { texture = "Headers", offset = Vector2.new(34, 689), size = Vector2.new(570, 155), scale = Enum.ScaleType.Stretch, background = Color3.fromRGB(255, 198, 0) },
    ["header.quests"] = { texture = "Headers", offset = Vector2.new(650, 689), size = Vector2.new(570, 155), scale = Enum.ScaleType.Stretch, background = Color3.fromRGB(0, 107, 255) },
    ["header.rebirth"] = { texture = "Headers", offset = Vector2.new(34, 947), size = Vector2.new(570, 154), scale = Enum.ScaleType.Stretch, background = Color3.fromRGB(140, 22, 255) },
    ["header.warning"] = { texture = "Headers", offset = Vector2.new(650, 947), size = Vector2.new(571, 154), scale = Enum.ScaleType.Stretch, background = Color3.fromRGB(255, 37, 40) },
    ["card.common"] = { texture = "Cards", offset = Vector2.new(14, 44), size = Vector2.new(303, 565), scale = Enum.ScaleType.Stretch },
    ["card.uncommon"] = { texture = "Cards", offset = Vector2.new(323, 44), size = Vector2.new(301, 565), scale = Enum.ScaleType.Stretch },
    ["card.rare"] = { texture = "Cards", offset = Vector2.new(630, 44), size = Vector2.new(304, 565), scale = Enum.ScaleType.Stretch },
    ["card.epic"] = { texture = "Cards", offset = Vector2.new(938, 44), size = Vector2.new(303, 565), scale = Enum.ScaleType.Stretch },
    ["card.legendary"] = { texture = "Cards", offset = Vector2.new(14, 645), size = Vector2.new(303, 564), scale = Enum.ScaleType.Stretch },
    ["card.mythic"] = { texture = "Cards", offset = Vector2.new(323, 645), size = Vector2.new(301, 564), scale = Enum.ScaleType.Stretch },
    ["card.locked"] = { texture = "Cards", offset = Vector2.new(630, 645), size = Vector2.new(304, 564), scale = Enum.ScaleType.Stretch },
    ["card.selected"] = { texture = "Cards", offset = Vector2.new(939, 645), size = Vector2.new(302, 564), scale = Enum.ScaleType.Stretch },
    ["icon.freeRewards"] = { texture = "Icons", offset = Vector2.new(34, 38), size = Vector2.new(280, 280), scale = Enum.ScaleType.Fit },
    ["icon.base"] = { texture = "Icons", offset = Vector2.new(331, 27), size = Vector2.new(312, 312), scale = Enum.ScaleType.Fit },
    ["icon.pets"] = { texture = "Icons", offset = Vector2.new(674, 55), size = Vector2.new(273, 273), scale = Enum.ScaleType.Fit },
    ["icon.playtime"] = { texture = "Icons", offset = Vector2.new(949, 47), size = Vector2.new(273, 273), scale = Enum.ScaleType.Fit },
    ["icon.quests"] = { texture = "Icons", offset = Vector2.new(35, 347), size = Vector2.new(276, 276), scale = Enum.ScaleType.Fit },
    ["icon.rebirth"] = { texture = "Icons", offset = Vector2.new(354, 350), size = Vector2.new(260, 260), scale = Enum.ScaleType.Fit },
    ["icon.pass"] = { texture = "Icons", offset = Vector2.new(657, 353), size = Vector2.new(270, 270), scale = Enum.ScaleType.Fit },
    ["icon.settings"] = { texture = "Icons", offset = Vector2.new(948, 350), size = Vector2.new(274, 274), scale = Enum.ScaleType.Fit },
    ["icon.cash"] = { texture = "Icons", offset = Vector2.new(33, 626), size = Vector2.new(303, 303), scale = Enum.ScaleType.Fit },
    ["icon.strength"] = { texture = "Icons", offset = Vector2.new(352, 624), size = Vector2.new(274, 274), scale = Enum.ScaleType.Fit },
    ["icon.tornado"] = { texture = "Icons", offset = Vector2.new(649, 632), size = Vector2.new(286, 286), scale = Enum.ScaleType.Fit },
    ["icon.luck"] = { texture = "Icons", offset = Vector2.new(953, 644), size = Vector2.new(274, 274), scale = Enum.ScaleType.Fit },
    ["icon.build"] = { texture = "Icons", offset = Vector2.new(33, 926), size = Vector2.new(279, 279), scale = Enum.ScaleType.Fit },
    ["icon.salvage"] = { texture = "Icons", offset = Vector2.new(328, 902), size = Vector2.new(323, 323), scale = Enum.ScaleType.Fit },
    ["icon.shield"] = { texture = "Icons", offset = Vector2.new(658, 923), size = Vector2.new(283, 283), scale = Enum.ScaleType.Fit },
    ["icon.close"] = { texture = "Icons", offset = Vector2.new(957, 938), size = Vector2.new(263, 263), scale = Enum.ScaleType.Fit },
} :: {[string]: Sprite}

local function roundVector(value: Vector2): Vector2
    return Vector2.new(math.round(value.X), math.round(value.Y))
end

function Assets.Apply(target: ImageLabel | ImageButton, name: string)
    local spec = Assets.Sprites[name]
    assert(spec, "Unknown Storm GUI sprite: " .. name)
    local imageId = Assets.AssetIds[spec.texture]
    assert(imageId and string.match(imageId, "^rbxassetid://%d+$"),
        "Upload the PNG and set Assets.AssetIds." .. spec.texture .. " to its image content ID")
    local uploaded = Assets.UploadedSizes[spec.texture]
    assert(uploaded and uploaded.X > 0 and uploaded.Y > 0, "Invalid uploaded texture size")
    local ratio = uploaded / Vector2.new(1254, 1254)
    target.BackgroundTransparency = if spec.background then 0 else 1
    if spec.background then
        target.BackgroundColor3 = spec.background
        target.BorderSizePixel = 0
    end
    target.Image = imageId
    target.ImageColor3 = Color3.new(1, 1, 1)
    target.ImageTransparency = 0
    target.ScaleType = spec.scale
    if spec.slice then
        target.ImageRectOffset = Vector2.zero
        target.ImageRectSize = Vector2.zero
        target.SliceCenter = Rect.new(roundVector(spec.slice.Min * ratio), roundVector(spec.slice.Max * ratio))
        -- Preserve equivalent border thickness when the upload was downsampled.
        target.SliceScale = 0.25 / ratio.X
    else
        local offset = roundVector(spec.offset * ratio)
        local last = roundVector((spec.offset + spec.size) * ratio)
        target.ImageRectOffset = offset
        target.ImageRectSize = last - offset
    end
end

return Assets
