-- Appearance-only adapter for six standalone transparent images.
local Icons = {}
Icons.ImageIds = {
    shop = "", -- shop-cart.png
    menu = "", -- menu-backpack.png
    farm = "", -- farm-cow.png
    myFarm = "", -- my-farm-house.png
    lobby = "", -- lobby-house.png
    badges = "", -- badges-medal.png
}

function Icons.Apply(target, name)
    local imageId = assert(Icons.ImageIds[name], "Unknown classic icon: " .. name)
    assert(imageId ~= "", "Upload the icon and set ClassicMenuIcons.ImageIds." .. name)
    target.Image = imageId
    target.ImageRectOffset = Vector2.zero
    target.ImageRectSize = Vector2.zero
    target.ScaleType = Enum.ScaleType.Fit
    target.ImageColor3 = Color3.new(1, 1, 1)
    target.BackgroundTransparency = 1
end

return Icons
