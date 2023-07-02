import { z } from "zod";

const xPosSchema = z
  .number()
  .describe("X Vector Position, x is directed to the north");

const zPosSchema = z
  .number()
  .describe("Z Vector Position, z is directed to the east");

const dateSchema = z.object({
  Year: z
    .number()
    .min(1000)
    .max(3000)
    .describe("Mission Year as 4 digit year, i.e. 2016")
    .default(2016),
  Day: z
    .number()
    .min(1)
    .max(31)
    .describe("Mission Day of the Month between 1 and 31")
    .default(21),
  Month: z
    .number()
    .min(1)
    .max(12)
    .describe("Mission Month between 1 and 12")
    .default(6),
});

const startTimeSchema = z
  .number()
  .min(0)
  .max(86400)
  .describe("Mission Start time expressed in seconds since midnight")
  .default(28800);

const windAtSchema = z.object({
  speed: z.number().default(0),
  dir: z.number().default(0),
});

const windSchema = z.object({
  at8000: windAtSchema.default(windAtSchema.parse({})),
  atGround: windAtSchema.default(windAtSchema.parse({})),
  at2000: windAtSchema.default(windAtSchema.parse({})),
});

const visibilitySchema = z
  .object({ distance: z.number().default(80000) })
  .default({});

const haloSchema = z.object({ preset: z.string().default("auto") }).default({});

const fogSchema = z
  .object({
    thickness: z.number().default(0),
    visibility: z.number().default(0),
  })
  .default({});

const seasonSchema = z
  .object({ temperature: z.number().default(20) })
  .default({});

const cloudsSchema = z
  .object({
    thickness: z.number().default(200),
    density: z.number().default(0),
    preset: z.string().default("Preset2"),
    base: z.number().default(2500),
    iprecptns: z.number().default(0),
  })
  .default({});

const weatherSchema = z
  .object({
    atmosphere_type: z.number().default(0),
    wind: windSchema.default({}),
    enable_fog: z.boolean().default(false),
    visibility: visibilitySchema,
    halo: haloSchema,
    fog: fogSchema,
    season: seasonSchema,
    type_weather: z.number().default(0),
    qnh: z.number().default(760),
    cyclones: z.object({}).default({}),
    name: z.string().default("Winter, clean sky"),
    dust_density: z.number().default(0),
    modifiedTime: z.boolean().default(false),
    groundTurbulence: z.number().default(0),
    enable_dust: z.boolean().default(false),
    clouds: cloudsSchema,
  })
  .default({});

const sideResultSchema = z
  .object({
    conditions: z.object({}).default({}),
    actions: z.object({}).default({}),
    func: z.object({}).default({}),
  })
  .default({});

const resultSchema = z
  .object({
    total: z.number().default(0),
    offline: sideResultSchema,
    blue: sideResultSchema,
    red: sideResultSchema,
  })
  .default({});

const groundControlRoleSchema = z
  .object({
    blue: z.number().default(0),
    neutrals: z.number().default(0),
    red: z.number().default(0),
  })
  .default({});

const groundControlSchema = z
  .object({
    isPilotControlVehicles: z.boolean().default(false),
    passwords: z
      .object({
        artillery_commander: z.object({}).default({}),
        instructor: z.object({}).default({}),
        forward_observer: z.object({}).default({}),
        observer: z.object({}).default({}),
      })
      .default({}),
    roles: z
      .object({
        artillery_commander: groundControlRoleSchema,
        instructor: groundControlRoleSchema,
        forward_observer: groundControlRoleSchema,
        observer: groundControlRoleSchema,
      })
      .default({}),
  })
  .default({});

const coalitionsSchema = z
  .object({
    blue: z.array(z.number()).default([]),
    neutrals: z.array(z.number()).default([]),
    red: z.array(z.number()).default([]),
  })
  .default({});

const planeUnitSchema = z.object({
  alt: z.number().describe("Aircraft altitude in meters").default(2000),
  y: zPosSchema,
  x: xPosSchema,
  type: z.string(),
  onboard_num: z.string(),
  alt_type: z.string().default("BARO"),
  psi: z.number().default(0),
  livery_id: z.string().default("default"),
  skill: z.string().default("High"),
  callsign: z.object({
    _1: z.number(),
    _2: z.number(),
    _3: z.number(),
    name: z.string().nonempty(),
  }),
  name: z.string(),
  payload: z.object({
    pylons: z.object({}),
    fuel: z.string(),
    flare: z.number(),
    ammo_type: z.number().optional(),
    chaff: z.number(),
    gun: z.number(),
  }),
  speed: z.number().describe("Aircraft speed in meters per second"),
  heading: z.number().default(0),
  unitId: z.number(),
});

const planeRoutePointSchema = z.object({
  alt: z.number().default(2000),
  type: z.string().default("Turning Point"),
  action: z.string().default("Turning Point"),
  alt_type: z.string().default("BARO"),
  y: zPosSchema,
  x: xPosSchema,
  speed_locked: z.boolean(),
  formation_template: z.string(),
  speed: z.number(),
  ETA_locked: z.boolean(),
  task: z.object({
    id: z.string(),
    params: z.object({ tasks: z.object({}) }),
  }),
  ETA: z.number(),
});

const planeGroupSchema = z.object({
  frequency: z.number().default(124),
  modulation: z.number().default(0),
  groupId: z.number(),
  y: zPosSchema,
  x: xPosSchema,
  tasks: z.object({}).default({}),
  route: z.object({
    points: z.array(planeRoutePointSchema).default([]),
  }),
  hidden: z.boolean().default(false),
  units: z.array(planeUnitSchema).min(1).max(4),
  radioSet: z.boolean().default(false),
  name: z.string(),
  communication: z.boolean().default(true),
  start_time: z.number().default(0),
  task: z.string(),
  uncontrolled: z.boolean().default(false),
});

const coalitionCountrySchema = z.object({
  id: z.number(),
  name: z.string(),
  plane: z.object({
    group: z.array(planeGroupSchema).default([]),
  }),
});

const coalitionSchema = z.object({
  bullseye: z
    .object({ y: z.number().default(0), x: z.number().default(0) })
    .default({}),
  nav_points: z.object({}).default({}),
  name: z.enum(["blue", "neutrals", "red"]),
  country: z.array(coalitionCountrySchema).default([]),
});

export const missionSchema = z.object({
  requiredModules: z.object({}).default({}),
  date: dateSchema.default(dateSchema.parse({})),
  start_time: startTimeSchema,

  sortie: z.string(),

  descriptionText: z.string(),

  pictureFileNameB: z.object({}).default({}),
  descriptionBlueTask: z.string(),

  pictureFileNameN: z.object({}).default({}),
  descriptionNeutralsTask: z.string(),

  pictureFileNameR: z.object({}).default({}),
  descriptionRedTask: z.string(),

  theatre: z.string().describe("Theatre Name").default("Caucasus"),
  failures: z.object({}).default({}),
  currentKey: z.number().default(1),
  maxDictId: z.number(),

  weather: weatherSchema,
  result: resultSchema,
  groundControl: groundControlSchema,
  map: z
    .object({
      centerY: z.number().default(618000),
      zoom: z.number().default(1000000),
      centerX: z.number().default(-355000),
    })
    .default({}),
  coalitions: coalitionsSchema,
  triggers: z.object({ zones: z.object({}).default({}) }).default({}),
  version: z.number().default(1),
  goals: z.object({}).default({}),
  coalition: z
    .object({
      blue: coalitionSchema.default({ name: "blue" }),
      neutrals: coalitionSchema.default({ name: "neutrals" }),
      red: coalitionSchema.default({ name: "red" }),
    })
    .default({
      blue: { name: "blue" },
      red: { name: "red" },
      neutrals: { name: "neutrals" },
    }),
  trigrules: z.object({}).default({}),
  forcedOptions: z.object({}).default({}),
  trig: z
    .object({
      custom: z.object({}).default({}),
      customStartup: z.object({}).default({}),
      events: z.object({}).default({}),
      func: z.object({}).default({}),
      flag: z.object({}).default({}),
      conditions: z.object({}).default({}),
      actions: z.object({}).default({}),
      funcStartup: z.object({}).default({}),
    })
    .default({}),
});

export type MissionProps = z.input<typeof missionSchema>;
export const mission = (props: MissionProps) => missionSchema.parse(props);

export type PlaneProps = z.input<typeof planeUnitSchema>;
export const plane = (props: PlaneProps) => planeUnitSchema.parse(props);

export type PlaneGroupProps = z.input<typeof planeGroupSchema>;
export const planeGroup = (props: PlaneGroupProps) =>
  planeGroupSchema.parse(props);
