import { Translate } from '../contracts/Translate.js';

export class TaskDice extends Translate {
  public readonly typeKey: string = 'TaskDice';
  public getStructure(): Record<string, string> {
    return {
      'quest_id': 'int64',
    };
  }

  public getMinimumLength(): number {
    return 8;
  }
}
