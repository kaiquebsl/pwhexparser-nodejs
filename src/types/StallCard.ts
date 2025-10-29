import { Translate } from '../contracts/Translate.js';

export class StallCard extends Translate {
  public readonly typeKey: string = 'StallCard';
  public getStructure(): Record<string, string> {
    return {};
  }

  public getMinimumLength(): number {
    return 0;
  }
}
