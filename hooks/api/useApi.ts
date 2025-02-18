import { ErrorHandlerFn } from "@/utils/ApiService";
import useAxiosFetcher from "./useAxiosFetcher";
import RestApiService from "@/utils/RestApiService";

const useApi = (errorHandler?: ErrorHandlerFn) => {
  const fetcher = useAxiosFetcher();

  // Using Rest Api handler
  const defaultErrorHandler: ErrorHandlerFn = (error: unknown) => {
    if (!error) return;

    throw error;
  };

  return new RestApiService(fetcher, errorHandler ?? defaultErrorHandler);
};

export default useApi;
