import { z } from "zod";

export const mapResourceSchema = z.object({});

export type MapResourceProps = {};
export const mapResource = (props: MapResourceProps) => {
  return mapResourceSchema.parse({});
};
