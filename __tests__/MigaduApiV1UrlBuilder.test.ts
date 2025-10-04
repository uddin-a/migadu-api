import { expect, test, describe } from "vitest";
import { MigaduApiV1UrlBuilder } from "../src/utils/MigaduApiV1UrlBuilder";

const BASE_DONAIN_NAME = "https://api.migadu.com/v1" as const;
describe("MigaduApiV1UrlBuilder Class", () => {
  test("Constructor", () => {
    const base_url = "https://google.com/v1" as const;
    const builder1 = new MigaduApiV1UrlBuilder(BASE_DONAIN_NAME);
    const builder2 = new MigaduApiV1UrlBuilder(base_url);

    expect(builder1.build()).toBe(BASE_DONAIN_NAME);
    expect(builder2.build()).toBe(base_url);
    expect(builder2.build()).not.toBe(builder1.build());
  });
  test("Domain name", () => {
    const myDomainName = "myDomain";
    const b = new MigaduApiV1UrlBuilder();
    b.domain(myDomainName);

    expect(b.build()).toBe(BASE_DONAIN_NAME + "/domains/" + myDomainName);
  });
  test("Domain name (empty string)", () => {
    const myDomainName = "";
    const b = new MigaduApiV1UrlBuilder();

    expect(() => b.domain(myDomainName)).toThrowError(
      "Domain name cannot be empty"
    );
  });
  test(".toString() method", () => {
    const b = new MigaduApiV1UrlBuilder();
    const domainName = "mydomain.org" as const;
    const mailboxName = "myMailbox" as const;
    const identityName = "myIdentity" as const;
    b.domain(domainName).mailboxes(mailboxName).identities(identityName);
    expect(b.toString()).toBe(
      BASE_DONAIN_NAME +
        "/domains/" +
        domainName +
        "/mailboxes/" +
        mailboxName +
        "/identities/" +
        identityName
    );
  });
  // MAILBOXES
  describe("Mailboxes", () => {
    test("without specific mailbox name", () => {
      const domainName = "myDomain" as const;
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.mailboxes()).toThrowError("Domain is not set");
      b.domain(domainName);
      b.mailboxes();
      expect(b.build()).toBe(
        BASE_DONAIN_NAME + "/domains/" + domainName + "/mailboxes"
      );
    });
    test("with specific mailbox name", () => {
      const domainName = "myDomain" as const;
      const mailboxName = "myMailBox" as const;
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.mailboxes()).toThrowError("Domain is not set");
      b.domain(domainName);
      b.mailboxes(mailboxName);
      expect(b.build()).toBe(
        BASE_DONAIN_NAME +
          "/domains/" +
          domainName +
          "/mailboxes/" +
          mailboxName
      );
    });
  });
  // IDENTITIES
  describe("Identities", () => {
    test("without mailbox", () => {
      const domainName = "myDomain" as const;
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.mailboxes()).toThrowError("Domain is not set");
      b.domain(domainName);
      expect(() => b.identities()).toThrowError("Mailbox is not set");
    });
    test("without specific Identity name", () => {
      const domainName = "myDomain" as const;
      const mailboxName = "myMailbox" as const;
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.mailboxes()).toThrowError("Domain is not set");
      b.domain(domainName);
      b.mailboxes(mailboxName);
      b.identities();
      expect(b.build()).toBe(
        BASE_DONAIN_NAME +
          "/domains/" +
          domainName +
          "/mailboxes/" +
          mailboxName +
          "/identities"
      );
    });
    test("with specific Identity name", () => {
      const domainName = "myDomain" as const;
      const mailboxName = "myMailbox" as const;
      const identityName = "myIdentity" as const;
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.mailboxes()).toThrowError("Domain is not set");
      b.domain(domainName);
      b.mailboxes(mailboxName);
      b.identities(identityName);
      expect(b.build()).toBe(
        BASE_DONAIN_NAME +
          "/domains/" +
          domainName +
          "/mailboxes/" +
          mailboxName +
          "/identities/" +
          identityName
      );
    });
  });
  // FORWORDINGS
  describe("Forwordings", () => {
    test("without domain & mailbox", () => {
      const domainName = "myDomain" as const;
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.mailboxes()).toThrowError("Domain is not set");
      b.domain(domainName);
      expect(() => b.forwardings()).toThrowError("Mailbox is not set");
    });
    test("without specific forwardings name", () => {
      const domainName = "myDomain" as const;
      const mailboxName = "myMailbox" as const;
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.mailboxes()).toThrowError("Domain is not set");
      b.domain(domainName);
      b.mailboxes(mailboxName);
      b.forwardings();
      expect(b.build()).toBe(
        BASE_DONAIN_NAME +
          "/domains/" +
          domainName +
          "/mailboxes/" +
          mailboxName +
          "/forwardings"
      );
    });
    test("(with specific forwardings name", () => {
      const domainName = "myDomain" as const;
      const mailboxName = "myMailbox" as const;
      const forwordingsName = "my@fordings.test" as const;
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.mailboxes()).toThrowError("Domain is not set");
      b.domain(domainName);
      b.mailboxes(mailboxName);
      b.forwardings(forwordingsName);
      expect(b.build()).toBe(
        BASE_DONAIN_NAME +
          "/domains/" +
          domainName +
          "/mailboxes/" +
          mailboxName +
          "/forwardings/" +
          forwordingsName
      );
    });
  });
  // Aliases
  describe("Aliases", () => {
    test("without domain", () => {
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.aliases()).toThrowError("Domain is not set");
    });
    test("without specific Alias name", () => {
      const domainName = "myDomain" as const;
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.aliases()).toThrowError("Domain is not set");
      b.domain(domainName);
      b.aliases();
      expect(b.build()).toBe(
        BASE_DONAIN_NAME + "/domains/" + domainName + "/aliases"
      );
    });
    test("with specific Alias name", () => {
      const domainName = "myDomain" as const;
      const aliasName = "myAlias" as const;
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.aliases()).toThrowError("Domain is not set");
      b.domain(domainName);
      b.aliases(aliasName);
      expect(b.build()).toBe(
        BASE_DONAIN_NAME + "/domains/" + domainName + "/aliases/" + aliasName
      );
    });
  });
  // REWRITES
  describe("Rewrites", () => {
    test("without domain", () => {
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.rewrites()).toThrowError("Domain is not set");
    });
    test("without specific rewrite name", () => {
      const domainName = "myDomain" as const;
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.aliases()).toThrowError("Domain is not set");
      b.domain(domainName);
      b.rewrites();
      expect(b.build()).toBe(
        BASE_DONAIN_NAME + "/domains/" + domainName + "/rewrites"
      );
    });
    test("with specific rewrite name", () => {
      const domainName = "myDomain" as const;
      const rewriteName = "myRewrite" as const;
      const b = new MigaduApiV1UrlBuilder();
      expect(() => b.aliases()).toThrowError("Domain is not set");
      b.domain(domainName);
      b.rewrites(rewriteName);
      expect(b.build()).toBe(
        BASE_DONAIN_NAME + "/domains/" + domainName + "/rewrites/" + rewriteName
      );
    });
  });
  describe("Extra : ", () => {
    test("destructure : valide", () => {
      const list = MigaduApiV1UrlBuilder.destructure(
        "https://api.migadu.com/v1/domains/mydomain.org/mailboxes/demo/forwardings/external@external.com"
      );
      expect(list.length).toBe(3);
    });
    test("destructure : invalide1 (extra slashes '/')", () => {
      const list = MigaduApiV1UrlBuilder.destructure(
        "https://api.migadu.com/v1/domains////mailboxes/demo/forwardings/external@external.com"
      );

      expect(list.length).toBe(0);
    });
    test("destructure : invalide2 (invalide path name)", () => {
      const list = MigaduApiV1UrlBuilder.destructure(
        "https://api.migadu.com/v1/domain/mailboxes/demo/forwardings/external@external.com"
      );

      expect(list.length).toBe(0);
    });
    test("destructure : invalide3 (bad version number)", () => {
      const list = MigaduApiV1UrlBuilder.destructure(
        "https://api.migadu.com/v2/domain/mailboxes/demo/forwardings/external@external.com"
      );

      expect(list.length).toBe(0);
    });
    test("destructure : invalide4 (extra valide name)", () => {
      const list = MigaduApiV1UrlBuilder.destructure(
        "https://api.migadu.com/v2/domain/mailboxes/demo/forwardings/external@external.com/forwardings"
      );

      expect(list.length).toBe(0);
    });
  });
});
