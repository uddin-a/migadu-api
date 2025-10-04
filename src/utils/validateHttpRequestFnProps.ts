import { MigaduHttpRequestFnParamError } from "../migaduErrors";
import { HttpRequestFnProps } from "../Migadu";

export function validateHttpRequestFnProps(props: HttpRequestFnProps): void {
  const { url, options, data } = props;
  if (!url || url.trim().length === 0) {
    throw new MigaduHttpRequestFnParamError("no url provided");
  } else if (
    !options ||
    typeof options !== "object" ||
    (typeof options === "object" && Array.isArray(options)) ||
    Object.keys(options).length < 1
  ) {
    throw new MigaduHttpRequestFnParamError('Invalid "option"');
  } else if (!options.headers) {
    throw new MigaduHttpRequestFnParamError("Header not provided");
  } else if (typeof options.headers !== "object") {
    throw new MigaduHttpRequestFnParamError("Invalide header type");
  } else if (
    !options.headers["Authorization"] ||
    options.headers["Authorization"].length === 0
  ) {
    throw new MigaduHttpRequestFnParamError("Invalide header type");
  } else if (
    (options.method === "POST" || options.method === "PUT") &&
    (!data || data === null)
  ) {
    throw new MigaduHttpRequestFnParamError(
      `no "data" was provided for method ${options.method}`
    );
  }
}
