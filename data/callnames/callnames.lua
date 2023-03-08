--[[
This file exports a dict of callnames and their associated types from the DCS World mission editor database (me_db).
--]]

-- This table will be used to store call names and their associated types.
local callname_lookup = {}

-- This loop iterates over the callnames in the me_db.db.Callnames table and populates the callname_lookup table.
for _, v in pairs(me_db.db.Callnames) do
    for name, cnames in pairs(v) do
        for i, cname in ipairs(cnames) do
            if (callname_lookup[cname.Name]) then
                -- If the callname is already in the table, add the associated type to its list of types.
                table.insert(callname_lookup[cname.Name].types, name)
            else
                -- If the callname is not already in the table, create a new entry for it with the associated type.
                callname_lookup[cname.Name] = { callname = cname.Name, types = { name }, id=cname.WorldID }
            end
        end
    end
end

-- Finally, the callnames table is returned.
return callname_lookup
