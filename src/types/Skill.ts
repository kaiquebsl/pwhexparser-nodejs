import { Translate } from '../contracts/Translate.js';

export class Skill extends Translate {
  public readonly typeKey: string = 'Skill';
  public getStructure(): Record<string, string> {
    return {
      'skills': 'skills',
    };
  }

  public getMinimumLength(): number {
    return 8;
  }
}
