import { QueryClient } from "@tanstack/react-query";

export const defaultQueryOptions = {
  refetchOnWindowFocus: false,
  retry: 2,
  staleTime: Infinity,
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...defaultQueryOptions,
    },
  },
});
