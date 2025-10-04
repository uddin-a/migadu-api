import type { HttpRequestFnMethodsProps, HttpRequestFnProps } from "../Migadu";

export type HeadersProps = {
  "Content-Type"?: "application/json" | string;
  Authorization?: string;
} & HeadersInit;

/**
 * This function help build props for httpRequestFn function. It provide
 * by default some headers so you don't have to put it each time creating
 * your object to past to fetch data.
 *
 * @param url `string` the migadu api end-point
 * @param basicAuthCred `string` A coded auth string for basic authentication
 * @param data `string` | `unknown` | `undefined` Data to pass when doing request
 * @param method `HttpRequestFnMethodsProps` Valide HTTP Request
 * @param headers `HeadersProps` Extra headers you want to pass.
 * @returns `HttpRequestFnProps`
 */
export function httpRequestFnPropsBuilder(
  url: string,
  basicAuthCred: string,
  data?: string | unknown | undefined,
  method: HttpRequestFnMethodsProps = "GET",
  headers?: HeadersProps
): HttpRequestFnProps {
  return {
    url,
    options: {
      method,
      headers: {
        Authorization: `Basic ${basicAuthCred}`,
        "Content-Type":
          data && data !== undefined && data !== null
            ? "application/json"
            : undefined,
        ...headers,
      },
    },
    data,
  };
}
