import { AxiosError, AxiosResponse } from 'axios'
import { useState } from 'react'

export type QueryFn<Data> = (...arg: any[]) => Promise<Data | undefined>

export interface RequestError<T = any, D = any> {
  response?: AxiosResponse<T, D>
  [key: string]: any
}
export type ServerError =
  | null
  | (Error & RequestError)
  | ({ [key: string]: string | string[] } & RequestError)
  | (AxiosError & RequestError)
interface HttpState<Data> {
  data: Data | undefined
  error: ServerError | undefined
  isError: boolean
  isLoading: boolean
}
export type Execute<Data> = (...args: any[]) => Promise<Data | void>
export interface HttpQuery<Data> extends HttpState<Data> {
  execute: Execute<Data>
}

const useHttpQuery = <Data = object>(
  queryFn: QueryFn<Data>,
): HttpQuery<Data> => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const [error, setError] = useState<ServerError>()
  const [data, setData] = useState<Data>()

  const execute: Execute<Data> = async (...args) => {
    setIsLoading(true)
    setIsError(false)
    setError(undefined)

    return queryFn(...args)
      .then((response) => {
        setData(response)
        return response
      })
      .catch((error) => {
        setError(error)
        setIsError(true)
      })
      .finally(() => setIsLoading(false))
  }

  return {
    data,
    error,
    isError,
    isLoading,
    execute,
  } as const
}

export default useHttpQuery
