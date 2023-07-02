import { DcsMission } from "./dcs-mission";
import { plane, planeGroup } from "./files/mission";

describe("given a simple empty mission", () => {
  it("should build a mission file", () => {
    const dcsMission = new DcsMission({
      theatre: "Caucasus",
      descriptionNeutralsTask: "",
      descriptionRedTask: "",
      descriptionBlueTask: "",
      sortie: "",
      descriptionText: "",
    });
    expect(dcsMission.getFiles()).toMatchSnapshot();
  });
});

describe("given a simple mission with 1 plane group", () => {
  it("should build a mission file", () => {
    const dcsMission = new DcsMission({
      theatre: "Caucasus",
      descriptionNeutralsTask: "",
      descriptionRedTask: "",
      descriptionBlueTask: "",
      sortie: "",
      descriptionText: "",
      coalitions: { blue: [80] },
      coalition: {
        blue: {
          name: "blue",
          country: [
            {
              id: 80,
              name: "CJTF Blue",
              plane: {
                group: [
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
                        callsign: { _1: 1, _2: 1, _3: 1, name: "Enfield11" },
                        y: 635588.6,
                        x: -292598.45714286,
                        name: "Aerial-1-1",
                        payload: {
                          pylons: {},
                          fuel: "5029",
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
                ],
              },
            },
          ],
        },
      },
    });
    expect(dcsMission.getFiles()).toMatchSnapshot();
  });
});
