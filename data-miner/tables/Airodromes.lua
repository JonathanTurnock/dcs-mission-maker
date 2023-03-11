--- GUI:default
-- Guard against mission not loaded
if (DCS.getTheatreID() == nil) then
    console.warning("WARNING: Not in mission can't extact Airdromes")
    return {}
end

local airodromes = terrain.GetTerrainConfig("Airdromes") -- this returns a class 

for k, v in ipairs(airodromes) do -- this currently doesn't work :/
    v["DCSID"] = k
    v["theatre"] = DCS.getTheatreID()
end

return airodromes



