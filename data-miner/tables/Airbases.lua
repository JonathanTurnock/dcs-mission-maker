--- MISSION:default
local reverse_category = {}

for k,v in pairs(Airbase.Category) do
    reverse_category[v] = k
end

local airbases = {}

-- TODO: Get this from a correct location
local term_type = {
    [16] = "Runway",
    [40] = "HelicopterOnly",
    [68] = "HardenedAirShelter",
    [72] = "AirplaneOnly",
    [104] = "OpenAirSpawn",
}

for k,v in pairs(world.getAirbases()) do
    local airbase = {
        ID = v:getID(),
        WorldID = v:getWorldID(),
        callsign = v:getCallsign(),
        typeName = v:getTypeName()
    }

    for _k,_v in pairs(v:getDesc()) do
        airbase[_k] = _v
    end

    airbase["category_name"] = reverse_category[airbase.category]

    airbase["runways"] = v:getRunways()
    airbase["parking"] = v:getParking()

    for _k,_v in pairs(airbase.parking) do
        _v.Term_Type_Name = term_type[_v.Term_Type]
    end

    table.insert(airbases, airbase)
end

return airbases