import { Translate } from '../contracts/Translate.js';

export class Genie extends Translate {
  public getStructure(): Record<string, string> {
    return {
      'current_exp': 'int64',
      'level': 'int32',
      'available_points': 'int32',
      'strength': 'int32',
      'agility': 'int32',
      'constitution': 'int32',
      'intelligence': 'int32',
      'talent_points': 'int32',
      'metal': 'int32',
      'wood': 'int32',
      'water': 'int32',
      'fire': 'int32',
      'earth': 'int32',
      'refine_level': 'int32',
      'vigour': 'int64',
      'status_value': 'int64',
      'equipments_count': 'int64',
      'skills_count': 'skills_count',
      // 'skills': 'skills', TODO
    };
  }

  public getMinimumLength(): number {
    return 83;
  }
}
