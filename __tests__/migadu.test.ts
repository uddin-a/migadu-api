import "dotenv/config";
import { describe, test, expect, beforeAll, afterAll } from "vitest";
import Migadu, { HttpRequestFn, HttpRequestFnProps } from "../src/Migadu";
import process from "process";
const DEFAULT_EMAIL = process.env.MIGADU_EMAIL || "my@email.com";
const DEFAULT_API_KEY =
  process.env.MIGADU_API_KEY ||
  "bsaYELKrlBAjvUj2LKpbZQvXF1IpDevWvCYA21Xh2V9Omh1EyQJxiHjG65ytFKfN3ow1XGi3EHUuU5xq9Ul1LZME1NTMJVbk8JMvDchn3rthsAUIQnZtsxf5xtycsPcc";
const DEFAULT_DOMAIN_NAME = process.env.MIGADU_DOMAIN_NAME || "domain.my";
const EXTRA_DOMAIN_NAME = process.env.MIGADU_DOMAIN_NAME_EXTRA || "domain2.my";
const DEFAULT_MAILBOX_NAME = process.env.MIGADU_MAILBOX_NAME || "test_mailbox";
const DEFAULT_IDENTITY = process.env.MIGADU_MAILBOX_IDENTITY || "test_identity";
const DEFAULT_FORWARDING =
  process.env.MIGADU_FORWORDING || "test_forwarding@mail.fr";
const DEFAULT_ALIAS = process.env.MIGADU_ALIAS || "test_alias";
const DEFAULT_REWRITE = process.env.MIGADU_REWRITE || "test_rewrite";
const INVALIDE_DOMAIN_NAME =
  "bad_domain_8Z7JeqEbEZwmMNOCKvL5L8T4WJz5LCl2QtJJQpjYZTPKvInuHHZLBQglKGPfVDg6";
const INVALIDE_MAILBOX_NAME = "bad_mailbox_Vs8BDIYtgoZLCloLmzuBX73TECik1TB8efX";

function randomString(length: number) {
  var result = "";
  var characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

describe("Migadu Class", () => {
  describe("basic", () => {
    test("Instantiate : valide", () => {
      const migadu = new Migadu(
        DEFAULT_EMAIL,
        DEFAULT_API_KEY,
        DEFAULT_DOMAIN_NAME
      );
      expect(migadu).toBeDefined();
    });
    test("Instantiate : empty email", () => {
      expect(
        () => new Migadu(" ", DEFAULT_API_KEY, DEFAULT_DOMAIN_NAME)
      ).toThrowError("Invalid email or API key");
    });
    test("Instantiate : empty api", () => {
      expect(
        () => new Migadu(DEFAULT_EMAIL, "  ", DEFAULT_DOMAIN_NAME)
      ).toThrowError("Invalid email or API key");
    });
    test("Instantiate : empty email & api", () => {
      expect(() => new Migadu(" ", "  ", DEFAULT_DOMAIN_NAME)).toThrowError(
        "Invalid email or API key"
      );
    });
    test("Set email : valide", () => {
      const newEmail = "new@email.com" as const;
      const migadu = new Migadu(
        DEFAULT_EMAIL,
        DEFAULT_API_KEY,
        DEFAULT_DOMAIN_NAME
      );
      expect(() => (migadu.email = newEmail)).not.toThrowError(
        "Must provide a valide non empty API key to the method 'setApiKey'"
      );
      expect(migadu.email).toBe(newEmail);
    });
    test("Set email : invalide", () => {
      const migadu = new Migadu(
        DEFAULT_EMAIL,
        DEFAULT_API_KEY,
        DEFAULT_DOMAIN_NAME
      );
      expect(() => (migadu.email = null as unknown as string)).toThrowError(
        "Email invalide. Please make sure the email is correct"
      );
      expect(
        () => (migadu.email = undefined as unknown as string)
      ).toThrowError("Email invalide. Please make sure the email is correct");
      expect(() => (migadu.email = "   ")).toThrowError(
        "Email invalide. Please make sure the email is correct"
      );
    });
    test("Set api key : valide", () => {
      const migadu = new Migadu(
        DEFAULT_EMAIL,
        DEFAULT_API_KEY,
        DEFAULT_DOMAIN_NAME
      );
      expect(
        () =>
          (migadu.apiKey =
            "yrYsBWhuOJawMdyUVz9jMSXqkdD1sCXNBqTqiuSxQU5GHrIhsRs3Z2hb1IRn9HFGO1rYxWHXkZ4raKD6BTvy7hBsB7uKEUtfLjCLRHiYZJ7dL4k27sUAVMJH1PkXZS0J")
      ).not.toThrowError(
        "Must provide a valide non empty API key to the method 'setApiKey'"
      );
    });
    test("Set api key : invalide", () => {
      const migadu = new Migadu(
        DEFAULT_EMAIL,
        DEFAULT_API_KEY,
        DEFAULT_DOMAIN_NAME
      );
      expect(() => (migadu.apiKey = null as unknown as string)).toThrowError(
        "API Key invalide. Please make sure the API Key is correct"
      );
      expect(
        () => (migadu.apiKey = undefined as unknown as string)
      ).toThrowError(
        "API Key invalide. Please make sure the API Key is correct"
      );
      expect(() => (migadu.apiKey = "   ")).toThrowError(
        "API Key invalide. Please make sure the API Key is correct"
      );
    });
    test("Set httpRequestFn: valide", () => {
      const migadu = new Migadu(
        DEFAULT_EMAIL,
        DEFAULT_API_KEY,
        DEFAULT_DOMAIN_NAME
      );
      const newHttpRequestFunction = async function <ReturnType>({
        options,
        url,
        data,
      }: HttpRequestFnProps): Promise<ReturnType> {
        return new Promise((resolve, _reject) => {
          resolve("done" as unknown as ReturnType);
        });
      };

      expect(
        () => (migadu.httpRequestFn = newHttpRequestFunction)
      ).not.toThrow();
    });

    test("Set httpRequestFn: invalide", () => {
      const migadu = new Migadu(
        DEFAULT_EMAIL,
        DEFAULT_API_KEY,
        DEFAULT_DOMAIN_NAME
      );
      const newHttpRequestFunction1 = function (): string {
        return "hello";
      };
      const newHttpRequestFunction2 = function <_ReturnType>({
        options,
        url,
        data,
      }: HttpRequestFnProps) {
        return;
      };
      const newHttpRequestFunction3 = async function <ReturnType>(
        { options, url, data }: HttpRequestFnProps,
        secondParam: string
      ): Promise<ReturnType> {
        return new Promise((resolve, _reject) => {
          resolve("done" as unknown as ReturnType);
        });
      };

      expect(
        () => (migadu.httpRequestFn = "hello there" as unknown as HttpRequestFn)
      ).toThrowError(
        "Must provide a valide httpRequestFn (function) to setHttpRequestFn method"
      );
      expect(
        () => (migadu.httpRequestFn = null as unknown as HttpRequestFn)
      ).toThrowError(
        "Must provide a valide httpRequestFn (function) to setHttpRequestFn method"
      );
      expect(
        () => (migadu.httpRequestFn = undefined as unknown as HttpRequestFn)
      ).toThrowError(
        "Must provide a valide httpRequestFn (function) to setHttpRequestFn method"
      );
      expect(
        () =>
          (migadu.httpRequestFn =
            newHttpRequestFunction1 as unknown as HttpRequestFn)
      ).toThrow();
      expect(
        () =>
          (migadu.httpRequestFn =
            newHttpRequestFunction1 as unknown as HttpRequestFn)
      ).toThrowError(
        "HttpRequestFn must accept exactly 1 parameter (HttpRequestFnProps object)"
      );
      expect(
        () =>
          (migadu.httpRequestFn =
            newHttpRequestFunction2 as unknown as HttpRequestFn)
      ).toThrow();
      expect(
        () =>
          (migadu.httpRequestFn =
            newHttpRequestFunction2 as unknown as HttpRequestFn)
      ).toThrowError(
        "HttpRequestFn must be an async function AND return a Promise"
      );
      expect(
        () =>
          (migadu.httpRequestFn =
            newHttpRequestFunction3 as unknown as HttpRequestFn)
      ).toThrow();
      expect(
        () =>
          (migadu.httpRequestFn =
            newHttpRequestFunction3 as unknown as HttpRequestFn)
      ).toThrowError(
        "HttpRequestFn must accept exactly 1 parameter (HttpRequestFnProps object)"
      );
    });
  });

  //   === End of basic tests ===
  describe("Specialized", () => {
    const VALIDE_MIGADU_INSTANCE = new Migadu(
      DEFAULT_EMAIL,
      DEFAULT_API_KEY,
      DEFAULT_DOMAIN_NAME
    );
    describe("Mailboxes", () => {
      const rnd_name: string = randomString(10);

      describe("getAll", () => {
        test("valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const list = await migadu.mailbox.getAll();
          expect(list).not.toBeUndefined();
          expect(list).not.toBeNull();
          expect(Array.isArray(list)).toBe(true);
        });
        test("invalide", async () => {
          const migadu = new Migadu(
            DEFAULT_EMAIL,
            DEFAULT_API_KEY,
            INVALIDE_DOMAIN_NAME
          );
          await expect(migadu.mailbox.getAll).rejects.toThrowError();
        });
      });
      describe("get", () => {
        test("valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const list = await migadu.mailbox.get(DEFAULT_MAILBOX_NAME);
          expect(list).not.toBeUndefined();
          expect(list).not.toBeNull();
          expect(typeof list).toBe("object");
          expect(Array.isArray(list)).not.toBe(true);
        });

        test("Invalide ", async () => {
          const migadu = new Migadu(
            DEFAULT_EMAIL,
            DEFAULT_API_KEY,
            DEFAULT_DOMAIN_NAME
          );

          await expect(
            migadu.mailbox.get(INVALIDE_MAILBOX_NAME)
          ).rejects.toThrow();
        });
      });

      describe("create", () => {
        test("Valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;

          const data = await migadu.mailbox.create({
            name: rnd_name,
            local_part: rnd_name,
            password_method: "password",
            password: "0001235a6sd8f",
            password_recovery_email: "my@mail.com",
          });

          expect(data).toBeDefined();
        });
      });

      describe("update", () => {
        test("Valide", async () => {
          const new_name = "This is a test name";
          const migadu = VALIDE_MIGADU_INSTANCE;
          migadu.mailboxName = rnd_name;
          const data = await migadu.mailbox.update(rnd_name, {
            name: new_name,
          });
          expect(data).toBeDefined();
          expect(data.name).toBe(new_name);
        });
      });
      describe("delete", () => {
        test("valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const data = await migadu.mailbox.delete(rnd_name);
          expect(data).toBeDefined();
          expect(data.local_part).toBe(rnd_name);
        });
      });
    });
    // === End of Mailboxes ===
    describe("Identities", () => {
      const rnd_name: string = randomString(10);

      describe("getAll", () => {
        test("valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const list = await migadu.identity.getAll({
            mailboxes: DEFAULT_MAILBOX_NAME,
          });
          expect(list).not.toBeUndefined();
          expect(list).not.toBeNull();
          expect(Array.isArray(list)).toBe(true);
        });
        test("invalide", async () => {
          const migadu = new Migadu(
            DEFAULT_EMAIL,
            DEFAULT_API_KEY,
            INVALIDE_DOMAIN_NAME
          );
          await expect(
            migadu.identity.getAll({
              mailboxes: DEFAULT_MAILBOX_NAME,
            })
          ).rejects.toThrowError();
        });
      });
      describe("get", () => {
        test("valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const list = await migadu.identity.get(DEFAULT_IDENTITY, {
            mailboxes: DEFAULT_MAILBOX_NAME,
          });
          expect(list).not.toBeUndefined();
          expect(list).not.toBeNull();
          expect(typeof list).toBe("object");
          expect(Array.isArray(list)).not.toBe(true);
        });

        test("Invalide ", async () => {
          const migadu = new Migadu(
            DEFAULT_EMAIL,
            DEFAULT_API_KEY,
            DEFAULT_DOMAIN_NAME
          );

          await expect(
            migadu.identity.get(INVALIDE_MAILBOX_NAME, {
              mailboxes: DEFAULT_MAILBOX_NAME,
            })
          ).rejects.toThrow();
        });
      });
      describe("create", () => {
        test("Valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;

          const data = await migadu.identity.create(
            {
              name: `test_${rnd_name}`,
              local_part: `test_${rnd_name}`,
            },
            { mailboxes: DEFAULT_MAILBOX_NAME }
          );
          expect(data).toBeDefined();
          expect(data.name).toBe(`test_${rnd_name}`);
          expect(data.local_part).toBe(`test_${rnd_name}`);
        });
      });
      describe("update", () => {
        test("Valide", async () => {
          const new_name = "This is a test name";
          const migadu = VALIDE_MIGADU_INSTANCE;
          const data = await migadu.identity.update(
            DEFAULT_IDENTITY,
            {
              name: new_name,
            },
            { mailboxes: DEFAULT_MAILBOX_NAME }
          );
          expect(data).toBeDefined();
          expect(data.name).toBe(new_name);
        });
      });
      describe("delete", () => {
        test("valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const data = await migadu.identity.delete(`test_${rnd_name}`, {
            mailboxes: DEFAULT_MAILBOX_NAME,
          });
          expect(data).toBeDefined();
          expect(data.local_part).toBe(`test_${rnd_name}`);
        });
      });
    });
    // === End of Identities ===
    describe("Forwardings", () => {
      const rnd_name: string = randomString(10);

      describe("getAll", () => {
        test("Valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const list = await migadu.forward.getAll({
            mailboxes: DEFAULT_MAILBOX_NAME,
          });
          expect(list).not.toBeUndefined();
          expect(list).not.toBeNull();
          expect(Array.isArray(list)).toBe(true);
        });
        test("Invalide", async () => {
          const migadu = new Migadu(
            DEFAULT_EMAIL,
            DEFAULT_API_KEY,
            DEFAULT_DOMAIN_NAME
          );
          await expect(
            migadu.forward.getAll({
              mailboxes: DEFAULT_MAILBOX_NAME + "_bad",
            })
          ).rejects.toThrowError();
        });
      });
      describe("get", () => {
        test("Valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const list = await migadu.forward.get(DEFAULT_FORWARDING, {
            mailboxes: DEFAULT_MAILBOX_NAME,
          });
          expect(list).not.toBeUndefined();
          expect(list).not.toBeNull();
          expect(typeof list).toBe("object");
          expect(Array.isArray(list)).not.toBe(true);
        });
        test("Invalide", async () => {
          const migadu = new Migadu(
            DEFAULT_EMAIL,
            DEFAULT_API_KEY,
            DEFAULT_DOMAIN_NAME
          );
          await expect(
            migadu.forward.get(INVALIDE_MAILBOX_NAME, {
              mailboxes: DEFAULT_MAILBOX_NAME,
            })
          ).rejects.toThrowError();
        });
      });
      describe("create", () => {
        test("Valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;

          const data = await migadu.forward.create(
            {
              address: `test_${rnd_name}@${EXTRA_DOMAIN_NAME}`,
              expires_on: new Date(
                new Date().setDate(new Date().getDate() + 10)
              ),
              is_active: true,
              remove_upon_expiry: true,
            },
            { mailboxes: DEFAULT_MAILBOX_NAME }
          );
          expect(data).toBeDefined();
          expect(data.address).toBe(`test_${rnd_name}@${EXTRA_DOMAIN_NAME}`);
        });
      });
      describe("update", () => {
        test("Valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const new_date = new Date(
            new Date().setDate(new Date().getDate() + 20)
          );
          const data = await migadu.forward.update(
            `test_${rnd_name}@${EXTRA_DOMAIN_NAME}`,
            {
              expires_on: new_date,
              is_active: false,
            },
            { mailboxes: DEFAULT_MAILBOX_NAME }
          );
          const expected_date = new Date(new_date).toISOString().slice(0, 10);
          const returned_date = new Date(data.expires_on)
            .toISOString()
            .slice(0, 10);
          expect(data).toBeDefined();
          expect(returned_date).toBe(expected_date);
          expect(data.is_active).toBe(false);
        });
      });
      describe("delete", () => {
        test("valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const data = await migadu.forward.delete(
            `test_${rnd_name}@${EXTRA_DOMAIN_NAME}`,
            { mailboxes: DEFAULT_MAILBOX_NAME }
          );
          expect(data).toBeDefined();
          expect(data.address).toBe(`test_${rnd_name}@${EXTRA_DOMAIN_NAME}`);
        });
      });
    });
    // === End of Forwardings ===
    describe("Aliases", () => {
      const rnd_name: string = randomString(10);

      describe("getAll", () => {
        test("Valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const list = await migadu.alias.getAll();
          expect(list).not.toBeUndefined();
          expect(list).not.toBeNull();
          expect(Array.isArray(list)).toBe(true);
        });
        test("Invalide", async () => {
          const migadu = new Migadu(
            DEFAULT_EMAIL,
            DEFAULT_API_KEY,
            INVALIDE_DOMAIN_NAME
          );
          await expect(migadu.alias.getAll()).rejects.toThrowError();
        });
      });
      describe("get", () => {
        test("Valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const list = await migadu.alias.get(DEFAULT_ALIAS);
          expect(list).not.toBeUndefined();
          expect(list).not.toBeNull();
          expect(typeof list).toBe("object");
          expect(Array.isArray(list)).not.toBe(true);
        });
      });
      describe("create", () => {
        test("Valide with", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;

          const data = await migadu.alias.create({
            destinations: [
              `dest1@${EXTRA_DOMAIN_NAME}`,
              `dest2@${EXTRA_DOMAIN_NAME}`,
            ],
            is_internal: false,
            local_part: `test_${rnd_name}`,
            expireable: true,
            expires_on: new Date(new Date().setDate(new Date().getDate() + 10))
              .toISOString()
              .slice(0, 10),
            remove_upon_expiry: true,
          });
          expect(data).toBeDefined();
          expect(data.address).toBe(`test_${rnd_name}@${DEFAULT_DOMAIN_NAME}`);
        });
        test("Valide with the least amount of fields", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;

          const data = await migadu.alias.create({
            destinations: [
              `dest1@${EXTRA_DOMAIN_NAME}`,
              `dest2@${EXTRA_DOMAIN_NAME}`,
            ],
            local_part: `test_${rnd_name}_2`,
          });
          expect(data).toBeDefined();
          expect(data.address).toBe(
            `test_${rnd_name}_2@${DEFAULT_DOMAIN_NAME}`
          );
        });
      });
      describe("update", () => {
        test("Valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const new_date = new Date(
            new Date().setDate(new Date().getDate() + 20)
          )
            .toISOString()
            .slice(0, 10);
          const data = await migadu.alias.update(`test_${rnd_name}`, {
            expires_on: new_date,
            remove_upon_expiry: false,
            destinations: [
              `new_dest1@${DEFAULT_DOMAIN_NAME}`,
              `new_dest2@${DEFAULT_DOMAIN_NAME}`,
            ],
          });
          expect(data).toBeDefined();
          expect(data.expires_on).toBe(new_date);
          expect(data.remove_upon_expiry).toBe(false);
          expect(data.destinations).toEqual([
            `new_dest1@${DEFAULT_DOMAIN_NAME}`,
            `new_dest2@${DEFAULT_DOMAIN_NAME}`,
          ]);
        });
      });
      describe("delete", () => {
        test("valide with all fields", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const data = await migadu.alias.delete(`test_${rnd_name}`);
          expect(data).toBeDefined();
          expect(data.address).toBe(`test_${rnd_name}@${DEFAULT_DOMAIN_NAME}`);
        });
        test("valide with the least amount of fields", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const data = await migadu.alias.delete(`test_${rnd_name}_2`);
          expect(data).toBeDefined();
          expect(data.address).toBe(
            `test_${rnd_name}_2@${DEFAULT_DOMAIN_NAME}`
          );
        });
      });
    });
    // === End of Aliases ===
    describe("Rewrites", () => {
      const rnd_name: string = randomString(10);

      describe("getAll", () => {
        test("Valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const list = await migadu.rewrite.getAll();
          expect(list).not.toBeUndefined();
          expect(list).not.toBeNull();
          expect(Array.isArray(list)).toBe(true);
        });
        test("Invalide", async () => {
          const migadu = new Migadu(
            DEFAULT_EMAIL,
            DEFAULT_API_KEY,
            INVALIDE_DOMAIN_NAME
          );
          await expect(migadu.rewrite.getAll()).rejects.toThrowError();
        });
      });
      describe("get", () => {
        test("Valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const list = await migadu.rewrite.get(DEFAULT_REWRITE);
          expect(list).not.toBeUndefined();
          expect(list).not.toBeNull();
          expect(typeof list).toBe("object");
          expect(Array.isArray(list)).not.toBe(true);
        });
        test("Invalide", async () => {
          const migadu = new Migadu(
            DEFAULT_EMAIL,
            DEFAULT_API_KEY,
            DEFAULT_DOMAIN_NAME
          );
          await expect(
            migadu.rewrite.get(INVALIDE_MAILBOX_NAME)
          ).rejects.toThrowError();
        });
      });
      describe("create", () => {
        test("Valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;

          const data = await migadu.rewrite.create({
            name: `test_${rnd_name}`,
            local_part_rule: `test_${rnd_name}`,

            destinations: `dest1, dest2`,
          });
          expect(data).toBeDefined();
          expect(data.name).toBe(`test_${rnd_name}`);
        });
      });
      describe("update", () => {
        test("Valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const data = await migadu.rewrite.update(`test_${rnd_name}`, {
            name: `new_name_${rnd_name}`,
            local_part_rule: `new_local_part_rule_${rnd_name}`,
            destinations: `new_dest1, new_dest2, new_dest3`,
          });
          expect(data).toBeDefined();
          expect(data.name).toBe(`new_name_${rnd_name}`);
          expect(data.local_part_rule).toBe(`new_local_part_rule_${rnd_name}`);
          expect(data.destinations).toContain(
            `new_dest1@${DEFAULT_DOMAIN_NAME}`
          );
          expect(data.destinations).toContain(
            `new_dest2@${DEFAULT_DOMAIN_NAME}`
          );
          expect(data.destinations).toContain(
            `new_dest3@${DEFAULT_DOMAIN_NAME}`
          );
        });
      });
      describe("delete", () => {
        test("valide", async () => {
          const migadu = VALIDE_MIGADU_INSTANCE;
          const data = await migadu.rewrite.delete(`new_name_${rnd_name}`);
          expect(data).toBeDefined();
          expect(data.local_part_rule).toBe(`new_local_part_rule_${rnd_name}`);
        });
      });
    });
    // === End of Rewrites ===
  });
});
