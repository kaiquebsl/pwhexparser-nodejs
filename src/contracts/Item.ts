/**
 * Interface for item types that define their structure and minimum length
 */
export interface Item {
  /**
   * Get the structure definition for this item type
   * @returns Object mapping field names to their data types
   */
  getStructure(): Record<string, string>;

  /**
   * Get the minimum hex string length required for this item type
   * @returns Minimum length in characters
   */
  getMinimumLength(): number;
}
