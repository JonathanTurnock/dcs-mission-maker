--[[
This file exports a dict of helicopters from the DCS World mission editor database (me_db).
--]]

-- This table will be used to store the helicopter data.
local helos = {}

-- This loop iterates over the helicopters in the me_db Units.Helicopters.Helicopter table and populates the helos table.
for _, v in pairs(me_db.db.Units.Helicopters.Helicopter) do
    local helo = {
        id = v.Name,
        type = v.type,
        country_of_origin = v.country_of_origin,
        displayName = v.DisplayName,
        tasks = {},
        attribute = v.attribute
    }
    -- This loop iterates over the tasks associated with the helicopter and adds them to the helo table.
    for _, task in pairs(v.Tasks) do
        table.insert(helo.tasks, task.Name)
    end
    -- Finally, the helo table is added to the helos table.
    helos[helo.id] = helo
    -- return v -- Remove Comment to return whole object for inspection
end

-- Finally, the helos table is returned.
return helos
