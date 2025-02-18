import { useState } from "react";
import { axiosInstance } from "@/utils/axios";
import AxiosFetcherService from "@/utils/AxiosFetcherService";

let currentNumberOfRetryAttempts = 0;
const numberOfRetryAttempts = 1;

const useAxiosFetcher = () => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (request) => {
      const { config } = request;
      if (
        !config?._retry &&
        currentNumberOfRetryAttempts < numberOfRetryAttempts &&
        request.response?.status === 401
      ) {
        config._retry = true;
        currentNumberOfRetryAttempts += 1;

        return axiosInstance.request(request.config);
      }

      return Promise.reject(request);
    }
  );

  const [fetcherService] = useState(
    () => new AxiosFetcherService(axiosInstance)
  );

  return fetcherService;
};

export default useAxiosFetcher;
