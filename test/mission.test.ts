import { mission } from "../src/files/mission";

describe("when generating a mission", () => {
  it("should throw error if prop without default value is missing", () => {
    expect(() =>
      // @ts-ignore
      mission({
        descriptionText: "DictKey_descriptionText_1",
        sortie: "DictKey_sortie_5",
        descriptionBlueTask: "DictKey_descriptionBlueTask_3",
        descriptionNeutralsTask: "DictKey_descriptionNeutralsTask_4",
        descriptionRedTask: "DictKey_descriptionRedTask_2",
      })
    ).toThrowErrorMatchingInlineSnapshot(`
      "[
        {
          "code": "invalid_type",
          "expected": "number",
          "received": "undefined",
          "path": [
            "maxDictId"
          ],
          "message": "Required"
        }
      ]"
    `);
  });

  it("should populate default props", () => {
    expect(
      mission({
        maxDictId: 5,
        descriptionText: "DictKey_descriptionText_1",
        sortie: "DictKey_sortie_5",
        descriptionBlueTask: "DictKey_descriptionBlueTask_3",
        descriptionNeutralsTask: "DictKey_descriptionNeutralsTask_4",
        descriptionRedTask: "DictKey_descriptionRedTask_2",
      })
    ).toEqual({
      requiredModules: {},
      date: {
        Year: 2016,
        Day: 21,
        Month: 6,
      },
      maxDictId: 5,
      start_time: 28800,
      pictureFileNameN: {},
      theatre: "Caucasus",
      failures: {},
      currentKey: 1,
      weather: {
        atmosphere_type: 0,
        wind: {
          at8000: {
            speed: 0,
            dir: 0,
          },
          atGround: {
            speed: 0,
            dir: 0,
          },
          at2000: {
            speed: 0,
            dir: 0,
          },
        },
        enable_fog: false,
        visibility: {
          distance: 80000,
        },
        halo: {
          preset: "auto",
        },
        fog: {
          thickness: 0,
          visibility: 0,
        },
        season: {
          temperature: 20,
        },
        type_weather: 0,
        qnh: 760,
        cyclones: {},
        name: "Winter, clean sky",
        dust_density: 0,
        modifiedTime: false,
        groundTurbulence: 0,
        enable_dust: false,
        clouds: {
          thickness: 200,
          density: 0,
          preset: "Preset2",
          base: 2500,
          iprecptns: 0,
        },
      },
      result: {
        total: 0,
        offline: {
          conditions: {},
          actions: {},
          func: {},
        },
        blue: {
          conditions: {},
          actions: {},
          func: {},
        },
        red: {
          conditions: {},
          actions: {},
          func: {},
        },
      },
      groundControl: {
        passwords: {
          artillery_commander: {},
          instructor: {},
          forward_observer: {},
          observer: {},
        },
        isPilotControlVehicles: false,
        roles: {
          artillery_commander: {
            blue: 0,
            neutrals: 0,
            red: 0,
          },
          instructor: {
            blue: 0,
            neutrals: 0,
            red: 0,
          },
          forward_observer: {
            blue: 0,
            neutrals: 0,
            red: 0,
          },
          observer: {
            blue: 0,
            neutrals: 0,
            red: 0,
          },
        },
      },
      map: {
        centerY: 618000,
        zoom: 1000000,
        centerX: -355000,
      },
      coalitions: {
        blue: [],
        neutrals: [],
        red: [],
      },
      descriptionText: "DictKey_descriptionText_1",
      pictureFileNameR: {},
      triggers: {
        zones: {},
      },
      version: 1,
      goals: {},
      coalition: {
        blue: {
          bullseye: {
            y: 0,
            x: 0,
          },
          nav_points: {},
          name: "blue",
          country: [],
        },
        neutrals: {
          bullseye: {
            y: 0,
            x: 0,
          },
          nav_points: {},
          name: "neutrals",
          country: [],
        },
        red: {
          bullseye: {
            y: 0,
            x: 0,
          },
          nav_points: {},
          name: "red",
          country: [],
        },
      },
      pictureFileNameB: {},
      sortie: "DictKey_sortie_5",
      descriptionBlueTask: "DictKey_descriptionBlueTask_3",
      descriptionNeutralsTask: "DictKey_descriptionNeutralsTask_4",
      descriptionRedTask: "DictKey_descriptionRedTask_2",
      trigrules: {},
      forcedOptions: {},
      trig: {
        custom: {},
        customStartup: {},
        events: {},
        func: {},
        flag: {},
        conditions: {},
        actions: {},
        funcStartup: {},
      },
    });
  });
});
