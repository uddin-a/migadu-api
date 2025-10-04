import { Alias, Identity, Mailbox } from "./types";

export type MailboxReturnType = Omit<Mailbox, "password_method" | "password">;
export type MailboxCreateRequestType = Partial<
  Omit<
    Mailbox,
    | "address"
    | "is_active"
    | "activated_at"
    | "last_login_at"
    | "domain_name"
    | "storage_usage"
    | "changed_at"
  >
> &
  Required<
    Pick<
      Omit<
        Mailbox,
        | "address"
        | "is_active"
        | "activated_at"
        | "last_login_at"
        | "domain_name"
        | "storage_usage"
        | "changed_at"
      >,
      | "name"
      | "local_part"
      | "password_method"
      | "password"
      | "password_recovery_email"
    >
  >;

export type IdentityReturnType = Omit<Identity, "domain" | "password">;
export type IdentityCreateRequest = Partial<
  Omit<
    Identity,
    "domain" | "address" | "local_part" | "password_use" | "password" | "name"
  >
> &
  Required<
    Omit<
      Identity,
      | "domain"
      | "address"
      | "password_use"
      | "password"
      | "may_send"
      | "may_receive"
      | "may_access_imap"
      | "may_access_pop3"
      | "may_access_managesieve"
    >
  >;

export type AliasCreateRequestType = Required<
  Pick<Alias, "local_part" | "destinations">
> &
  Partial<Omit<Alias, "local_part" | "destinations">>;
