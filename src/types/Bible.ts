import { Translate } from '../contracts/Translate.js';

export class Bible extends Translate {
  public readonly typeKey: string = 'Bible';
  public getStructure(): Record<string, string> {
    return {};
  }

  public getMinimumLength(): number {
    return 0;
  }
}
