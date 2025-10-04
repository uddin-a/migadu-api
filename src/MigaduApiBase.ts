import { httpRequestFnPropsBuilder } from "./utils/httpRequestFnPropsBuilder";
import Migadu from "./Migadu";
import { MigaduApiV1UrlBuilder } from "./utils/MigaduApiV1UrlBuilder";
import { MigaduApiType } from "./types/migaduApiBaseTypes";



export abstract class MigaduApiBase<T extends MigaduApiType, MethodProps> {
  private readonly migadu: Migadu;
  private readonly endpoint: MigaduApiV1UrlBuilder;
  protected abstract readonly apiType: T["apiType"];

  constructor(migadu: Migadu, ep: MigaduApiV1UrlBuilder) {
    this.migadu = migadu;
    this.endpoint = ep;
  }

  private setEndpoint(
    epName: T["apiType"],
    epVal?: string,
    domainName?: string
  ) {
    if (domainName) {
      this.endpoint.domain(domainName);
    }
    switch (epName) {
      case "mailboxes":
        this.endpoint.mailboxes(epVal, false);
        break;
      case "identities":
        this.endpoint.identities(epVal, false);
        break;
      case "forwardings":
        this.endpoint.forwardings(epVal, false);
        break;
      case "aliases":
        this.endpoint.aliases(epVal, false);
        break;
      case "rewrites":
        this.endpoint.rewrites(epVal, false);
        break;
      default:
        throw new Error(`Invalide end-point name [${epName}]`);
    }
  }

  private handleMethodProps(props: MethodProps) {
    for (const key in props) {
      this.setEndpoint(
        key as T["apiType"],
        props[key] as string | undefined
      );
    }
  }

  public async get(
    name: string,
    extraPathData: MethodProps
  ): Promise<T["GetReturnType"]> {
    this.handleMethodProps(extraPathData);
    this.setEndpoint(this.apiType, name, this.migadu.domainName);
    return await this.migadu.httpRequestFn<T["GetReturnType"]>(
      httpRequestFnPropsBuilder(
        this.endpoint.build(this.apiType, false),
        this.migadu.basicAuthCred
      )
    );
  }

  public async getAll(
    extraPathData: MethodProps
  ): Promise<T["GetAllReturnType"]> {
    this.handleMethodProps(extraPathData);
    this.setEndpoint(this.apiType, undefined, this.migadu.domainName);

    const props = httpRequestFnPropsBuilder(
      this.endpoint.build(this.apiType, true),
      this.migadu.basicAuthCred
    );

    const data = await this.migadu.httpRequestFn<T["GetAllReturnType"]>(props);

    if (
      data &&
      typeof data === "object" &&
      !Array.isArray(data) &&
      Object.keys(data).length === 1 &&
      this.apiType in data &&
      Array.isArray(data[this.apiType])
    ) {
      for (const [_, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          return value;
        } else {
          /**
           * If we reach this part that means the data recieved is is invalide
           */
          return [];
        }
      }
    }
    return [];
  }
  public async create(
    data: T["CreateRequestDataType"],
    extraPathData: MethodProps
  ): Promise<T["CreateReturnType"]> {
    this.handleMethodProps(extraPathData);
    this.setEndpoint(this.apiType, undefined, this.migadu.domainName);

    return await this.migadu.httpRequestFn<T["CreateReturnType"]>(
      httpRequestFnPropsBuilder(
        this.endpoint.build(this.apiType, true),
        this.migadu.basicAuthCred,
        data,
        "POST"
      )
    );
  }
  public async update(
    name: string,
    data: T["UpdateRequestDataType"],
    extraPathData: MethodProps
  ): Promise<T["UpdateReturnType"]> {
    this.handleMethodProps(extraPathData);
    this.setEndpoint(this.apiType, name, this.migadu.domainName);

    return await this.migadu.httpRequestFn<T["UpdateReturnType"]>(
      httpRequestFnPropsBuilder(
        this.endpoint.build(this.apiType, false),
        this.migadu.basicAuthCred,
        data,
        "PUT"
      )
    );
  }
  public async delete(
    name: string,
    extraPathData: MethodProps
  ): Promise<T["DeleteReturnType"]> {
    this.handleMethodProps(extraPathData);
    this.setEndpoint(this.apiType, name, this.migadu.domainName);

    return await this.migadu.httpRequestFn<T["DeleteReturnType"]>(
      httpRequestFnPropsBuilder(
        this.endpoint.build(this.apiType, false),
        this.migadu.basicAuthCred,
        undefined,
        "DELETE"
      )
    );
  }
}

