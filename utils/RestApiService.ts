import { AxiosRequestConfig } from "axios";
import { RestFetcher } from "./Fetcher";
import ApiService, { ErrorHandlerFn } from "./ApiService";

class RestApiService extends ApiService {
  constructor(
    protected fetcher: RestFetcher,
    protected errorHandler?: ErrorHandlerFn
  ) {
    super();
  }

  getFetcher = () => this.fetcher;

  get = <Response = unknown>(path: string, config?: AxiosRequestConfig) =>
    this.fetcher
      .get(path, config)
      .catch(this.errorHandler)
      .then((response) => this.validateResponse<Response>(response));

  post = <Body = unknown, Response = unknown>(
    path: string,
    body?: Body,
    config?: AxiosRequestConfig
  ) =>
    this.fetcher
      .post(path, body, config)
      .catch(this.errorHandler)
      .then((response) => this.validateResponse<Response>(response));

  put = <Body = unknown, Response = unknown>(
    path: string,
    body?: Body,
    config?: AxiosRequestConfig
  ) =>
    this.fetcher
      .put(path, body, config)
      .catch(this.errorHandler)
      .then((response) => this.validateResponse<Response>(response));

  patch = <Body = unknown, Response = unknown>(
    path: string,
    body?: Body,
    config?: AxiosRequestConfig
  ) =>
    this.fetcher
      .patch(path, body, config)
      .catch(this.errorHandler)
      .then((response) => this.validateResponse<Response>(response));

  delete = <Response = unknown>(path: string, config?: AxiosRequestConfig) =>
    this.fetcher
      .delete(path, config)
      .catch(this.errorHandler)
      .then((response) => this.validateResponse<Response>(response));
}

export default RestApiService;
