import { Translate } from '../contracts/Translate.js';

export class HpAddon extends Translate {
  public getStructure(): Record<string, string> {
    return {
      'total': 'int64',
      'trigger': 'float',
    };
  }

  public getMinimumLength(): number {
    return 15;
  }
}
