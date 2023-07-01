import { js2Lua } from "./js-2-lua";

describe("js2Lua", () => {
  it("should convert objects to key with square brackets", () => {
    expect(js2Lua({ x: -291014, y: 617414 })).toMatchSnapshot();
    expect(
      js2Lua({
        id: 21,
        name: "Australia",
        luaScript:
          '-- This is a script you can put in a mission\n\n-- Limits that encompass the entire green area in the mission editor\nlocal minY = -600000\nlocal maxY = 1200000\nlocal minX = -700000\nlocal maxX = 400000\n-- Data is sampled every 50km\nlocal step = 50000\n\nfor xCoord = minX, maxX, step do\n local row = {}\n local rowString = "{"\n for yCoord = minY, maxY, step do\n local convLat, convLon = coord.LOtoLL({x = xCoord, y = 0, z = yCoord})\n local lookupPoint = {{yCoord, xCoord}, {convLat, convLon}}\n rowString = rowString .. string.format("{{%f,%f},{%f,%f}},", yCoord, xCoord, convLat, convLon)\n end\n rowString = rowString .. "},\\n"\n env.info(rowString)\nend',
      }),
    ).toMatchSnapshot();
  });

  it("should convert array to indexed keys with square brackets", () => {
    expect(
      js2Lua([
        { id: 21, name: "Australia" },
        { id: 15, name: "Israel" },
      ]),
    ).toMatchSnapshot();
  });

  /**
   * Exists to mitigate a lodash bug where the object is undefined if it has a length property
   * @see https://github.com/lodash/lodash/issues/5604
   */
  it("should convert objects with length property", () => {
    expect(js2Lua({ x: -291014, y: 617414, length: 0 })).toMatchSnapshot();
  });
});
