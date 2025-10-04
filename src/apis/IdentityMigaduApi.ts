import { MigaduApiBase} from "../MigaduApiBase";
import { IdentityApi, MethodPropsType } from "../types/migaduApiBaseTypes";

/**
 * A wrapper arround MigaduBase class to represent the **identity** endpoint.
 *
 * This classes has the following methods :
 * - get
 * - getAll
 * - create
 * - update
 * - delete
 */
export class IdentityMigaduApi extends MigaduApiBase<
  IdentityApi,
  Pick<MethodPropsType, "mailboxes">
> {
  protected readonly apiType = "identities" as const;

  /**
   * Retrieves a specific identity
   * @param name - Email address of the identity to retrieve
   * @param extraPathData - Path parameters
   * @param extraPathData.mailboxes - The mailbox email address this identity belongs to
   * @returns Promise resolving to the identity data
   */
  public async get(
    name: string,
    extraPathData: Pick<MethodPropsType, "mailboxes">
  ): Promise<IdentityApi["GetReturnType"]> {
    return super.get(name, extraPathData);
  }

  /**
   * Retrieves all identities for a mailbox
   * @param extraPathData - Path parameters
   * @param extraPathData.mailboxes - The mailbox email address to get identities for
   * @returns Promise resolving to an array of identity data
   */
  public async getAll(
    extraPathData: Pick<MethodPropsType, "mailboxes">
  ): Promise<IdentityApi["GetAllReturnType"]> {
    return super.getAll(extraPathData);
  }

  /**
   * Creates a new identity for a mailbox
   * @param data - Identity creation data
   * @param data.local_part - The local part of the identity email address (before @)
   * @param data.name - Display name for the identity
   * @param data.may_send - Whether this identity can send emails
   * @param data.may_receive - Whether this identity can receive emails
   * @param data.may_access_imap - Whether IMAP access is allowed for this identity
   * @param data.may_access_pop3 - Whether POP3 access is allowed for this identity
   * @param data.may_access_managesieve - Whether ManageSieve access is allowed for this identity
   * @param extraPathData - Path parameters
   * @param extraPathData.mailboxes - The mailbox email address this identity belongs to
   * @returns Promise resolving to the created identity data
   */
  public async create(
    data: IdentityApi["CreateRequestDataType"],
    extraPathData: Pick<MethodPropsType, "mailboxes">
  ): Promise<IdentityApi["CreateReturnType"]> {
    return super.create(data, extraPathData);
  }

  /**
   * Updates an existing identity
   * @param name - Email address of the identity to update
   * @param data - Partial identity data to update
   * @param data.name - Display name (optional)
   * @param data.may_send - Whether identity can send emails (optional)
   * @param data.may_receive - Whether identity can receive emails (optional)
   * @param data.may_access_imap - Whether IMAP access is allowed (optional)
   * @param data.may_access_pop3 - Whether POP3 access is allowed (optional)
   * @param data.may_access_managesieve - Whether ManageSieve access is allowed (optional)
   * @param extraPathData - Path parameters
   * @param extraPathData.mailboxes - The mailbox email address this identity belongs to
   * @returns Promise resolving to the updated identity data
   */
  public async update(
    name: string,
    data: IdentityApi["UpdateRequestDataType"],
    extraPathData: Pick<MethodPropsType, "mailboxes">
  ): Promise<IdentityApi["UpdateReturnType"]> {
    return super.update(name, data, extraPathData);
  }

  /**
   * Deletes an identity
   * @param name - Email address of the identity to delete
   * @param extraPathData - Path parameters
   * @param extraPathData.mailboxes - The mailbox email address this identity belongs to
   * @returns Promise resolving to the deleted identity data
   */
  public async delete(
    name: string,
    extraPathData: Pick<MethodPropsType, "mailboxes">
  ): Promise<IdentityApi["DeleteReturnType"]> {
    return super.delete(name, extraPathData);
  }
}