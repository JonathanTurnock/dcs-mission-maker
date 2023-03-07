import { z } from "zod";

export const mapResourceSchema = z.object({});

export type MapResourceProps = z.input<typeof mapResourceSchema>;
export const mapResource = (props: MapResourceProps) =>
  mapResourceSchema.parse(props);
