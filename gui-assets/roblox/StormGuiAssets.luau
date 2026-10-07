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
}

Assets.Sprites = {
    ["panel.shell"] = { texture = "Panel", offset = Vector2.new(0, 0), size = Vector2.new(1254, 1254), scale = Enum.ScaleType.Slice, slice = Rect.new(112, 112, 1142, 1142) },
    ["control.green"] = { texture = "Controls", offset = Vector2.new(21, 106), size = Vector2.new(601, 217), scale = Enum.ScaleType.Stretch },
    ["control.greenHover"] = { texture = "Controls", offset = Vector2.new(633, 106), size = Vector2.new(601, 217), scale = Enum.ScaleType.Stretch },
    ["control.greenPressed"] = { texture = "Controls", offset = Vector2.new(21, 370), size = Vector2.new(601, 217), scale = Enum.ScaleType.Stretch },
    ["control.disabled"] = { texture = "Controls", offset = Vector2.new(633, 370), size = Vector2.new(601, 217), scale = Enum.ScaleType.Stretch },
    ["control.blue"] = { texture = "Controls", offset = Vector2.new(21, 649), size = Vector2.new(601, 217), scale = Enum.ScaleType.Stretch },
    ["control.gold"] = { texture = "Controls", offset = Vector2.new(633, 649), size = Vector2.new(601, 219), scale = Enum.ScaleType.Stretch },
    ["control.orange"] = { texture = "Controls", offset = Vector2.new(21, 917), size = Vector2.new(601, 218), scale = Enum.ScaleType.Stretch },
    ["control.pink"] = { texture = "Controls", offset = Vector2.new(633, 917), size = Vector2.new(601, 218), scale = Enum.ScaleType.Stretch },
    ["header.base"] = { texture = "Headers", offset = Vector2.new(10, 146), size = Vector2.new(613, 207), scale = Enum.ScaleType.Stretch },
    ["header.index"] = { texture = "Headers", offset = Vector2.new(630, 147), size = Vector2.new(615, 206), scale = Enum.ScaleType.Stretch },
    ["header.pets"] = { texture = "Headers", offset = Vector2.new(10, 400), size = Vector2.new(613, 207), scale = Enum.ScaleType.Stretch },
    ["header.rewards"] = { texture = "Headers", offset = Vector2.new(631, 401), size = Vector2.new(615, 207), scale = Enum.ScaleType.Stretch },
    ["header.gifts"] = { texture = "Headers", offset = Vector2.new(10, 656), size = Vector2.new(613, 206), scale = Enum.ScaleType.Stretch },
    ["header.quests"] = { texture = "Headers", offset = Vector2.new(630, 656), size = Vector2.new(616, 206), scale = Enum.ScaleType.Stretch },
    ["header.rebirth"] = { texture = "Headers", offset = Vector2.new(9, 910), size = Vector2.new(615, 208), scale = Enum.ScaleType.Stretch },
    ["header.warning"] = { texture = "Headers", offset = Vector2.new(630, 910), size = Vector2.new(615, 208), scale = Enum.ScaleType.Stretch },
    ["card.common"] = { texture = "Cards", offset = Vector2.new(15, 44), size = Vector2.new(301, 564), scale = Enum.ScaleType.Stretch },
    ["card.uncommon"] = { texture = "Cards", offset = Vector2.new(324, 44), size = Vector2.new(299, 564), scale = Enum.ScaleType.Stretch },
    ["card.rare"] = { texture = "Cards", offset = Vector2.new(631, 44), size = Vector2.new(301, 564), scale = Enum.ScaleType.Stretch },
    ["card.epic"] = { texture = "Cards", offset = Vector2.new(939, 44), size = Vector2.new(301, 564), scale = Enum.ScaleType.Stretch },
    ["card.legendary"] = { texture = "Cards", offset = Vector2.new(15, 645), size = Vector2.new(301, 565), scale = Enum.ScaleType.Stretch },
    ["card.mythic"] = { texture = "Cards", offset = Vector2.new(324, 645), size = Vector2.new(299, 565), scale = Enum.ScaleType.Stretch },
    ["card.locked"] = { texture = "Cards", offset = Vector2.new(630, 645), size = Vector2.new(303, 565), scale = Enum.ScaleType.Stretch },
    ["card.selected"] = { texture = "Cards", offset = Vector2.new(940, 645), size = Vector2.new(299, 565), scale = Enum.ScaleType.Stretch },
    ["icon.freeRewards"] = { texture = "Icons", offset = Vector2.new(59, 75), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.base"] = { texture = "Icons", offset = Vector2.new(366, 78), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.pets"] = { texture = "Icons", offset = Vector2.new(662, 84), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.playtime"] = { texture = "Icons", offset = Vector2.new(971, 83), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.quests"] = { texture = "Icons", offset = Vector2.new(60, 382), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.rebirth"] = { texture = "Icons", offset = Vector2.new(363, 379), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.pass"] = { texture = "Icons", offset = Vector2.new(656, 381), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.settings"] = { texture = "Icons", offset = Vector2.new(965, 379), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.cash"] = { texture = "Icons", offset = Vector2.new(57, 677), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.strength"] = { texture = "Icons", offset = Vector2.new(365, 669), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.tornado"] = { texture = "Icons", offset = Vector2.new(663, 668), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.luck"] = { texture = "Icons", offset = Vector2.new(971, 677), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.build"] = { texture = "Icons", offset = Vector2.new(63, 958), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.salvage"] = { texture = "Icons", offset = Vector2.new(371, 960), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.shield"] = { texture = "Icons", offset = Vector2.new(662, 959), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
    ["icon.close"] = { texture = "Icons", offset = Vector2.new(969, 961), size = Vector2.new(240, 240), scale = Enum.ScaleType.Fit },
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
    target.BackgroundTransparency = 1
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
