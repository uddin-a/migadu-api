import { MigaduApiType } from "../types/migaduApiBaseTypes";


export const URL_API_BASE = "https://api.migadu.com/v1" as const;

type MigaduApiUrlBuilderPathName = MigaduApiType["apiType"] | "domains";
type MigaduApiUrlBuilderPath = {
  pathName: MigaduApiUrlBuilderPathName;
  pathData?: string;
};

/**
 * URL Builder for Migadu API module.
 */
export class MigaduApiV1UrlBuilder {
  private readonly base_url: string;
  private pathList: Array<MigaduApiUrlBuilderPath> = [];

  constructor(base_url: string = URL_API_BASE) {
    this.base_url = base_url;
  }
  /**
   * Adds a path to the builder.
   * @param name The name of the path.
   * @param data The data for the path.
   * @returns
   */
  private addPath(name: MigaduApiUrlBuilderPathName, data?: string) {
    // Search for existing pathName to not create duplicates
    for (const pathItem of this.pathList) {
      if (pathItem.pathName === name) {
        pathItem.pathData = data;
        return;
      }
    }
    this.pathList.push({ pathName: name, pathData: data });
  }
  /**
   * Gets a path from the builder.
   * @param name The name of the path.
   * @returns The path if found, undefined otherwise.
   */
  private getPath(
    name: MigaduApiUrlBuilderPathName
  ): MigaduApiUrlBuilderPath | undefined {
    const pathItem = this.pathList.find((item) => item.pathName === name);
    return pathItem;
  }
  /**
   * Checks if a path has data.
   * @param name The name of the path.
   * @returns True if the path has data, false otherwise.
   */
  private pathHasData(name: MigaduApiUrlBuilderPathName): boolean {
    const pathItem = this.getPath(name);
    return pathItem && pathItem.pathData ? true : false;
  }

  /**
   * It returns an MigaduApiUrlBuilderPath item from the `pathList`
   * class variable. If the path or the path-data (if required) do not exists,
   * it throws Error saying that it is required.
   *
   * @param itemName `MigaduApiUrlBuilderPathName`
   * @param requeirePathData `boolean`
   * @throw `Error`
   * @returns `MigaduApiUrlBuilderPath`
   */
  private getPathItem(
    itemName: MigaduApiUrlBuilderPathName,
    requeirePathData: boolean = false
  ): MigaduApiUrlBuilderPath {
    let item = this.pathList.find((item) => item.pathName === itemName);
    if (!item) {
      throw new Error(
        `The item [${itemName}] could not be found in item list.`
      );
    } else if (requeirePathData && !item.pathData) {
      throw new Error(`Path data requires for the path ${itemName}`);
    }

    return item;
  }

  /**
   * Build the url using the existing path items. This methode can also ensure
   * the path is built properly if you pas an path type (ex: 'mailboxes') to the
   * parameter **apiType**. If reqire path datas are not present then it will
   * throw error.
   *
   * @param apiType `MigaduApiType["apiType"]` (ex: `mailboxes`, `identities`,
   * `forwardings`, `aliases`, `rewrites`)
   * @param ignoreLastValue `boolean` If true it will include the value of the
   * last item.
   * @returns `string`
   */
  public build(
    apiType?: MigaduApiType["apiType"],
    ignoreLastValue: boolean = false
  ): string {
    let url = this.base_url;

    if (apiType) {
      switch (apiType) {
        case "mailboxes": {
          const _dom = this.getPathItem("domains", true);
          const _mail = this.getPathItem("mailboxes", !ignoreLastValue);
          url =
            `${url}/${_dom.pathName}/${_dom.pathData}` +
            `/${_mail.pathName}` +
            (!ignoreLastValue ? `/${_mail.pathData}` : "");
          break;
        }
        case "identities": {
          const _dom = this.getPathItem("domains", true);
          const _mail = this.getPathItem("mailboxes", true);
          const _id = this.getPathItem("identities", !ignoreLastValue);
          url =
            `${url}/${_dom.pathName}/${_dom.pathData}` +
            `/${_mail.pathName}/${_mail.pathData}` +
            `/${_id.pathName}` +
            (!ignoreLastValue ? `/${_id.pathData}` : "");
          break;
        }
        case "forwardings": {
          const _dom = this.getPathItem("domains", true);
          const _mail = this.getPathItem("mailboxes", true);
          const _fw = this.getPathItem("forwardings", !ignoreLastValue);
          url =
            `${url}/${_dom.pathName}/${_dom.pathData}` +
            `/${_mail.pathName}/${_mail.pathData}` +
            `/${_fw.pathName}` +
            (!ignoreLastValue ? `/${_fw.pathData}` : "");
          break;
        }
        case "aliases": {
          const _dom = this.getPathItem("domains", true);
          const _alias = this.getPathItem("aliases", !ignoreLastValue);
          url =
            `${url}/${_dom.pathName}/${_dom.pathData}` +
            `/${_alias.pathName}` +
            (!ignoreLastValue ? `/${_alias.pathData}` : "");
          break;
        }
        case "rewrites": {
          const _dom = this.getPathItem("domains", true);
          const _rw = this.getPathItem("rewrites", !ignoreLastValue);
          url =
            `${url}/${_dom.pathName}/${_dom.pathData}` +
            `/${_rw.pathName}` +
            (!ignoreLastValue ? `/${_rw.pathData}` : "");
          break;
        }
        default:
          throw new Error("Unexpected 'apiType'");
      }
    } else {
      this.pathList.forEach((data, index, array) => {
        url = url + "/" + data.pathName;
        if (
          data.pathData &&
          (!ignoreLastValue || (ignoreLastValue && index + 1 < array.length))
        ) {
          url = url + "/" + data.pathData;
        }
      });
    }

    return url;
  }
  get [Symbol.toStringTag](): string {
    return this.build();
  }

  public toString(): string {
    return this.build();
  }

  public valueOf(): string {
    return this.build();
  }

  /**
   * This methode destructure a full path to an array of MigaduApiUrlBuilderPath
   *
   * Ex:
   *
   * ```typescript
   * const builder = MigaduApiV1Uribuilder
   * .destructure('https://api.migadu.com/v1/domains/mydomain.org/rewrites/demo)
   * ```
   *
   * @param fullUrl `string`
   * @returns `MigaduApiUrlBuilderPath[]`
   */
  public static destructure(fullUrl: string): MigaduApiUrlBuilderPath[] {
    if (!fullUrl || fullUrl.trim().length === 0) {
      return [];
    }
    let list: Array<MigaduApiUrlBuilderPath> = [];
    const url = new URL(fullUrl);
    const paramList = url.pathname
      .split("/")
      .filter((segment) => segment !== "");

    for (let i = 0; i < paramList.length; i++) {
      // Skip the first item as it is only the version number of the api
      if (i === 0 && paramList[i] === "v1") {
        continue;
      }
      switch (paramList[i]) {
        case "domains":
        case "mailboxes":
        case "forwardings":
        case "aliases":
        case "rewrites":
          const name = paramList[i] as MigaduApiUrlBuilderPathName;
          const data = i + 1 < paramList.length ? paramList[i + 1] : undefined;
          let foundExisting: boolean = false;
          // if for some reason the path already exists in the list then add the
          // new value instead of adding a new parameter
          for (const l of list) {
            if (l.pathName === name) {
              l.pathData = data;
              foundExisting = true;
            }
          }
          if (!foundExisting) {
            list.push({ pathName: name, pathData: data });
          }

          if (data) {
            i++;
          }
          break;
        default:
          // The url was poorly constructed
          return [];
      }
    }

    return list;
  }

  public domain(domainName: string): MigaduApiV1UrlBuilder {
    if (
      !domainName ||
      domainName.length === 0 ||
      domainName.trim().length === 0
    ) {
      throw new Error("Domain name cannot be empty");
    }
    this.addPath("domains", domainName);
    return this;
  }

  public mailboxes(
    mailbox_local_part?: string,
    checkDependencyPath: boolean = true
  ): MigaduApiV1UrlBuilder {
    if (checkDependencyPath && !this.pathHasData("domains")) {
      throw new Error("Domain is not set");
    }
    this.addPath("mailboxes", mailbox_local_part);
    return this;
  }

  public identities(
    identity_local_part?: string,
    checkDependencyPath: boolean = true
  ): MigaduApiV1UrlBuilder {
    if (checkDependencyPath && !this.pathHasData("domains")) {
      throw new Error("Domain is not set");
    }
    if (checkDependencyPath && !this.pathHasData("mailboxes")) {
      throw new Error("Mailbox is not set");
    }
    this.addPath("identities", identity_local_part);
    return this;
  }

  public forwardings(
    forwarding_mail_addr?: string,
    checkDependencyPath: boolean = true
  ): MigaduApiV1UrlBuilder {
    if (checkDependencyPath && !this.pathHasData("domains")) {
      throw new Error("Domain is not set");
    }
    if (checkDependencyPath && !this.pathHasData("mailboxes")) {
      throw new Error("Mailbox is not set");
    }
    this.addPath("forwardings", forwarding_mail_addr);
    return this;
  }

  public aliases(
    alias_local_part?: string,
    checkDependencyPath: boolean = true
  ): MigaduApiV1UrlBuilder {
    if (checkDependencyPath && !this.pathHasData("domains")) {
      throw new Error("Domain is not set");
    }
    this.addPath("aliases", alias_local_part);
    return this;
  }
  public rewrites(
    rewrite_name?: string,
    checkDependencyPath: boolean = true
  ): MigaduApiV1UrlBuilder {
    if (checkDependencyPath && !this.pathHasData("domains")) {
      throw new Error("Domain is not set");
    }
    this.addPath("rewrites", rewrite_name);
    return this;
  }
}
