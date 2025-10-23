/**
 * Equipment mask constants and utilities for PW items
 */
export class Mask {
  public static readonly WEAPON = 0x00000001;
  public static readonly HEAD = 0x00000002;
  public static readonly NECK = 0x00000004;
  public static readonly SHOULDER = 0x00000008;
  public static readonly BODY = 0x00000010;
  public static readonly WAIST = 0x00000020;
  public static readonly LEG = 0x00000040;
  public static readonly FOOT = 0x00000080;
  public static readonly WRIST = 0x00000100;
  public static readonly FINGER1 = 0x00000200;
  public static readonly FINGER2 = 0x00000400;
  public static readonly PROJECTILE = 0x00000800;
  public static readonly FLYSWORD = 0x00001000;
  public static readonly FASHION_BODY = 0x00002000;
  public static readonly FASHION_LEG = 0x00004000;
  public static readonly FASHION_FOOT = 0x00008000;
  public static readonly FASHION_WRIST = 0x00010000;
  public static readonly ATTACK_RUNE = 0x00020000;
  public static readonly BIBLE = 0x00040000;
  public static readonly BUGLE = 0x00080000;
  public static readonly HP_ADDON = 0x00100000;
  public static readonly MP_ADDON = 0x00200000;
  public static readonly TWEAK = 0x00400000;
  public static readonly ELF = 0x00800000;
  public static readonly STALLCARD = 0x01000000;
  public static readonly FASHION_HEAD = 0x02000000;
  public static readonly FORCE_TICKET = 0x04000000;
  public static readonly DYNSKILL0 = 0x08000000;
  public static readonly DYNSKILL1 = 0x10000000;
  public static readonly FASHION_WEAPON = 0x20000000;
  public static readonly UNUSED1 = 0x40000000;
  public static readonly UNUSED2 = 0x80000000;
  public static readonly GENERALCARD1 = 0x0000000100000000;
  public static readonly GENERALCARD2 = 0x0000000200000000;
  public static readonly GENERALCARD3 = 0x0000000400000000;
  public static readonly GENERALCARD4 = 0x0000000800000000;
  public static readonly GENERALCARD5 = 0x0000001000000000;
  public static readonly GENERALCARD6 = 0x0000002000000000;
  public static readonly CAN_BIND = 0x220DF7FF;
  public static readonly SECURITY_PASSWD_PROTECTED = 0x2205F7FF;
  public static readonly DYNSKILL_ALL = 0x18000000;

  /**
   * Decode a mask value into an array of flag names
   * @param mask The mask value to decode
   * @returns Array of flag names that are set in the mask
   */
  public static decode(mask: number): string[] {
    const constants = this.getConstants();
    const flags: string[] = [];
    let remainingMask = mask;

    for (const [key, value] of Object.entries(constants)) {
      if ((remainingMask & value) === value) {
        flags.push(key);
        remainingMask -= value;
      }
    }

    return flags;
  }

  /**
   * Get equipment type from mask value
   * @param mask The mask value
   * @returns Equipment type name
   */
  public static getEquipmentTypeFromMask(mask: number): string {
    if (mask === 0) {
      return 'Unequippable';
    }

    const maskFlags = this.decode(mask);
    const type = maskFlags[0];

    if (!type || !(type in this.getConstants())) {
      throw new Error(`Invalid mask or type ${type} not defined!`);
    }

    const value = (this.getConstants() as any)[type];
    const equipmentTypes = this.getEquipmentTypes();
    return equipmentTypes[value] || 'Unknown';
  }

  /**
   * Get all equipment types mapping
   * @returns Object mapping mask values to equipment type names
   */
  public static getEquipmentTypes(): Record<number, string> {
    return {
      [this.WEAPON]: 'Weapon',
      [this.HEAD]: 'Armor',
      [this.NECK]: 'Jewelry',
      [this.SHOULDER]: 'Armor',
      [this.BODY]: 'Armor',
      [this.WAIST]: 'Armor',
      [this.LEG]: 'Armor',
      [this.FOOT]: 'Armor',
      [this.WRIST]: 'Armor',
      [this.FINGER1]: 'Jewelry',
      [this.FINGER2]: 'Jewelry',
      [this.PROJECTILE]: 'Ammo',
      [this.FLYSWORD]: 'Flight',
      [this.FASHION_BODY]: 'Fashion',
      [this.FASHION_LEG]: 'Fashion',
      [this.FASHION_FOOT]: 'Fashion',
      [this.FASHION_WRIST]: 'Fashion',
      [this.ATTACK_RUNE]: 'AttackCharm',
      [this.BIBLE]: 'Bible',
      [this.BUGLE]: 'Bugle',
      [this.HP_ADDON]: 'HpAddon',
      [this.MP_ADDON]: 'MpAddon',
      [this.TWEAK]: 'Armor',
      [this.ELF]: 'Genie',
      [this.STALLCARD]: 'StallCard',
      [this.FASHION_HEAD]: 'Fashion',
      [this.FORCE_TICKET]: 'ForceTicket',
      [this.DYNSKILL0]: 'DynSkill',
      [this.DYNSKILL1]: 'DynSkill',
      [this.FASHION_WEAPON]: 'Fashion',
      [this.UNUSED1]: 'Unequippable',
      [this.UNUSED2]: 'Unequippable',
      [this.GENERALCARD1]: 'Card',
      [this.GENERALCARD2]: 'Card',
      [this.GENERALCARD3]: 'Card',
      [this.GENERALCARD4]: 'Card',
      [this.GENERALCARD5]: 'Card',
      [this.GENERALCARD6]: 'Card',
      [this.CAN_BIND]: 'Unequippable',
      [this.SECURITY_PASSWD_PROTECTED]: 'Unequippable',
      [this.DYNSKILL_ALL]: 'DynSkill',
    };
  }

  /**
   * Get all mask constants
   * @returns Object with all mask constants
   */
  private static getConstants(): Record<string, number> {
    return {
      WEAPON: this.WEAPON,
      HEAD: this.HEAD,
      NECK: this.NECK,
      SHOULDER: this.SHOULDER,
      BODY: this.BODY,
      WAIST: this.WAIST,
      LEG: this.LEG,
      FOOT: this.FOOT,
      WRIST: this.WRIST,
      FINGER1: this.FINGER1,
      FINGER2: this.FINGER2,
      PROJECTILE: this.PROJECTILE,
      FLYSWORD: this.FLYSWORD,
      FASHION_BODY: this.FASHION_BODY,
      FASHION_LEG: this.FASHION_LEG,
      FASHION_FOOT: this.FASHION_FOOT,
      FASHION_WRIST: this.FASHION_WRIST,
      ATTACK_RUNE: this.ATTACK_RUNE,
      BIBLE: this.BIBLE,
      BUGLE: this.BUGLE,
      HP_ADDON: this.HP_ADDON,
      MP_ADDON: this.MP_ADDON,
      TWEAK: this.TWEAK,
      ELF: this.ELF,
      STALLCARD: this.STALLCARD,
      FASHION_HEAD: this.FASHION_HEAD,
      FORCE_TICKET: this.FORCE_TICKET,
      DYNSKILL0: this.DYNSKILL0,
      DYNSKILL1: this.DYNSKILL1,
      FASHION_WEAPON: this.FASHION_WEAPON,
      UNUSED1: this.UNUSED1,
      UNUSED2: this.UNUSED2,
      GENERALCARD1: this.GENERALCARD1,
      GENERALCARD2: this.GENERALCARD2,
      GENERALCARD3: this.GENERALCARD3,
      GENERALCARD4: this.GENERALCARD4,
      GENERALCARD5: this.GENERALCARD5,
      GENERALCARD6: this.GENERALCARD6,
      CAN_BIND: this.CAN_BIND,
      SECURITY_PASSWD_PROTECTED: this.SECURITY_PASSWD_PROTECTED,
      DYNSKILL_ALL: this.DYNSKILL_ALL,
    };
  }
}
