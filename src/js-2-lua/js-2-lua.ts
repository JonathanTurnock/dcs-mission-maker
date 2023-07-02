import { isArray, isEmpty, isObject, isString, map, range } from "lodash";

export const js2Lua = (data: any, depth = 0): string => {
  const indentation = range(0, depth + 1)
    .map(() => "")
    .join("\t");

  if (isArray(data)) {
    if (isEmpty(data)) {
      return `\n${indentation}{\n${indentation}}`;
    }
    return `\n${indentation}{\n${data
      .map((it, idx) => `${indentation}\t[${idx + 1}]=${js2Lua(it, depth + 1)}`)
      .join(",\n")}\n${indentation}}`;
  }

  if (isObject(data)) {
    if (isEmpty(data)) {
      return `\n${indentation}{\n${indentation}}`;
    }
    return `\n${indentation}{\n${map(
      data,
      (value, key, object) =>
        `${indentation}\t[${js2Lua(key)}]=${js2Lua(value, depth + 1)}`,
    ).join(",\n")}\n${indentation}}`;
  }

  if (isString(data) && data.match(/^_\d+/)) {
    return data.replace(/^_/, "")
  }

  if (isString(data)) {
    return JSON.stringify(data);
  }

  return `${data}`;
};
