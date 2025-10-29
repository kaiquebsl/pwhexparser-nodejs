import { Translate } from '../contracts/Translate.js';

export class Bugle extends Translate {
  public readonly typeKey: string = 'Bugle';
  public getStructure(): Record<string, string> {
    return {};
  }

  public getMinimumLength(): number {
    return 0;
  }
}
