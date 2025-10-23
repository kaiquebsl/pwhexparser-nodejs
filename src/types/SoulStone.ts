import { Translate } from '../contracts/Translate.js';

export class SoulStone extends Translate {
  public getStructure(): Record<string, string> {
    return {
      'w_addons_count': 'addons_count',
      'addons': 'addons',
      // 'level': 'int64',
      // 'level1': 'int32',
      // 'a_addons_count': 'addons_count',
      // 'level2': 'int32',
      // 'level3': 'int32',
      // 'level4': 'int32',
    };
  }

  public getMinimumLength(): number {
    return 32;
  }
}
