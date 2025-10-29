import { Translate } from '../contracts/Translate.js';

export class Flight extends Translate {
  public readonly typeKey: string = 'Flight';
  public getStructure(): Record<string, string> {
    return {
      'fuel1': 'int64',
      'fuel2': 'int64',
      'level': 'int32',
      'grade': 'int32',
      'class': 'int64',
      'time_per_element': 'int64',
      'speed1': 'float',
      'speed2': 'float',
      'item_flag': 'int32',
      'crc': 'int64',
    };
  }

  public getExtraStructure(): Record<string, string> {
    return {
      'level': 'int64',
      'mana_consumption': 'int64',
      'mana_per_second': 'int64',
      'speed_increase': 'float',
      'reserved': 'int64',
    };
  }

  public getMinimumLength(): number {
    return 63;
  }
}
