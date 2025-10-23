import { Translate } from './contracts/Translate.js';
import { Mask } from './Mask.js';
import { Unequippable } from './types/Unequippable.js';

/**
 * Main decoder class for parsing PW hexadecimal strings
 */
export class Decoder {
  private position: number = 0;
  private hexString: string = '';
  private parsedHex: string = '';
  private lang: string = 'pt-BR';
  private nameLength: number = 0;
  private socketsCount: number = 0;
  private addonsCount: number = 0;
  private skillsCount: number = 0;
  private itemType: Translate | null = null;

  // Constants
  private static readonly INT8_SIZE = 2;
  private static readonly INT32_SIZE = 4;
  private static readonly INT64_SIZE = 8;
  private static readonly MAX_SOCKETS_COUNT = 4;
  private static readonly ATTACK_RATE_FACTOR = 20;
  private static readonly SPECIAL_ADDON_ID = 4;
  private static readonly SOCKET_ADDON_ID = 'a';
  private static readonly DURABILITY_DIVIDER = 100;

  /**
   * Set the hex string to decode
   * @param hexString The hexadecimal string to decode
   */
  public setHexString(hexString: string): void {
    this.hexString = hexString;
  }

  /**
   * Set the language for translations
   * @param lang Language code (default: 'pt-BR')
   */
  public setLang(lang: string = 'pt-BR'): void {
    this.lang = lang;
    if (this.itemType) {
      this.itemType.setLang(lang);
    }
  }

  /**
   * Get translated structure with values
   * @returns Object with translated field names and values
   */
  public translate(): Record<string, any> {
    try {
      const structure = this.itemType?.getTranslatedStructure();
      const values = this.decode();
      const result: Record<string, any> = {};

      if (!structure) {
        throw new Error('Item type not set');
      }

      for (const [field, translatedField] of Object.entries(structure)) {
        if (Array.isArray(translatedField)) {
          const translatedObj = translatedField as any;
          if (
            translatedObj['name'] &&
            translatedObj['values'] &&
            translatedObj['values'][0] &&
            translatedObj['values'][1] &&
            values[translatedObj['values'][0]] !== undefined &&
            values[translatedObj['values'][1]] !== undefined
          ) {
            result[field] = {
              translated: translatedObj['name'],
              value: values[translatedObj['values'][0]] + translatedObj['separator'] + values[translatedObj['values'][1]]
            };
          } else {
            throw new Error('Invalid structure or missing values for translation');
          }
        } else {
          if (values[field] !== undefined) {
            result[field] = {
              translated: translatedField,
              value: values[field]
            };
          } else {
            throw new Error(`Missing value for field: ${field}`);
          }
        }
      }

      return result;
    } catch (error) {
      return { error: (error as Error).message };
    }
  }

  /**
   * Get the current hex string
   * @returns The hex string being decoded
   */
  public getHexString(): string {
    return this.hexString;
  }

  /**
   * Validate if the item type is valid
   * @param type The item type to validate
   * @returns True if valid, false otherwise
   */
  private validateItemType(type: string): boolean {
    const equipmentTypes = Mask.getEquipmentTypes();
    return Object.values(equipmentTypes).includes(type) || type === 'Property' || type === 'Skill';
  }

  /**
   * Set the item type for decoding
   * @param itemType The item type name
   */
  public async setItemType(itemType: string): Promise<void> {
    if (!this.validateItemType(itemType) && itemType !== 'Property' && itemType !== 'Skill') {
      throw new Error(`Invalid item type: ${itemType}`);
    }

    // Dynamic import of the item type class
    const itemTypeClass = await this.getItemTypeClass(itemType);
    this.itemType = new itemTypeClass();
    this.itemType.setLang(this.lang);
  }

  /**
   * Get the item type class dynamically
   * @param itemType The item type name
   * @returns The item type class constructor
   */
  private async getItemTypeClass(itemType: string): Promise<new () => Translate> {
    const typeMap: Record<string, () => Promise<new () => Translate>> = {
      'Weapon': async () => (await import('./types/Weapon.js')).Weapon,
      'Armor': async () => (await import('./types/Armor.js')).Armor,
      'Fashion': async () => (await import('./types/Fashion.js')).Fashion,
      'Jewelry': async () => (await import('./types/Jewelry.js')).Jewelry,
      'Flight': async () => (await import('./types/Flight.js')).Flight,
      'Pet': async () => (await import('./types/Pet.js')).Pet,
      'Ammo': async () => (await import('./types/Ammo.js')).Ammo,
      'AttackCharm': async () => (await import('./types/AttackCharm.js')).AttackCharm,
      'Bible': async () => (await import('./types/Bible.js')).Bible,
      'Card': async () => (await import('./types/Card.js')).Card,
      'Genie': async () => (await import('./types/Genie.js')).Genie,
      'BlessBox': async () => (await import('./types/BlessBox.js')).BlessBox,
      'Bugle': async () => (await import('./types/Bugle.js')).Bugle,
      'DynSkill': async () => (await import('./types/DynSkill.js')).DynSkill,
      'ForceTicket': async () => (await import('./types/ForceTicket.js')).ForceTicket,
      'HpAddon': async () => (await import('./types/HpAddon.js')).HpAddon,
      'MpAddon': async () => (await import('./types/MpAddon.js')).MpAddon,
      'PetFood': async () => (await import('./types/PetFood.js')).PetFood,
      'Potion': async () => (await import('./types/Potion.js')).Potion,
      'Property': async () => (await import('./types/Property.js')).Property,
      'Skill': async () => (await import('./types/Skill.js')).Skill,
      'SoulStone': async () => (await import('./types/SoulStone.js')).SoulStone,
      'StallCard': async () => (await import('./types/StallCard.js')).StallCard,
      'TaskDice': async () => (await import('./types/TaskDice.js')).TaskDice,
      'Acessory': async () => (await import('./types/Acessory.js')).Acessory,
      'Unequippable': async () => (await import('./types/Unequippable.js')).Unequippable,
    };

    const loader = typeMap[itemType] || typeMap['Unequippable'];
    return await loader();
  }

  /**
   * Guess the item type from mask
   * @param mask The mask value
   */
  public async guessItemType(mask: number): Promise<void> {
    const type = Mask.getEquipmentTypeFromMask(mask);
    await this.setItemType(type);
  }

  /**
   * Get the current item type
   * @returns The item type instance
   */
  public getItemType(): Translate | null {
    return this.itemType;
  }

  /**
   * Validate the hex string and item type
   * @param error Error message reference
   * @returns True if valid, false otherwise
   */
  private validateHex(error: { message: string }): boolean {
    if (!this.hexString) {
      error.message = `Hex string not set, please use setHexString(). Item type: ${this.itemType?.constructor.name || 'Unknown'}`;
      return false;
    }

    if (!/^[0-9a-fA-F]+$/.test(this.hexString)) {
      error.message = `Invalid hexadecimal string for type ${this.itemType?.constructor.name || 'Unknown'}`;
      return false;
    }

    if (!this.itemType) {
      error.message = 'Item type not set, please use setItemType() method before calling decode()';
      return false;
    }

    if (this.hexString.length < this.itemType.getMinimumLength()) {
      error.message = `Hex string is too short for ${this.itemType.constructor.name}, given: ${this.hexString.length}, expected: ${this.itemType.getMinimumLength()}`;
      return false;
    }

    return true;
  }

  /**
   * Decode the hex string into structured data
   * @returns Decoded data object
   */
  public decode(): Record<string, any> {
    if (this.itemType instanceof Unequippable) {
      return {};
    }

    try {
      const error = { message: '' };

      if (!this.validateHex(error)) {
        return {
          error: `Error while validating hex: ${error.message}`
        };
      }

      const structure = this.itemType!.getStructure();
      const result = this.decodeStructure(structure);

      return result;
    } catch (error) {
      return {
        error: `Exception while decoding hex: ${(error as Error).message}`
      };
    }
  }

  /**
   * Decode the structure based on field definitions
   * @param structure The structure definition
   * @returns Decoded data object
   */
  private decodeStructure(structure: Record<string, string>): Record<string, any> {
    const result: Record<string, any> = {};

    for (const [field, type] of Object.entries(structure)) {
      if (Array.isArray(type)) {
        const count = this.decodeType('', 'int64');
        const keys = structure[field];

        for (let i = 0; i < count; i++) {
          const item: Record<string, any> = {};
          for (const [key, keyType] of Object.entries(keys)) {
            item[key] = this.decodeType(key, keyType);
          }
          result[field] = result[field] || [];
          result[field].push(item);
        }
        
        continue;
      }

      result[field] = this.decodeType(field, type);
    }

    return result;
  }

  /**
   * Debug the hex string parsing
   * @returns Debug information for each field
   */
  public debugHexString(): Record<string, any> {
    if (this.itemType instanceof Unequippable) {
      return {};
    }

    const error = { message: '' };

    if (!this.validateHex(error)) {
      return {
        error: `Error while validating hex for debug: ${error.message}`
      };
    }

    const result: Record<string, any> = {};

    for (const [field, type] of Object.entries(this.itemType!.getStructure())) {
      result[field] = {
        pos: this.position,
        value: this.decodeType(field, type),
        hex: this.parsedHex,
      };
    }

    return result;
  }

  /**
   * Decode a specific type from the hex string
   * @param field The field name
   * @param type The data type
   * @param prefixToRemove Prefix to remove from the value
   * @returns Decoded value
   */
  private decodeType(field: string, type: string, prefixToRemove: number = 0): any {
    switch (type) {
      case 'addons_count':
        return this.getAddonsCount(field);
      case 'addons':
        return this.getAddons();
      case 'sockets_count':
        return this.getSocketsCount(field);
      case 'sockets':
        return this.getSockets();
      case 'name':
        return this.getName();
      case 'pack_name':
        return this.packName();
      case 'skills':
        return this.getSkills(field);
      case 'skills_count':
        return this.getSkillsCount(field);
      case 'attack_rate':
        return this.getAttackRate(field);
      case 'name_length':
        return this.getNameLength(field);
      case 'durability':
        return this.getDurability(field);
      case 'int32':
        {
          const hex = this.hexString.substring(this.position, this.position + Decoder.INT32_SIZE);
          this.parsedHex = hex;
          this.position += Decoder.INT32_SIZE;
          return this.hexToDecimal(hex, Decoder.INT32_SIZE, prefixToRemove, true);
        }
      case 'int64':
        {
          const hex = this.hexString.substring(this.position, this.position + Decoder.INT64_SIZE);
          this.parsedHex = hex;
          this.position += Decoder.INT64_SIZE;
          return this.hexToDecimal(hex, Decoder.INT64_SIZE, prefixToRemove, true);
        }
      case 'short':
        {
          const hex = this.hexString.substring(this.position, this.position + Decoder.INT8_SIZE);
          this.parsedHex = hex;
          const value = this.hexToDecimal(hex, Decoder.INT8_SIZE, prefixToRemove, true);
          this.position += Decoder.INT8_SIZE;
          return value;
        }
      case 'float':
        {
          const hex = this.hexString.substring(this.position, this.position + Decoder.INT64_SIZE);
          this.parsedHex = hex;
          this.position += Decoder.INT64_SIZE;
          return this.toFloat(hex);
        }
      default:
        return 0;
    }
  }

  /**
   * Get skills count
   * @param field The field name
   * @returns Skills count
   */
  private getSkillsCount(field: string): number {
    this.skillsCount = this.decodeType(field, 'int32');
    this.position += (Decoder.INT32_SIZE * 4);
    return this.skillsCount;
  }

  /**
   * Get skills array
   * @param field The field name
   * @returns Skills array
   */
  private getSkills(field: string): any[] {
    const skills: any[] = [];

    for (let i = 0; i < this.skillsCount; i++) {
      const skillPos = this.position + (Decoder.INT32_SIZE * 4) + (i * (Decoder.INT32_SIZE * 4));

      const skill = {
        id: this.hexToDecimal(this.hexString.substring(skillPos, skillPos + Decoder.INT64_SIZE), Decoder.INT64_SIZE, 0, true),
        level: this.hexToDecimal(this.hexString.substring(skillPos + Decoder.INT64_SIZE, skillPos + Decoder.INT64_SIZE + Decoder.INT64_SIZE), Decoder.INT64_SIZE, 0, true),
      };

      skills.push(skill);
    }

    return skills;
  }

  /**
   * Get the name from hex string
   * @returns The decoded name
   */
  private getName(): string {
    let name = '';
    const nameLength = this.nameLength / 2;

    for (let i = 0; i < nameLength; i++) {
      const charCode = this.hexToDecimal(this.hexString.substring(this.position + i * Decoder.INT32_SIZE, this.position + i * Decoder.INT32_SIZE + 2), 2, 0, true);
      name += String.fromCharCode(charCode);
    }

    this.position += nameLength * Decoder.INT32_SIZE;
    return name;
  }

  /**
   * Get packed name from hex string
   * @returns The decoded packed name
   */
  private packName(): string {
    let name = '';
    const initialPos = this.position + Decoder.INT32_SIZE;

    for (let i = 0; i < this.nameLength; i++) {
      const parsedHex = this.hexString.substring(initialPos + i * Decoder.INT32_SIZE + Decoder.INT8_SIZE, initialPos + i * Decoder.INT32_SIZE + Decoder.INT8_SIZE + Decoder.INT8_SIZE);
      name += Buffer.from(parsedHex, 'hex').toString('utf8');
    }

    this.position += Decoder.INT8_SIZE;
    return name;
  }

  /**
   * Get addons count
   * @param field The field name
   * @returns Addons count
   */
  private getAddonsCount(field: string): number {
    this.addonsCount = this.decodeType(field, 'int64');

    if (this.addonsCount > 30) {
      throw new Error(`Invalid addons count, max value is 30, got ${this.addonsCount} instead`);
    }

    return this.addonsCount;
  }

  /**
   * Get addons array
   * @returns Addons object with different types
   */
  private getAddons(): Record<string, any[]> {
    const addons: Record<string, any[]> = {
      special_addons: [],
      normal_addons: [],
      refine_addons: [],
      socket_addons: [],
    };

    if (this.addonsCount <= 0) {
      return addons;
    }

    let socketIndex = 0;
    let shift = 0;

    for (let i = 0; i < this.addonsCount; i++) {
      const addonPos = this.position + i * (Decoder.INT32_SIZE * 4) + shift;
      let hexString = this.hexString.substring(addonPos, addonPos + Decoder.INT64_SIZE);
      hexString = this.reverseHexNumber(hexString).replace(/^0+/, '');

      if (hexString.length % 2 !== 0) {
        continue;
      }

      hexString = hexString.trim();
      const addonType = hexString.substring(0, 1);

      if (addonType === Decoder.SPECIAL_ADDON_ID.toString()) {
        const addonId = this.hexToDecimal(hexString, Decoder.INT64_SIZE, parseInt(addonType), false);
        const addon = {
          id: addonId,
          value: this.hexToDecimal(this.hexString.substring(addonPos + Decoder.INT64_SIZE, addonPos + Decoder.INT64_SIZE + Decoder.INT64_SIZE), Decoder.INT64_SIZE, 0, true),
          level: this.hexToDecimal(this.hexString.substring(addonPos + (Decoder.INT32_SIZE * 4), addonPos + (Decoder.INT32_SIZE * 4) + Decoder.INT64_SIZE), Decoder.INT64_SIZE, 0, true),
        };

        if (addonId > 1691 && addonId < 1892) {
          addons.refine_addons.push(addon);
        } else {
          addons.special_addons.push(addon);
        }

        shift += Decoder.INT64_SIZE;
      } else if (addonType === Decoder.SOCKET_ADDON_ID) {
        socketIndex++;
        const addonId = this.hexToDecimal(hexString, Decoder.INT64_SIZE, parseInt(addonType), false);
        const socketAddon = {
          index: socketIndex,
          id: addonId,
          value: this.hexToDecimal(this.hexString.substring(addonPos + Decoder.INT64_SIZE, addonPos + Decoder.INT64_SIZE + Decoder.INT64_SIZE), Decoder.INT64_SIZE, 0, true),
        };

        addons.socket_addons.push(socketAddon);
      } else {
        const addonId = parseInt(hexString.substring(1), 16);
        const addon = {
          id: addonId,
          value: parseInt(this.hexToDecimal(this.hexString.substring(addonPos + Decoder.INT64_SIZE, addonPos + Decoder.INT64_SIZE + Decoder.INT64_SIZE), Decoder.INT64_SIZE, 0, true).toString(), 10),
        };

        addons.normal_addons.push(addon);
      }
    }

    return addons;
  }

  /**
   * Get sockets count
   * @param field The field name
   * @returns Sockets count
   */
  private getSocketsCount(field: string): number {
    this.socketsCount = this.decodeType(field, 'int32');
    this.position += Decoder.INT32_SIZE;
    return this.socketsCount;
  }

  /**
   * Get sockets array
   * @returns Sockets array
   */
  private getSockets(): number[] {
    const sockets: number[] = [];

    if (this.socketsCount <= 0) {
      return sockets;
    }

    if (this.socketsCount > Decoder.MAX_SOCKETS_COUNT) {
      throw new Error(`Invalid sockets count, max value is ${Decoder.MAX_SOCKETS_COUNT}, got ${this.socketsCount} instead`);
    }

    for (let i = 0; i < this.socketsCount; i++) {
      const hex = this.position + i * Decoder.INT64_SIZE;
      const hexString = this.hexString.substring(hex, hex + Decoder.INT64_SIZE);
      sockets[i] = this.decodeType(hexString, 'int64');
    }

    return sockets;
  }

  /**
   * Get attack rate
   * @param field The field name
   * @returns Attack rate
   */
  private getAttackRate(field: string): number {
    const attackRate = this.decodeType(field, 'int64');
    if (attackRate <= 0) {
      return 0;
    }

    const rate = Decoder.ATTACK_RATE_FACTOR / attackRate;
    return Math.round(rate * 100) / 100;
  }

  /**
   * Get name length
   * @param field The field name
   * @returns Name length in bytes
   */
  private getNameLength(field: string): number {
    const nameLength = this.decodeType(field, 'short');
    this.nameLength = nameLength;
    return nameLength;
  }

  /**
   * Get durability
   * @param field The field name
   * @returns Durability value
   */
  private getDurability(field: string): number {
    const durability = this.decodeType(field, 'int64');
    return Math.floor(durability / Decoder.DURABILITY_DIVIDER);
  }

  /**
   * Reverse hex number
   * @param number The hex number to reverse
   * @returns Reversed hex number
   */
  private reverseHexNumber(number: string): string {
    const pairs = number.match(/.{2}/g) || [];
    return pairs.reverse().join('');
  }

  /**
   * Convert hex to float
   * @param hex The hex string
   * @returns Float value
   */
  private toFloat(hex: string): number {
    const buffer = Buffer.from(hex, 'hex');
    const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);
    return view.getFloat32(0, true); // little-endian
  }

  /**
   * Convert hex to decimal
   * @param hexString The hex string
   * @param expectedLength Expected length
   * @param prefixToRemove Prefix to remove
   * @param reverse Whether to reverse the hex
   * @returns Decimal value
   */
  private hexToDecimal(hexString: string, expectedLength: number, prefixToRemove: number | null, reverse: boolean): number {
    const paddingLength = expectedLength - hexString.length;
    hexString = hexString.padStart(paddingLength, '0');

    if (reverse) {
      hexString = this.reverseHexNumber(hexString);
    }

    if (!hexString || !/^[0-9a-fA-F]+$/.test(hexString)) {
      return 0;
    }

    if (prefixToRemove !== null && prefixToRemove !== 0 && hexString.startsWith(prefixToRemove.toString())) {
      hexString = hexString.substring(1);
    }

    return parseInt(hexString, 16);
  }

  /**
   * Reset the decoder state
   */
  public reset(): void {
    this.position = 0;
    this.hexString = '';
    this.parsedHex = '';
    this.nameLength = 0;
    this.socketsCount = 0;
    this.addonsCount = 0;
    this.skillsCount = 0;
  }
}
