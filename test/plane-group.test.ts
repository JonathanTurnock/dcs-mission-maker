import { plane, planeGroup } from "../src/files/mission";

describe("when generating a plane group", () => {
  it("should throw error if prop without default value is missing", () => {
    expect(() =>
      planeGroup({
        task: "CAS",
        groupId: 1,
        name: "Aerial-1",
        x: -297153.83834764,
        y: 632449.86255341,
        route: {
          points: [],
        },
        units: [],
      }),
    ).toThrowErrorMatchingInlineSnapshot(`
      "[
        {
          "code": "too_small",
          "minimum": 1,
          "type": "array",
          "inclusive": true,
          "exact": false,
          "message": "Array must contain at least 1 element(s)",
          "path": [
            "units"
          ]
        }
      ]"
    `);
  });

  it("should populate default props", () => {
    expect(
      planeGroup({
        task: "CAS",
        groupId: 1,
        name: "Aerial-1",
        x: -297153.83834764,
        y: 632449.86255341,
        route: {
          points: [
            {
              alt: 2000,
              type: "Turning Point",
              action: "Turning Point",
              alt_type: "BARO",
              y: 632449.86255341,
              x: -297153.83834764,
              speed_locked: true,
              formation_template: "",
              speed: 154.16666666667,
              ETA_locked: true,
              task: {
                id: "ComboTask",
                params: {
                  tasks: {},
                },
              },
              ETA: 0,
            },
          ],
        },
        units: [
          plane({
            type: "A-10A",
            onboard_num: "010",
            callsign: [1, 1, 1],
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
        ],
      }),
    ).toEqual({
      frequency: 124,
      modulation: 0,
      groupId: 1,
      tasks: {},
      route: {
        points: [
          {
            alt: 2000,
            type: "Turning Point",
            action: "Turning Point",
            alt_type: "BARO",
            y: 632449.86255341,
            x: -297153.83834764,
            speed_locked: true,
            formation_template: "",
            speed: 154.16666666667,
            ETA_locked: true,
            task: {
              id: "ComboTask",
              params: {
                tasks: {},
              },
            },
            ETA: 0,
          },
        ],
      },
      hidden: false,
      units: [
        {
          alt: 2000,
          type: "A-10A",
          onboard_num: "010",
          alt_type: "BARO",
          psi: 0,
          livery_id: "default",
          skill: "High",
          callsign: [1, 1, 1],
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
        },
      ],
      y: 632449.86255341,
      radioSet: false,
      name: "Aerial-1",
      communication: true,
      x: -297153.83834764,
      start_time: 0,
      task: "CAS",
      uncontrolled: false,
    });
  });
});
