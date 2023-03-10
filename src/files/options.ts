import { z } from "zod";

export const optionsSchema = z.object({
  playerName: z.string().default("New callsign"),
  miscellaneous: z.object({}).default({}),
  difficulty: z.object({}).default({}),
  VR: z.object({}).default({}),
  graphics: z.object({}).default({}),
  plugins: z.object({}).default({}),
  format: z.number().default(1),
  sound: z.object({}).default({}),
  views: z.object({}).default({}),
});

export type OptionsProps = z.input<typeof optionsSchema>;
export const options = (props: OptionsProps) => optionsSchema.parse(props);
