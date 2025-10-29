import { Translate } from '../contracts/Translate.js';

export class ForceTicket extends Translate {
  public readonly typeKey: string = 'ForceTicket';
  public getStructure(): Record<string, string> {
    return {};
  }

  public getMinimumLength(): number {
    return 0;
  }
}
