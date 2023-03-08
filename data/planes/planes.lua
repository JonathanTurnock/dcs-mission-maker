--[[
This file exports an dict of planes from the DCS World mission editor database (me_db).
--]]

-- This table will be used to store the plane data.
local planes = {}

-- This loop iterates over the planes in the me_db Units.Planes.Plane table and populates the planes table.
for _, v in pairs(me_db.db.Units.Planes.Plane) do
    local plane = {
        id = v.Name,
        type = v.type,
        country_of_origin = v.country_of_origin,
        displayName = v.DisplayName,
        tasks = {},
        attribute = v.attribute
    }
    -- This loop iterates over the tasks associated with the plane and adds them to the plane table.
    for _, task in pairs(v.Tasks) do
        table.insert(plane.tasks, task.Name)
    end
    -- Finally, the plane table is added to the planes table.
    planes[plane.id] = plane
    -- return v -- Remove Comment to return whole object for inspection
end

-- Finally, the planes table is returned.
return planes
