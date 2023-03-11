--- GUI:default
-- Guard against mission not loaded
if (DCS.getTheatreID() == nil) then
    console.warning("WARNING: Not in mission can't extact Airdromes")
    return {}
end

local airodromes = terrain.GetTerrainConfig("Airdromes") -- this returns a class 

for _, v in ipairs(airodromes) do -- this currently doesn't work :/
    v["theatre"] = DCS.getTheatreID()
end

return airodromes



