import { MigaduApiBase} from "../MigaduApiBase";
import { RewriteApi } from "../types/migaduApiBaseTypes";

/**
 * A wrapper arround MigaduBase class to represent the **rewrite** endpoint.
 *
 * This classes has the following methods :
 * - get
 * - getAll
 * - create
 * - update
 * - delete
 */
export class RewriteMigaduApi extends MigaduApiBase<RewriteApi, void> {
  protected readonly apiType = "rewrites" as const;
  
  /**
   * Retrieves a specific rewrite rule by name
   * @param name - Name/identifier of the rewrite rule to retrieve
   * @param extraPathData - Not used for rewrite API (pass empty object {})
   * @returns Promise resolving to the rewrite rule data
   */
  public async get(
    name: string,
    extraPathData: void
  ): Promise<RewriteApi["GetReturnType"]> {
    return super.get(name, extraPathData);
  }

  /**
   * Retrieves all rewrite rules for the domain
   * @param extraPathData - Not used for rewrite API (pass empty object {})
   * @returns Promise resolving to an array of rewrite rule data
   */
  public async getAll(
    extraPathData: void
  ): Promise<RewriteApi["GetAllReturnType"]> {
    return super.getAll(extraPathData);
  }

  /**
   * Creates a new rewrite rule
   * @param data - Rewrite creation data
   * @param data.name - Name/identifier for the rewrite rule
   * @param data.local_part_rule - Rule for matching the local part of email addresses
   * @param data.local_part_rewrite - How to rewrite the matched local part
   * @param data.order_num - Order number for rule precedence (optional, will be auto-assigned if not provided)
   * @param extraPathData - Not used for rewrite API (pass empty object {})
   * @returns Promise resolving to the created rewrite data
   */
  public async create(
    data: RewriteApi["CreateRequestDataType"],
    extraPathData: void
  ): Promise<RewriteApi["CreateReturnType"]> {
    return super.create(data, extraPathData);
  }

  /**
   * Updates an existing rewrite rule
   * @param name - Name/identifier of the rewrite rule to update
   * @param data - Partial rewrite data to update
   * @param data.name - Name/identifier for the rewrite rule (optional)
   * @param data.local_part_rule - Rule for matching the local part (optional)
   * @param data.local_part_rewrite - How to rewrite the matched local part (optional)
   * @param data.order_num - Order number for rule precedence (optional)
   * @param extraPathData - Not used for rewrite API (pass empty object {})
   * @returns Promise resolving to the updated rewrite data
   */
  public async update(
    name: string,
    data: RewriteApi["UpdateRequestDataType"],
    extraPathData: void
  ): Promise<RewriteApi["UpdateReturnType"]> {
    return super.update(name, data, extraPathData);
  }

  /**
   * Deletes a rewrite rule
   * @param name - Name/identifier of the rewrite rule to delete
   * @param extraPathData - Not used for rewrite API (pass empty object {})
   * @returns Promise resolving to the deleted rewrite rule data
   */
  public async delete(
    name: string,
    extraPathData: void
  ): Promise<RewriteApi["DeleteReturnType"]> {
    return super.delete(name, extraPathData);
  }
}