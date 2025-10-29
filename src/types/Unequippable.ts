import { Translate } from '../contracts/Translate.js';

export class Unequippable extends Translate {
  public readonly typeKey: string = 'Unequippable';
  public getStructure(): Record<string, string> {
    return {};
  }

  public getMinimumLength(): number {
    return 0;
  }
}
