import { Translate } from '../contracts/Translate.js';

export class MpAddon extends Translate {
  public readonly typeKey: string = 'MpAddon';
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
