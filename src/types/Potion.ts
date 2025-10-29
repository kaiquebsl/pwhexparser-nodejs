import { Translate } from '../contracts/Translate.js';

export class Potion extends Translate {
  public readonly typeKey: string = 'Potion';
  public getStructure(): Record<string, string> {
    return {
      'amount': 'int64',
      'time': 'int64',
      'recharge_time': 'int64',
      'level': 'int64',
    };
  }

  public getMinimumLength(): number {
    return 32;
  }
}
