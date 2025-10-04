export class MigaduHttpRequestFnParamError extends Error {
  constructor(msg: string) {
    super("Parameter error : " + msg);
  }
}

export class MigaduRequestException extends Error {
  readonly path: string;
  readonly method: string;
  readonly data: unknown | undefined;
  constructor(
    err: Error,
    path: string,
    method: string = "GET",
    data: unknown | undefined
  ) {
    super(`Error occured while making http request`, { cause: err });
    this.path = path;
    this.method = method;
    this.data = data;
  }
}

export class MigaduRequestError extends Error {
  readonly path: string;
  readonly method: string;
  readonly data: unknown | undefined;
  constructor(
    msg: string,
    path: string,
    method: string = "GET",
    data: unknown | undefined
  ) {
    super(`Undefined migadu request error : ` + msg);
    this.path = path;
    this.method = method;
    this.data = data;
  }
}

export class MigaduRequestErrorInvalideAPI extends Error {
  readonly path: string;
  readonly method: string;
  readonly data: unknown | undefined;
  constructor(
    msg: string,
    path: string,
    method: string = "GET",
    data: unknown | undefined
  ) {
    super(`Undefined migadu request error : ` + msg);
    this.path = path;
    this.method = method;
    this.data = data;
  }
}

export class MigaduRequestError500 extends Error {
  readonly path: string;
  readonly method: string;
  readonly data: unknown | undefined;
  constructor(
    msg: string,
    path: string,
    method: string = "GET",
    data: unknown | undefined
  ) {
    super(msg);
    this.path = path;
    this.method = method;
    this.data = data;
  }
}

export class MigaduRequestError400 extends Error {
  readonly path: string;
  readonly method: string;
  readonly data: unknown | undefined;
  constructor(path: string, method: string = "GET", data: unknown | undefined) {
    super(`The path [${path}] does not exists (error 400).`);
    this.path = path;
    this.method = method;
    this.data = data;
  }
}
