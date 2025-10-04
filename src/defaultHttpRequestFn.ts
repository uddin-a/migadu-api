import {
  MigaduRequestError,
  MigaduRequestError400,
  MigaduRequestError500,
  MigaduRequestException,
} from "./migaduErrors";
import { HttpRequestFnProps } from "./Migadu";
import { Migadu500Error } from "./types/types";
import { validateHttpRequestFnProps } from "./utils/validateHttpRequestFnProps";



/**
 * This is the default function used for making the HTTP communications. Under
 * the this uses simple `fetch` requests.
 * 
 * This function makes sure the parameters are correct by calling the function
 * `validateHttpRequestFnProps`. On success it returns the expected result else
 * it will throw error.
 * 
 * ```typescript
 * interface HttpRequestFnProps {
 *   url: string;
 *   options: HttpRequestFnOptionsProps;
 *   data?: BodyInit | string | unknown | undefined;
 * }
 * 
 * type HttpRequestFnMethodsProps = "GET" | "POST" | "PUT" | "DELETE";
 *  
 * interface HttpRequestFnOptionsProps {
 *   method: HttpRequestFnMethodsProps;
 *   headers?:
 *     | {
 *         "Content-Type"?: "application/json" | string;
 *         Authorization?: string;
 *         [key: string]: string | undefined;
 *       }
 *     | HeadersInit;
 * }
 * 
 * ```
 * 
 * @param props HttpRequestFnProps
 * @param props.url string
 * @param props.options HttpRequestFnOptionsProps
 * @param props.data BodyInt | string | unknown | undefined
 * @returns 
 */
export default async function defaultHttpRequestFn<ReturnType>(
  props: HttpRequestFnProps
): Promise<ReturnType> {
  const { url, options, data } = props;
  validateHttpRequestFnProps(props);

  try {
    const ret = await fetch(url, {
      method: options.method,
      headers: { ...options.headers } as HeadersInit,
      body: JSON.stringify(data),
    });

    switch (ret.status) {
      case 200:
        return (await ret.json()) as ReturnType;
        /**
         * TODO: In the future we should first check if the response itself
         * is json or not. If it is json, send json, otherwise send a text,
         * because some 500 status sends a text response.
         */
      case 500:
        const errMsg = (await ret.json()) as Migadu500Error;
        throw new MigaduRequestError500(
          errMsg.error,
          url,
          options.method,
          data
        );
      case 400:
        throw new MigaduRequestError400(url, options.method, data);
      default:
        throw new MigaduRequestError(
          String(await ret.text()),
          url,
          options.method,
          data
        );
    }
  } catch (e: unknown) {
    throw new MigaduRequestException(e as Error, url, options.method, data);
  }
}
