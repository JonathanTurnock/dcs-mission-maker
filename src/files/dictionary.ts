import { z } from "zod";

export const dictionarySchema = z.record(z.string(), z.string());

export type DictionaryProps = z.input<typeof dictionarySchema>;
export const dictionary = (props: DictionaryProps) =>
  dictionarySchema.parse(props);
