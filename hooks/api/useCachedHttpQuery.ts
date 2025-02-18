import { buildQueryKey, QueryKeyOption } from "@/utils/buildQueryKey";
import { defaultQueryOptions } from "@/utils/client";
import {
  QueryClient,
  QueryFunctionContext,
  QueryObserverBaseResult,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export interface CachedHttpQueryResponse<Data, TError = unknown> {
  data: Data | undefined;
  error: TError | null;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
  refetch: QueryObserverBaseResult<Data, TError>["refetch"];
  setQueryData: QueryClient["setQueryData"];
  refetchQueries: QueryClient["refetchQueries"];
}

type UseCachedHttpQueryOptionsType<Data, TError> = Omit<
  UseQueryOptions<Data, TError, Data, string[]>,
  "queryKey" | "queryFn"
>;

export interface UseCachedHttpQuery {
  <Data = object, TError = unknown>(
    key: QueryKeyOption[],
    queryFn: (context: unknown) => Promise<Data | undefined>
  ): CachedHttpQueryResponse<Data, TError>;
  // Overloading with ReactQuery config
  <Data = object, TError = unknown>(
    key: QueryKeyOption[],
    queryFn: (context: unknown) => Promise<Data | undefined>,
    options?: UseCachedHttpQueryOptionsType<Data, TError>
  ): CachedHttpQueryResponse<Data, TError>;
}

const useCachedHttpQuery: UseCachedHttpQuery = <
  Data = object,
  TError = unknown
>(
  key: QueryKeyOption[],
  queryFn: (context: QueryFunctionContext) => Promise<Data> | Data,
  options: UseCachedHttpQueryOptionsType<Data, TError> = {}
): CachedHttpQueryResponse<Data, TError> => {
  const queryClient = useQueryClient();

  // Using React Query as query handler
  const { data, error, isError, isLoading, isFetching, refetch } = useQuery(
    {
      ...defaultQueryOptions,
      ...options,
      queryKey: buildQueryKey(key),
      queryFn,
    },
    queryClient
  );

  return {
    data,
    error,
    isError,
    isLoading,
    isFetching,
    refetch,
    setQueryData: queryClient.setQueryData,
    refetchQueries: queryClient.refetchQueries,
  } as const;
};

export default useCachedHttpQuery;
