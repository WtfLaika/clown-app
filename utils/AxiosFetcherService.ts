import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { RestFetcher } from "./Fetcher";

class AxiosFetcherService implements RestFetcher {
  constructor(protected instance: AxiosInstance) {}

  post = <Body, Response>(
    path: string,
    body?: Body,
    config?: AxiosRequestConfig
  ): Promise<Response> =>
    this.instance.post(path, body, config).then(this.handleResponse);

  get = <Response>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<Response> =>
    this.instance.get(path, config).then(this.handleResponse);

  put = <Body, Response>(
    path: string,
    body?: Body,
    config?: AxiosRequestConfig
  ): Promise<Response> =>
    this.instance.put(path, body, config).then(this.handleResponse);

  patch = <Body, Response>(
    path: string,
    body?: Body,
    config?: AxiosRequestConfig
  ): Promise<Response> =>
    this.instance.patch(path, body, config).then(this.handleResponse);

  delete = <Response>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<Response> =>
    this.instance.delete(path, config).then(this.handleResponse);

  /**
   * This method handles response overloaded by Axios
   * Axios returns a response body covered with `body`
   * @param response
   */
  handleResponse = async <Response>(response: AxiosResponse<Response>) =>
    response?.data ?? response;
}

export default AxiosFetcherService;
