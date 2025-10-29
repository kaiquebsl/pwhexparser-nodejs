import { Translate } from '../contracts/Translate.js';

export class Fashion extends Translate {
  public readonly typeKey: string = 'Fashion';
  public getStructure(): Record<string, string> {
    return {
      'level': 'int64',
      'color': 'int32',
      'gender': 'int32',
      'creator_type': 'short',
      'name_length': 'name_length',
      'name': 'name',
      'color_mask': 'int32',
    };
  }

  public getMinimumLength(): number {
    return 20;
  }
}
