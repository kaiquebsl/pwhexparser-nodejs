# pwhexparser

TypeScript library for decoding PW's hexadecimal strings based on their predefined structure.

## Features

- Decode the structure for Weapon, Armor, Fashion, Jewelry, Flight, Role Property and more
- Retrieve the decoded data as JSON
- Error handling and validation for input data
- Support for all 26 item types
- Portuguese (pt-BR) translations
- Full TypeScript support with type definitions

## Installation

```bash
npm install pwhexparser
```

## Usage

### Basic Usage

```typescript
import { Decoder } from 'pwhexparser';

const decoder = new Decoder();
await decoder.setItemType('Fashion'); // Weapon, Armor, Charm, Jewelry, Flight, Card...
decoder.setHexString('1e00000092470100010a620072007500630065000000'); // Mandarin Silk Gown
const result = decoder.decode();

console.log(result);
```

### Guessing Item Type

You can also guess the item type based on the item's mask:

```typescript
import { Decoder, Mask } from 'pwhexparser';

const mask = 1; // Weapon

const decoder = new Decoder();
await decoder.guessItemType(mask);
decoder.setHexString('5a00ff001001000031000000b4610000786900002c00040a4200720075006300650000000000090000000b00000000000000930200009b0500000000000000000000180000000000604000000000010000000000000003000000114500009200000001000000f02300004d000000cf2500000e000000');
const result = decoder.decode();

console.log(result);
```

### Translation Support

```typescript
import { Decoder } from 'pwhexparser';

const decoder = new Decoder();
await decoder.setItemType('Weapon');
decoder.setLang('pt-BR');
decoder.setHexString('64002000360000002e0100008c7b0000007d00002c000406480075007a0002000000c55c00000f00000000000000ad02000004040000000000000000000010000000000020400000000002000900d0070000d007000005000000db21000003000000852500005e010000cc25000012000000e1a1000064000000e1a1000064000000');

const translated = decoder.translate();
console.log(translated);
```

## API Reference

### Decoder

The main class for decoding hexadecimal strings.

#### Methods

- `setHexString(hexString: string): void` - Set the hex string to decode
- `setItemType(itemType: string): Promise<void>` - Set the item type for decoding
- `guessItemType(mask: number): Promise<void>` - Guess item type from mask
- `setLang(lang: string): void` - Set language for translations (default: 'pt-BR')
- `decode(): Record<string, any>` - Decode the hex string
- `translate(): Record<string, any>` - Get translated structure with values
- `debugHexString(): Record<string, any>` - Debug hex string parsing
- `reset(): void` - Reset decoder state

### Mask

Utility class for equipment mask constants and operations.

#### Methods

- `decode(mask: number): string[]` - Decode mask into flag names
- `getEquipmentTypeFromMask(mask: number): string` - Get equipment type from mask
- `getEquipmentTypes(): Record<number, string>` - Get all equipment types

## Supported Item Types

- Weapon
- Armor
- Fashion
- Jewelry
- Flight
- Pet
- Ammo
- AttackCharm
- Bible
- Card
- Genie
- BlessBox
- Bugle
- DynSkill
- ForceTicket
- HpAddon
- MpAddon
- PetFood
- Potion
- Property
- Skill
- SoulStone
- StallCard
- TaskDice
- Acessory
- Unequippable

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
