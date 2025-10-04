import { AliasMigaduApi } from "./apis/AliasMigaduApi";
import { ForwardingMigaduApi } from "./apis/ForwardingMigaduApi";
import { IdentityMigaduApi } from "./apis/IdentityMigaduApi";
import { MailboxMigaduApi } from "./apis/MailboxMigaduApi";
import { RewriteMigaduApi } from "./apis/RewriteMigaduApi";
import defaultHttpRequestFn from "./defaultHttpRequestFn";

import { MigaduApiV1UrlBuilder } from "./utils/MigaduApiV1UrlBuilder";

export type HttpRequestFn = <ReturnType = unknown>(
  props: HttpRequestFnProps
) => Promise<ReturnType>;

/**
 * This are the needed HTTP request types used in migadu.
 */
export type HttpRequestFnMethodsProps = "GET" | "POST" | "PUT" | "DELETE";
export interface HttpRequestFnOptionsProps {
  /**
   * type: `string`
   * expects: one of the following HTTP requests "GET" | "POST" | "PUT" | "DELETE"
   */
  method: HttpRequestFnMethodsProps;
  /**
   * type : Object
   * some of the expected keys :
   * "Content-Type" : "application/json",
   * Authorization : string
   * 
   * This object is used to send data about the content type and authentication
   * infos.
   */
  headers?:
    | {
        "Content-Type"?: "application/json" | string;
        Authorization?: string;
        [key: string]: string | undefined;
      }
    | HeadersInit;
}
export interface HttpRequestFnProps {
  url: string;
  options: HttpRequestFnOptionsProps;
  /**
   * This value is passed to JSON.stringify(...).
   */
  data?: BodyInit | string | unknown | undefined;
}

/**
 * This is the entrypoint to use all the Migadu api related stuffs from this
 * library. This class is a thin wrapper over the `MigaduApiBase` class acting
 * as a 'parent' class.
 */
export default class Migadu {
  /**
   * This variable contain the function that we call to make the http requests.
   * by default it uses the the function `defaultHttpRequestFn`.
   *
   * This variable expects the following type :
   *
   * ```typescript
   *  type HttpRequestFn<DataType, ReturnType> = (
   *    props: HttpRequestFnProps<DataType>
   *  ) => Promise<ReturnType>;
   * ```
   *
   * **DataType** : The type of the data you are sending in your request. This is
   * usually a json object.
   *
   * **ReturnType** : Is the type you are expecting the function to return.
   * By default it should be one of the Migadu Request Types.
   */
  private _httpRequestFn: HttpRequestFn;
  /**
   * The email used to login to migadu. The value of this variable is used for
   * authentication purpose.
   */
  private _email: string;
  /**
   * The api key generated from migadu. The value of this variable is used for
   * authentication purpose.
   */
  private _apiKey: string;
  private _domainName: string | undefined;
  private _basicAuthCred: string;
  protected readonly endpoint: MigaduApiV1UrlBuilder;

  /*
  * Different APIs
  */

  /**
   * The mailbox api. You can use this to access all the api related to mailbox.
   * 
   * ex :
   * - get : Gets a specific email address details
   * - getAll : Gets all the email address
   * - create : Create a new email address
   * - update : Update an existing email address
   * - delete : Delete an existing email address
   */
  public readonly mailbox: MailboxMigaduApi;
  /**
   * The identity api. You can use this to access all the api related to
   * identities.
   * 
   * ex :
   * - get : Gets a specific identity details
   * - getAll : Gets all the identities
   * - create : Create a new identity
   * - update : Update an existing identity
   * - delete : Delete an existing identity
   */
  public readonly identity: IdentityMigaduApi;
    /**
   * The forward api. You can use this to access all the api related to
   * forwards.
   * 
   * ex :
   * - get : Gets a specific forward details
   * - getAll : Gets all the forwards
   * - create : Create a new forward
   * - update : Update an existing forward
   * - delete : Delete an existing forward
   */
  public readonly forward: ForwardingMigaduApi;
  /**
   * The alias api. You can use this to access all the api related to alias.
   * 
   * ex :
   * - get : Gets a specific alias details
   * - getAll : Gets all the aliases
   * - create : Create a new alias
   * - update : Update an existing alias
   * - delete : Delete an existing alias
   */
  public readonly alias: AliasMigaduApi;
  /**
   * The rewrite api. You can use this to access all the api related to rewrite.
   * 
   * ex :
   * - get : Gets a specific rewrite details
   * - getAll : Gets all the rewrites
   * - create : Create a new rewrite
   * - update : Update an existing rewrite
   * - delete : Delete an existing rewrite
   */
  public readonly rewrite: RewriteMigaduApi;

  get httpRequestFn() {
    return this._httpRequestFn;
  }
  get email(): string {
    return this._email;
  }
  get apiKey(): string {
    return this._apiKey;
  }
  get domainName(): string | undefined {
    return this._domainName;
  }
  get basicAuthCred(): string {
    return this._basicAuthCred;
  }

  set email(e: string) {
    if (!e || e.trim().length === 0) {
      throw new Error("Email invalide. Please make sure the email is correct");
    }
    this._email = e.trim();
    this.basicAuthCred = this.getBasicAuthCred();
  }

  set apiKey(e: string) {
    if (!e || e.trim().length === 0) {
      throw new Error(
        "API Key invalide. Please make sure the API Key is correct"
      );
    }
    this._apiKey = e.trim();
    this.basicAuthCred = this.getBasicAuthCred();
  }
  set domainName(e: string | undefined) {
    if (!e || e.trim().length === 0) {
      throw new Error(
        "Domain-name invalide. Please make sure the domain-name is correct"
      );
    }
    this._domainName = e.trim();
  }
  set basicAuthCred(e: string) {
    if (!e || e.trim().length === 0) {
      throw new Error(
        "Basic-Auth invalide. Please make sure the basic-auth is correct"
      );
    }
    this._basicAuthCred = e.trim();
  }

  set mailboxName(name: string | undefined) {
    if (name && name.length === 0) {
      return;
    }
    this.endpoint.mailboxes(name, false);
  }

  set httpRequestFn(fn: HttpRequestFn) {
    const isAsyncFunction = (fn: Function): boolean => {
      return fn.constructor.name === "AsyncFunction";
    };

    if (!fn || typeof fn !== "function") {
      throw new Error(
        "Must provide a valide httpRequestFn (function) to setHttpRequestFn method"
      );
    } else if (fn.length !== 1) {
      throw new Error(
        "HttpRequestFn must accept exactly 1 parameter (HttpRequestFnProps object)"
      );
    } else if (!isAsyncFunction(fn)) {
      throw new Error(
        "HttpRequestFn must be an async function AND return a Promise"
      );
    }

    this._httpRequestFn = fn;
  }

  /**
   * This is the entry class to use everything related to migadu api.
   * 
   * Usage example:
   * 
   * ```typescript
   * const m = new Migadu(email, apiKey);
   * console.log(m.mailbox.getAll());
   * ```
   * 
   * @param email `string` **Required** The email used to login to migadu
   * @param apiKey `string` **Required:** The migadu api key.
   * @param domainName `string` **Optional** Name of the domain you want to use.
   * @param httpRequestFn `string` **optional** Function handling http requests.
   * 
   */
  constructor(
    email: string,
    apiKey: string,
    domainName?: string,
    httpRequestFn: HttpRequestFn = defaultHttpRequestFn
  ) {
    if (
      !email ||
      !apiKey ||
      email.length === 0 ||
      apiKey.length === 0 ||
      email.trim().length === 0 ||
      apiKey.trim().length === 0
    ) {
      throw new Error("Invalid email or API key");
    }
    this._email = email;
    this._apiKey = apiKey;
    this.domainName = domainName;
    this._httpRequestFn = httpRequestFn;
    this._basicAuthCred = this.getBasicAuthCred();

    this.endpoint = new MigaduApiV1UrlBuilder();
    this.mailbox = new MailboxMigaduApi(this, this.endpoint);
    this.identity = new IdentityMigaduApi(this, this.endpoint);
    this.forward = new ForwardingMigaduApi(this, this.endpoint);
    this.alias = new AliasMigaduApi(this, this.endpoint);
    this.rewrite = new RewriteMigaduApi(this, this.endpoint);
  }

  private getBasicAuthCred(): string {
    return btoa(`${this.email}:${this.apiKey}`);
  }
}
