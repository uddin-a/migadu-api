export type Mailbox = {
  /**
   * Full email address containing the internal and the domain name.
   * ex: john@domain.com
   */
  readonly address: string;
  expireable: boolean;
  expires_on: null | string;
  remove_upon_expiry: boolean;
  is_active: boolean;
  readonly activated_at: string | null;
  readonly last_login_at: string | null;
  autorespond_active: null;
  /**
   * This field contains a custom autoresponder message.
   */
  autorespond_body?: string;
  autorespond_expires_on: string | null;
  /**
   * Subject line for the autoresponder message.
   * ex: Autoreply: {{subject}}
   */
  autorespond_subject?: string;
  delegations: [];
  /**
   * Domain name of the mailbox. This value is what comes after the '@' symbol.
   * ex: let's say you want to create a mailbox as the following value
   * 'john@domain.com', this field should contain the string 'domain.com'.
   */
  readonly domain_name: string;
  identities: Identity[];
  /**
   * Local part of the mailbox. This value is what comes before the '@' symbol.
   * ex: let's say you want to create a mailbox as the following value
   * 'john@domain.com', this field should contain the string 'john'.
   */
  local_part: string;
  may_access_imap: boolean;
  may_access_managesieve: boolean;
  may_access_pop3: boolean;
  may_receive: boolean;
  may_send: boolean;
  is_internal: boolean;
  /**
   * Name of the mailbox
   */
  name: string;
  /**
   * Email address to which password recovery emails will be sent.
   */
  password_recovery_email: string;
  password_method?: "invitation" | "password";
  password: string;
  recipient_denylist: string[];
  sender_allowlist: string[];
  sender_denylist: string[];
  spam_action: "folder" | "none" | "subject" | "drop";
  spam_aggressiveness:
    | "default"
    | "most_permissive"
    | "more_permissive"
    | "permissive"
    | "strict"
    | "stricter"
    | "strictest";
  storage_usage: number;
  changed_at: string | null;
  forwardings: Forwarding[];
};

export type Identity = {
  readonly local_part: string;
  readonly domain: string;
  readonly address: string;
  name: string;
  may_send: Boolean;
  may_receive: Boolean;
  may_access_imap: Boolean;
  may_access_pop3: Boolean;
  may_access_managesieve: Boolean;
  password?: string;
  password_use?: "custom" | "mailbox";
};

export type Forwarding = {
  readonly address: string;
  readonly blocked_at: string;
  readonly confirmation_sent_at: string;
  readonly confirmed_at: string;
  expires_on: Date;
  is_active: Boolean;
  remove_upon_expiry: Boolean;
};

export type Alias = {
  address: string;
  local_part: string;
  readonly domain_name: string;
  is_internal: Boolean;
  destinations: string[];
  expireable: boolean;
  expires_on: string | null;
  remove_upon_expiry: boolean;
};

export type Rewrite = {
  name: string;
  local_part_rule: string;
  order_num: number;
  /**
   * The destination is the local_parts (whitout the `@` part).
   * This is a simple string containing local_parts separated by commas when
   * 'CREATING' and 'UPDATING'.
   *
   * ex :
   *
   * ```typescript
   * destination: "aa,bb,cc,dd"
   * ```
   *
   * When viewing recieved data, this will be an array of 'string'.
   */
  destinations: string;
};

export interface Migadu500Error {
  error: string;
}

export type Migadu400Error = "Not Found";
