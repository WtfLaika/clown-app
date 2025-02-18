import { AxiosRequestConfig } from "axios";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseFetcher {}

export interface RestFetcher extends BaseFetcher {
  post<Body, Response>(
    path: string,
    body?: Body,
    config?: AxiosRequestConfig
  ): Promise<Response>;
  get<Response>(path: string, config?: AxiosRequestConfig): Promise<Response>;
  put<Body, Response>(
    path: string,
    body?: Body,
    config?: AxiosRequestConfig
  ): Promise<Response>;
  patch<Body, Response>(
    path: string,
    body?: Body,
    config?: AxiosRequestConfig
  ): Promise<Response>;
  delete<Response>(
    path: string,
    config?: AxiosRequestConfig
  ): Promise<Response>;
}
