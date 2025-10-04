import { MigaduApiBase } from "../MigaduApiBase";
import { AliasApi } from "../types/migaduApiBaseTypes";

/**
 * A wrapper arround MigaduBase class to represent the **alias** endpoint.
 *
 * This classes has the following methods :
 * - get
 * - getAll
 * - create
 * - update
 * - delete
 */
export class AliasMigaduApi extends MigaduApiBase<AliasApi, void> {
  protected readonly apiType = "aliases" as const;

  /**
   * Retrieves a specific alias by email address
   * @param name - Email address of the alias to retrieve
   * @param extraPathData - Not used for alias API (pass empty object {})
   * @returns Promise resolving to the alias data
   */
  public async get(
    name: string,
    extraPathData: void
  ): Promise<AliasApi["GetReturnType"]> {
    return super.get(name, extraPathData);
  }

  /**
   * Retrieves all aliases for the domain
   * @param extraPathData - Not used for alias API (pass empty object {})
   * @returns Promise resolving to an array of alias data
   */
  public async getAll(
    extraPathData: void
  ): Promise<AliasApi["GetAllReturnType"]> {
    return super.getAll(extraPathData);
  }
  
  /**
   * Creates a new alias
   * @param data - Alias creation data
   * @param data.local_part - The local part of the alias email address (before @)
   * @param data.destinations - Array of destination email addresses where emails will be forwarded
   * @param data.expireable - Whether the alias expires (optional)
   * @param data.expire_on - Expiration date if expireable (optional)
   * @param extraPathData - Not used for alias API (pass empty object {})
   * @returns Promise resolving to the created alias data
   */
  public async create(
    data: AliasApi["CreateRequestDataType"],
    extraPathData: void
  ): Promise<AliasApi["CreateReturnType"]> {
    return super.create(data, extraPathData);
  }

  /**
   * Updates an existing alias
   * @param name - Email address of the alias to update
   * @param data - Partial alias data to update
   * @param data.destinations - Array of destination email addresses (optional)
   * @param data.expire_on - Expiration date (optional)
   * @param extraPathData - Not used for alias API (pass empty object {})
   * @returns Promise resolving to the updated alias data
   */
  public async update(
    name: string,
    data: AliasApi["UpdateRequestDataType"],
    extraPathData: void
  ): Promise<AliasApi["UpdateReturnType"]> {
    return super.update(name, data, extraPathData);
  }

  /**
   * Deletes an alias
   * @param name - Email address of the alias to delete
   * @param extraPathData - Not used for alias API (pass empty object {})
   * @returns Promise resolving to the deleted alias data
   */
  public async delete(
    name: string,
    extraPathData: void
  ): Promise<AliasApi["DeleteReturnType"]> {
    return super.delete(name, extraPathData);
  }
}