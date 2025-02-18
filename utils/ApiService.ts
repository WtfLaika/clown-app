import { ServerError } from "@/hooks/api/useHttpQuery";
import { AxiosError } from "axios";

export type ApiServiceError<Error> = AxiosError<Error>;

export interface FulfilledResponse<DTO extends unknown> {
  data: DTO;
}

export type ErrorHandlerFn = (
  reason: ServerError
) => ApiServiceError<typeof reason> | void;

class ApiService {
  /**
   * First of all, we have to ensure that response from API is valid
   * and consist `data` attribute
   * @param response
   */
  validateResponse = <Response extends unknown>(
    response: unknown
  ): Response => {
    if (!response || (response instanceof Object && !("data" in response))) {
      return response as Response;
    }

    return (response as FulfilledResponse<Response>).data;
  };
}

export default ApiService;
