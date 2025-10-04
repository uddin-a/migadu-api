import {
    MailboxCreateRequestType,
    MailboxReturnType,
    IdentityReturnType,
    IdentityCreateRequest,
    AliasCreateRequestType
} from "./requestTypes";
import { Mailbox, Identity, Forwarding, Alias, Rewrite } from "./types";

export interface MailboxApi {
  readonly apiType: "mailboxes";
  GetReturnType: Omit<Mailbox, "password" | "password_method">;
  GetAllReturnType: Omit<Mailbox, "password" | "password_method">[];
  CreateRequestDataType: MailboxCreateRequestType;
  CreateReturnType: MailboxReturnType;
  UpdateRequestDataType: Partial<
    Omit<Mailbox, "address" | "is_active" | "domain_name" | "local_part">
  >;
  UpdateReturnType: MailboxReturnType;
  DeleteReturnType: MailboxReturnType;
}
export interface IdentityApi {
  readonly apiType: "identities";
  GetReturnType: IdentityReturnType;
  GetAllReturnType: IdentityReturnType[];
  CreateRequestDataType: IdentityCreateRequest;
  CreateReturnType: IdentityReturnType;
  UpdateRequestDataType: Partial<Omit<Identity, "local_part" | "address">>;
  UpdateReturnType: IdentityReturnType;
  DeleteReturnType: IdentityReturnType;
}
export interface ForwardingApi {
  readonly apiType: "forwardings";
  GetReturnType: Forwarding;
  GetAllReturnType: Forwarding[];
  CreateRequestDataType: Partial<Omit<Forwarding, "address">> &
    Required<Pick<Forwarding, "address">>;
  CreateReturnType: Forwarding;
  UpdateRequestDataType: Partial<
    Omit<Forwarding, "blocked_at" | "confirmation_sent_at" | "confirmed_at">
  >;
  UpdateReturnType: Forwarding;
  DeleteReturnType: Forwarding;
}
export interface AliasApi {
  readonly apiType: "aliases";
  GetReturnType: Alias;
  GetAllReturnType: Alias[];
  CreateRequestDataType: AliasCreateRequestType;
  CreateReturnType: Alias;
  UpdateRequestDataType: Partial<
    Omit<Alias, "address" | "domain_name" | "expireable">
  >;
  UpdateReturnType: Alias;
  DeleteReturnType: Alias;
}

export interface RewriteApi {
  readonly apiType: "rewrites";
  GetReturnType: Rewrite;
  GetAllReturnType: Rewrite[];
  CreateRequestDataType: Partial<Pick<Rewrite, "order_num">> &
    Required<Omit<Rewrite, "order_num">>;
  CreateReturnType: Rewrite;
  UpdateRequestDataType: Partial<Rewrite>;
  UpdateReturnType: Rewrite;
  DeleteReturnType: Rewrite;
}

export type MigaduApiType =
  | MailboxApi
  | IdentityApi
  | ForwardingApi
  | AliasApi
  | RewriteApi;

export type MethodPropsType = Record<MigaduApiType["apiType"], string>;
