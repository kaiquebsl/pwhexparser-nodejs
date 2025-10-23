import { Translate } from '../contracts/Translate.js';

export class Card extends Translate {
  public getStructure(): Record<string, string> {
    return {
      'type': 'int64',
      'class': 'int64',
      'level': 'int64',
      'leadership': 'int64',
      'max_level': 'int64',
      'current_level': 'int64',
      'current_exp': 'int64',
      'merge_times': 'int64',
    };
  }

  public getMinimumLength(): number {
    return 64;
  }
}
