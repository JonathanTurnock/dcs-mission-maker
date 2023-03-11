--- GUI:default
-- Guard against mission not loaded
if (DCS.getTheatreID() == nil) then
    console.warning("WARNING: Not in mission can't extact Radios")
    return {}
end

local radios = terrain.getRadio()

for _, v in ipairs(radios) do
    v["theatre"] = DCS.getTheatreID()
    v["test"] = "test"
end

return radios