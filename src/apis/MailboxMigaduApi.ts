import { MigaduApiBase } from "../MigaduApiBase";
import { MailboxApi } from "../types/migaduApiBaseTypes";

/**
 * A wrapper arround MigaduBase class to represent the **mailbox** endpoint.
 *
 * This classes has the following methods :
 * - get
 * - getAll
 * - create
 * - update
 * - delete
 */
export class MailboxMigaduApi extends MigaduApiBase<MailboxApi, void> {
  protected readonly apiType = "mailboxes" as const;

  /**
   * Retrieves a specific mailbox by email address
   * @param name - Email address of the mailbox to retrieve
   * @param extraPathData - Not used for mailbox API (pass empty object {})
   * @returns Promise resolving to the mailbox data (excluding password information)
   */
  public async get(
    name: string,
    extraPathData: void
  ): Promise<MailboxApi["GetReturnType"]> {
    return super.get(name, extraPathData);
  }

  /**
   * Retrieves all mailboxes for the domain
   * @param extraPathData - Not used for mailbox API (pass empty object {})
   * @returns Promise resolving to an array of mailbox data (excluding password information)
   */
  public async getAll(
    extraPathData: void
  ): Promise<MailboxApi["GetAllReturnType"]> {
    return super.getAll(extraPathData);
  }

  /**
   * Creates a new mailbox
   * @param data - Mailbox creation data
   * @param data.local_part - The local part of the email address (before @)
   * @param data.name - Display name for the mailbox
   * @param data.password - Password for the mailbox
   * @param data.password_method - Password method (e.g., "bcrypt")
   * @param extraPathData - Not used for mailbox API (pass empty object {})
   * @returns Promise resolving to the created mailbox data
   */
  public async create(
    data: MailboxApi["CreateRequestDataType"],
    extraPathData: void
  ): Promise<MailboxApi["CreateReturnType"]> {
    return super.create(data, extraPathData);
  }

  /**
   * Updates an existing mailbox
   * @param name - Email address of the mailbox to update
   * @param data - Partial mailbox data to update
   * @param data.name - Display name (optional)
   * @param data.password - New password (optional)
   * @param data.password_method - Password method (optional)
   * @param data.may_send - Whether mailbox can send emails (optional)
   * @param data.may_receive - Whether mailbox can receive emails (optional)
   * @param data.may_access_imap - Whether IMAP access is allowed (optional)
   * @param data.may_access_pop3 - Whether POP3 access is allowed (optional)
   * @param data.may_access_managesieve - Whether ManageSieve access is allowed (optional)
   * @param extraPathData - Not used for mailbox API (pass empty object {})
   * @returns Promise resolving to the updated mailbox data
   */
  public async update(
    name: string,
    data: MailboxApi["UpdateRequestDataType"],
    extraPathData: void
  ): Promise<MailboxApi["UpdateReturnType"]> {
    return super.update(name, data, extraPathData);
  }


  /**
   * Deletes a mailbox
   * @param name - Email address of the mailbox to delete
   * @param extraPathData - Not used for mailbox API (pass empty object {})
   * @returns Promise resolving to the deleted mailbox data
   */
  public async delete(
    name: string,
    extraPathData: void
  ): Promise<MailboxApi["DeleteReturnType"]> {
    return super.delete(name, extraPathData);
  }
}