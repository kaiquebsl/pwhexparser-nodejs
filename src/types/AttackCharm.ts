import { Translate } from '../contracts/Translate.js';

export class AttackCharm extends Translate {
  public readonly typeKey: string = 'AttackCharm';
  public getStructure(): Record<string, string> {
    return {
      'rune_type': 'int32',
      'min_weapon_level': 'int32',
      'max_weapon_level': 'int32',
      'damage_increase': 'int32',
    };
  }

  public getMinimumLength(): number {
    return 15;
  }
}
