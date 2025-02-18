import { QueryKeyOption, buildQueryKey } from "@/utils/buildQueryKey";
import useClient from "./useClient";
import { InvalidateQueryFilters } from "@tanstack/react-query";

/**
 * This hook contains a decoration methods to work with HTTP Query Caching
 * Use it to invalidate or replace existing cache
 */
const useCache = () => {
  const queryClient = useClient();

  const setData = (key: QueryKeyOption[], data: unknown) =>
    queryClient.setQueryData(buildQueryKey(key), data);

  const invalidate = (
    key: QueryKeyOption[],
    exact?: boolean,
    refetchType?: InvalidateQueryFilters["refetchType"]
  ) =>
    queryClient.invalidateQueries({
      queryKey: buildQueryKey(key),
      exact,
      refetchType,
    });

  return { setData, invalidate };
};

export default useCache;
