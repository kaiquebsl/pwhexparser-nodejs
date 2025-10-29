import { Decoder } from 'pwhexparser';

const hex = process.argv[2] || '';
const itemType = process.argv[3] || 'Weapon';

if (!hex) {
  console.error('Usage: node test-npm-hex.js <HEX> [ItemType]');
  process.exit(1);
}

const run = async () => {
  try {
    const decoder = new Decoder();
    await decoder.setItemType(itemType);
    decoder.setHexString(hex);
    const data = decoder.decode();
    console.log(JSON.stringify({ itemType, data }, null, 2));
  } catch (e) {
    console.error('Error:', e?.message || e);
    process.exit(1);
  }
};

run();


