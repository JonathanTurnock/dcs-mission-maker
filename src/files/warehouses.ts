import { z } from "zod";

const airportFuelSchema = z.object({
  InitFuel: z.number().default(100),
});
const operatingLevelSchema = z.number().default(10);

const airportSchema = z.object({
  gasoline: airportFuelSchema,
  methanol_mixture: airportFuelSchema,
  diesel: airportFuelSchema,
  unlimitedMunitions: z.boolean().default(true),
  OperatingLevel_Air: operatingLevelSchema,
  speed: z.number().default(16.666666),
  size: z.number().default(100),
  periodicity: z.number().default(30),
  suppliers: z.object({}),
  coalition: z.string().default("NEUTRAL"),
  unlimitedAircrafts: z.boolean().default(true),
  OperatingLevel_Eqp: z.number().default(10),
  unlimitedFuel: z.boolean().default(true),
  aircrafts: z.object({}),
  weapons: z.object({}),
  OperatingLevel_Fuel: operatingLevelSchema,
  jet_fuel: airportFuelSchema,
});

const warehousesSchema = z.object({
  airports: z.record(z.number(), airportSchema).default({}),
  warehouses: z.record(z.number(), z.object({})).default({}),
});

export type WarehousesProps = {};
export const warehouses = (props: WarehousesProps) => {
  return warehousesSchema.parse({});
};
