/**
 * pwhexparser - TypeScript library for decoding PW's hexadecimal strings
 * 
 * This library provides functionality to decode Perfect World item data from hexadecimal strings
 * based on their predefined structure. It supports all 26 item types with Portuguese (pt-BR) translations.
 * 
 * @example
 * ```typescript
 * import { Decoder, Mask } from 'pwhexparser';
 * 
 * const decoder = new Decoder();
 * await decoder.setItemType('Weapon');
 * decoder.setHexString('1e00000092470100010a620072007500630065000000');
 * const result = decoder.decode();
 * console.log(result);
 * ```
 */

// Main classes
export { Decoder } from './Decoder.js';
export { Mask } from './Mask.js';

// Contracts
export { Item } from './contracts/Item.js';
export { Translate } from './contracts/Translate.js';

// Item types
export { Weapon } from './types/Weapon.js';
export { Armor } from './types/Armor.js';
export { Fashion } from './types/Fashion.js';
export { Jewelry } from './types/Jewelry.js';
export { Flight } from './types/Flight.js';
export { Pet } from './types/Pet.js';
export { Ammo } from './types/Ammo.js';
export { AttackCharm } from './types/AttackCharm.js';
export { Bible } from './types/Bible.js';
export { Card } from './types/Card.js';
export { Genie } from './types/Genie.js';
export { BlessBox } from './types/BlessBox.js';
export { Bugle } from './types/Bugle.js';
export { DynSkill } from './types/DynSkill.js';
export { ForceTicket } from './types/ForceTicket.js';
export { HpAddon } from './types/HpAddon.js';
export { MpAddon } from './types/MpAddon.js';
export { PetFood } from './types/PetFood.js';
export { Potion } from './types/Potion.js';
export { Property } from './types/Property.js';
export { Skill } from './types/Skill.js';
export { SoulStone } from './types/SoulStone.js';
export { StallCard } from './types/StallCard.js';
export { TaskDice } from './types/TaskDice.js';
export { Acessory } from './types/Acessory.js';
export { Unequippable } from './types/Unequippable.js';

// Re-export all types for convenience
export * from './types/index.js';
