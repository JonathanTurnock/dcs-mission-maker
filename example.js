const fs = require("fs");
const { DcsMission, planeGroup, plane } = require("./dist");

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
                    type: "F-16A",
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
            ],
          },
        },
      ],
    },
  },
});

dcsMission
  .build()
  .then((file) => fs.writeFileSync("example.miz", Buffer.from(file)));
