import { Translate } from '../contracts/Translate.js';

export class Pet extends Translate {
  public getStructure(): Record<string, string> {
    return {
      'level': 'int64',
      'required_class': 'int64',
      'loyalty': 'int64',
      'pet_id': 'int64',
      'pet_vis_tid': 'int64',
      'egg_id': 'int64',
      'pet_type': 'int64',
      'pet_level': 'int32',
      'color': 'int32',
      'current_exp': 'int64',
      'skill_points': 'int64',
      'name_length': 'name_length',
      'name': 'pack_name',
      'skills_count': 'skills_count',
      'skills': 'skills',
    };
  }

  public getMinimumLength(): number {
    return 119;
  }
}
