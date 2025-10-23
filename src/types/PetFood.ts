import { Translate } from '../contracts/Translate.js';

export class PetFood extends Translate {
  public getStructure(): Record<string, string> {
    return {
      'honor': 'int64',
      'food_mask': 'int64',
    };
  }

  public getMinimumLength(): number {
    return 16;
  }
}
