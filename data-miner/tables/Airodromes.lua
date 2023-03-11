--- GUI:default
-- Guard against mission not loaded
if (DCS.getTheatreID() == nil) then
    console.warning("WARNING: Not in mission can't extact Airdromes")
    return {}
end

local airodromes = terrain.GetTerrainConfig("Airdromes") -- this returns a class 

for k, v in pairs(airodromes) do -- this currently doesn't work :/
    v["airbase_id"] = k
    v["theatre"] = DCS.getTheatreID()
end

return airodromes



