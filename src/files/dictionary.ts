import { z } from "zod";

export const dictionarySchema = z.record(z.string(), z.string());

export type DictionaryProps = {};
export const dictionary = (props: DictionaryProps) => {
  return dictionarySchema.parse({});
};
