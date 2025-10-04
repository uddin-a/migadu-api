import { MigaduApiBase } from "../MigaduApiBase";
import { ForwardingApi, MethodPropsType } from "../types/migaduApiBaseTypes";

/**
 * A wrapper arround MigaduBase class to represent the **forward** endpoint.
 *
 * This classes has the following methods :
 * - get
 * - getAll
 * - create
 * - update
 * - delete
 */
export class ForwardingMigaduApi extends MigaduApiBase<
  ForwardingApi,
  Pick<MethodPropsType, "mailboxes">
> {
  protected readonly apiType = "forwardings" as const;

  /**
   * Retrieves a specific forwarding rule
   * @param name - Email address of the forwarding to retrieve
   * @param extraPathData - Path parameters
   * @param extraPathData.mailboxes - The mailbox email address this forwarding belongs to
   * @returns Promise resolving to the forwarding data
   */
  public async get(
    name: string,
    extraPathData: Pick<MethodPropsType, "mailboxes">
  ): Promise<ForwardingApi["GetReturnType"]> {
    return super.get(name, extraPathData);
  }

  /**
   * Retrieves all forwarding rules for a mailbox
   * @param extraPathData - Path parameters
   * @param extraPathData.mailboxes - The mailbox email address to get forwardings for
   * @returns Promise resolving to an array of forwarding data
   */
  public async getAll(
    extraPathData: Pick<MethodPropsType, "mailboxes">
  ): Promise<ForwardingApi["GetAllReturnType"]> {
    return super.getAll(extraPathData);
  }

  /**
   * Creates a new forwarding rule for a mailbox
   * @param data - Forwarding creation data
   * @param data.address - The email address to forward from (required)
   * @param data.destinations - Array of destination email addresses (optional)
   * @param data.expireable - Whether the forwarding expires (optional)
   * @param data.expire_on - Expiration date if expireable (optional)
   * @param extraPathData - Path parameters
   * @param extraPathData.mailboxes - The mailbox email address this forwarding belongs to
   * @returns Promise resolving to the created forwarding data
   */
  public async create(
    data: ForwardingApi["CreateRequestDataType"],
    extraPathData: Pick<MethodPropsType, "mailboxes">
  ): Promise<ForwardingApi["CreateReturnType"]> {
    return super.create(data, extraPathData);
  }

  /**
   * Updates an existing forwarding rule
   * @param name - Email address of the forwarding to update
   * @param data - Partial forwarding data to update
   * @param data.destinations - Array of destination email addresses (optional)
   * @param data.expireable - Whether the forwarding expires (optional)
   * @param data.expire_on - Expiration date if expireable (optional)
   * @param extraPathData - Path parameters
   * @param extraPathData.mailboxes - The mailbox email address this forwarding belongs to
   * @returns Promise resolving to the updated forwarding data
   */
  public async update(
    name: string,
    data: ForwardingApi["UpdateRequestDataType"],
    extraPathData: Pick<MethodPropsType, "mailboxes">
  ): Promise<ForwardingApi["UpdateReturnType"]> {
    return super.update(name, data, extraPathData);
  }

  /**
   * Deletes a forwarding rule
   * @param name - Email address of the forwarding to delete
   * @param extraPathData - Path parameters
   * @param extraPathData.mailboxes - The mailbox email address this forwarding belongs to
   * @returns Promise resolving to the deleted forwarding data
   */
  public async delete(
    name: string,
    extraPathData: Pick<MethodPropsType, "mailboxes">
  ): Promise<ForwardingApi["DeleteReturnType"]> {
    return super.delete(name, extraPathData);
  }
}