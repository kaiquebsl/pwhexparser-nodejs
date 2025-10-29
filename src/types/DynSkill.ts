import { Translate } from '../contracts/Translate.js';

export class DynSkill extends Translate {
  public readonly typeKey: string = 'DynSkill';
  public getStructure(): Record<string, string> {
    return {};
  }

  public getMinimumLength(): number {
    return 0;
  }
}
