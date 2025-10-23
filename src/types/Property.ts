import { Translate } from '../contracts/Translate.js';

export class Property extends Translate {
  public getStructure(): Record<string, string> {
    return {
      'vitality': 'int64',
      'magic': 'int64',
      'strength': 'int64',
      'dexterity': 'int64',
      'max_hp': 'int64',
      'max_mp': 'int64',
      'hp_regen': 'int64',
      'mp_regen': 'int64',
      'walk_speed': 'float',
      'run_speed': 'float',
      'swim_speed': 'float',
      'fly_speed': 'float',
      'acuracy': 'int64',
      'min_physical_damage': 'int64',
      'max_physical_damage': 'int64',
      'attack_rate': 'attack_rate',
      'attack_range': 'float',
      'min_metal_damage': 'int64',
      'max_metal_damage': 'int64',
      'min_wood_damage': 'int64',
      'max_wood_damage': 'int64',
      'min_water_damage': 'int64',
      'max_water_damage': 'int64',
      'min_fire_damage': 'int64',
      'max_fire_damage': 'int64',
      'min_extra_damage': 'int64',
      'max_extra_damage': 'int64',
      'min_magic_damage': 'int64',
      'max_magic_damage': 'int64',
      'metal_resistance': 'int64',
      'wood_resistance': 'int64',
      'water_resistance': 'int64',
      'fire_resistance': 'int64',
      'resistance': 'int64',
      'physical_resistance': 'int64',
      'inclination': 'int64',
      'chi': 'int64',
    };
  }

  public getMinimumLength(): number {
    return 290;
  }
}
