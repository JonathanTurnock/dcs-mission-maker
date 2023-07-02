import { plane } from "../src";

describe("when generating a plane", () => {
  it("should throw error if prop without default value is missing", () => {
    expect(() =>
      // @ts-ignore
      plane({
        onboard_num: "010",
        callsign: { _1: 1, _2: 1, _3: 1, name: "Enfield11" },
        y: 635588.6,
        x: -292598.45714286,
        name: "Aerial-1-1",
        payload: {
          pylons: {},
          fuel: 5029,
          flare: 120,
          ammo_type: 1,
          chaff: 240,
          gun: 100,
        },
        speed: 123.33333333333,
        AddPropAircraft: {},
        unitId: 1,
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      "[
        {
          "code": "invalid_type",
          "expected": "string",
          "received": "undefined",
          "path": [
            "type"
          ],
          "message": "Required"
        }
      ]"
    `);
  });

  it("should populate default props", () => {
    expect(
      plane({
        type: "A-10A",
        onboard_num: "010",
        callsign: { _1: 1, _2: 1, _3: 1, name: "Enfield11" },
        y: 635588.6,
        x: -292598.45714286,
        name: "Aerial-1-1",
        payload: {
          pylons: {},
          fuel: 5029,
          flare: 120,
          ammo_type: 1,
          chaff: 240,
          gun: 100,
        },
        speed: 123.33333333333,
        AddPropAircraft: {},
        unitId: 1,
      }),
    ).toEqual({
      alt: 2000,
      type: "A-10A",
      onboard_num: "010",
      alt_type: "BARO",
      psi: 0,
      livery_id: "default",
      skill: "High",
      callsign: { _1: 1, _2: 1, _3: 1, name: "Enfield11" },
      y: 635588.6,
      x: -292598.45714286,
      name: "Aerial-1-1",
      payload: {
        pylons: {},
        fuel: 5029,
        flare: 120,
        ammo_type: 1,
        chaff: 240,
        gun: 100,
      },
      speed: 123.33333333333,
      heading: 0,
      AddPropAircraft: {},
      unitId: 1,
    });
  });
});
