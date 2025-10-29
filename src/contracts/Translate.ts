import { Item } from './Item.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Abstract base class for translation support
 */
export abstract class Translate implements Item {
  private lang: string = 'pt-BR';
  private langFilePath: string = '';

  /**
   * Set the language for translations
   * @param lang Language code (default: 'pt-BR')
   */
  public setLang(lang: string = 'pt-BR'): void {
    this.lang = lang;
    this.langFilePath = join(__dirname, '../lang', this.lang, this.getClassFileName() + '.json');

    try {
      // Check if requested language file exists
      readFileSync(this.langFilePath, 'utf8');
    } catch (error) {
      // Fallback to default language when requested one is not available
      const requestedPath = this.langFilePath;
      const fallbackLang = 'pt-BR';
      const fallbackPath = join(
        __dirname,
        '../lang',
        fallbackLang,
        this.getClassFileName() + '.json'
      );

      try {
        readFileSync(fallbackPath, 'utf8');
        this.lang = fallbackLang;
        this.langFilePath = fallbackPath;
      } catch (fallbackError) {
        // If even fallback is missing, surface a clear error
        throw new Error(
          `Language not available. Tried: ${lang} at "${requestedPath}" and fallback ${fallbackLang} at "${fallbackPath}"`
        );
      }
    }
  }

  /**
   * Get the translated structure for this item type
   * @returns Object with translated field names
   */
  public getTranslatedStructure(): Record<string, any> {
    if (!this.langFilePath) {
      throw new Error('Language not set yet, please call setLang() method before calling getTranslatedStructure()!');
    }

    try {
      const content = readFileSync(this.langFilePath, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      throw new Error(`Failed to load translation file: ${this.langFilePath}`);
    }
  }

  /**
   * Get the class filename for this item type
   * @returns Class name as string
   */
  public getClassFileName(): string {
    const self: any = this as any;
    if (typeof self.typeKey === 'string' && self.typeKey.length > 0) {
      return self.typeKey;
    }
    return this.constructor.name;
  }

  /**
   * Get the structure definition for this item type
   * @returns Object mapping field names to their data types
   */
  public getStructure(): Record<string, string> {
    return {};
  }

  /**
   * Get the minimum hex string length required for this item type
   * @returns Minimum length in characters
   */
public getMinimumLength(): number {
    return 0;
  }
}
