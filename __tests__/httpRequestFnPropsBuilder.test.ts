import { describe, expect, test } from "vitest";
import { MigaduApiV1UrlBuilder } from "../src/utils/MigaduApiV1UrlBuilder";
import { httpRequestFnPropsBuilder } from "../src/utils/httpRequestFnPropsBuilder";

const BASE_DONAIN_NAME = "https://api.migadu.com/v1" as const;

describe("httpRequestFnPropsBuilder function", () => {
  test("basic usage without body", () => {
    const domainName = "myDomain" as const;
    const urlBuilder = new MigaduApiV1UrlBuilder();
    const basicAuthCred = btoa("email:password");
    urlBuilder.domain("myDomain");
    urlBuilder.mailboxes();

    const opt = httpRequestFnPropsBuilder(urlBuilder.build(), basicAuthCred);
    expect(opt.url).toBe(
      BASE_DONAIN_NAME + "/domains/" + domainName + "/mailboxes"
    );
    expect(opt.options.method).toBe("GET");
    expect(opt.options).not.toBeUndefined();
    const options = opt.options;
    if (options.headers === undefined) {
      throw new Error("options.headers should not be undefined here!");
    }
    expect(options.headers["Authorization"]).not.toBeUndefined();
    expect(options.headers["Authorization"]).toBe(`Basic ${basicAuthCred}`);
    expect(options.headers["Content-Type"]).toBeUndefined();
  });
  test("basic usage with body", () => {
    const domainName = "myDomain" as const;
    const urlBuilder = new MigaduApiV1UrlBuilder();
    const basicAuthCred = btoa("email:password");
    const data = { error: false };
    urlBuilder.domain("myDomain");
    urlBuilder.mailboxes();

    const opt = httpRequestFnPropsBuilder(
      urlBuilder.build(),
      basicAuthCred,
      data
    );
    expect(opt.url).toBe(
      BASE_DONAIN_NAME + "/domains/" + domainName + "/mailboxes"
    );
    expect(opt.options.method).toBe("GET");
    expect(opt.data).toBe(data);
    expect(opt.options).not.toBeUndefined();
    const options = opt.options;
    if (options.headers === undefined) {
      throw new Error("options.headers should not be undefined here!");
    }
    expect(options.headers["Authorization"]).not.toBeUndefined();
    expect(options.headers["Authorization"]).toBe(`Basic ${basicAuthCred}`);
    expect(options.headers["Content-Type"]).not.toBeUndefined();
    expect(options.headers["Content-Type"]).toBe("application/json");
  });
});
