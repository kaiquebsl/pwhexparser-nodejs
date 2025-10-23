import { Translate } from '../contracts/Translate.js';

export class Weapon extends Translate {
  public getStructure(): Record<string, string> {
    return {
      'level': 'int32',
      'class': 'int32',
      'strength': 'int32',
      'vitality': 'int32',
      'dexterity': 'int32',
      'magic': 'int32',
      'min_durability': 'durability',
      'max_durability': 'durability',
      'item_type': 'int32',
      'item_flag': 'short',
      'name_length': 'name_length',
      'name': 'name',
      'ranged_type': 'int64',
      'weapon_type': 'int64',
      'weapon_grade': 'int64',
      'ammunition_type': 'int64',
      'min_physical_damage': 'int64',
      'max_physical_damage': 'int64',
      'min_magic_damage': 'int64',
      'max_magic_damage': 'int64',
      'attack_rate': 'attack_rate',
      'attack_range': 'float',
      'minimum_range': 'float',
      'sockets_count': 'sockets_count',
      'sockets': 'sockets',
      'addons_count': 'addons_count',
      'addons': 'addons',
    };
  }

  public getMinimumLength(): number {
    return 151;
  }
}
