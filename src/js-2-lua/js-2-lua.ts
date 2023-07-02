import { forOwn, isArray, isEmpty, isObject, isString, range } from "lodash";

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
    let str: string[] = [];
    // Don't use loadsh map as some objects can have "length: 0"
    forOwn(data, (value, key) =>
      str.push(`${indentation}\t[${js2Lua(key)}]=${js2Lua(value, depth + 1)}`),
    );
    return `\n${indentation}{\n${str.join(",\n")}\n${indentation}}`;
  }

  if (typeof data === "number") {
    return data.toString();
  }

  if (isString(data) && data.match(/^_\d+/)) {
    return data.replace(/^_/, "")
  }

  if (isString(data)) {
    return JSON.stringify(data);
  }

  return `${data}`;
};
