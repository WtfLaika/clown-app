import { isDefined } from "./typeGuards";

export type QueryKeyOption =
  | string
  | number
  | null
  | undefined
  | URLSearchParams;

export const buildQueryKey = (
  ...args: (QueryKeyOption | QueryKeyOption[])[]
): string[] =>
  args
    .flat()
    .filter(isDefined)
    .filter((key) => (typeof key === "string" ? key.length > 0 : true))
    .map((key) => key.toString());
