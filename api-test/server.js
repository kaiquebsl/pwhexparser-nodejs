import express from 'express';
import cors from 'cors';
import { Decoder, Mask } from 'pwhexparser';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'PWHexParser API',
    endpoints: {
      decode: 'POST /api/decode',
      guessType: 'POST /api/guess-type',
      translate: 'POST /api/translate',
      masks: 'GET /api/masks',
      types: 'GET /api/types',
      decodeMask: 'POST /api/decode-mask'
    }
  });
});

app.get('/api/masks', (req, res) => {
  const masks = {
    WEAPON: Mask.WEAPON,
    HEAD: Mask.HEAD,
    NECK: Mask.NECK,
    SHOULDER: Mask.SHOULDER,
    BODY: Mask.BODY,
    WAIST: Mask.WAIST,
    LEG: Mask.LEG,
    FOOT: Mask.FOOT,
    WRIST: Mask.WRIST,
    FINGER1: Mask.FINGER1,
    FINGER2: Mask.FINGER2,
    PROJECTILE: Mask.PROJECTILE,
    FLYSWORD: Mask.FLYSWORD,
    FASHION_BODY: Mask.FASHION_BODY,
    FASHION_LEG: Mask.FASHION_LEG,
    FASHION_FOOT: Mask.FASHION_FOOT,
    FASHION_WRIST: Mask.FASHION_WRIST,
    ATTACK_RUNE: Mask.ATTACK_RUNE,
    BIBLE: Mask.BIBLE,
    BUGLE: Mask.BUGLE,
    HP_ADDON: Mask.HP_ADDON,
    MP_ADDON: Mask.MP_ADDON,
    ELF: Mask.ELF,
    STALLCARD: Mask.STALLCARD,
    FASHION_HEAD: Mask.FASHION_HEAD,
    FORCE_TICKET: Mask.FORCE_TICKET,
    FASHION_WEAPON: Mask.FASHION_WEAPON
  };
  res.json({ success: true, masks });
});

app.get('/api/types', (req, res) => {
  const types = [
    'Weapon','Armor','Fashion','Jewelry','Flight','Pet','Ammo','AttackCharm','Bible','Card','Genie','BlessBox','Bugle','DynSkill','ForceTicket','HpAddon','MpAddon','PetFood','Potion','Property','Skill','SoulStone','StallCard','TaskDice','Acessory','Unequippable'
  ];
  res.json({ success: true, count: types.length, types });
});

app.post('/api/decode', async (req, res) => {
  try {
    const { hexString, itemType } = req.body;
    if (!hexString || !itemType) return res.status(400).json({ success: false, error: 'hexString and itemType are required' });
    const decoder = new Decoder();
    await decoder.setItemType(itemType);
    decoder.setHexString(hexString);
    const data = decoder.decode();
    if (data.error) return res.status(400).json({ success: false, error: data.error });
    res.json({ success: true, itemType, data });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.post('/api/guess-type', async (req, res) => {
  try {
    const { hexString, mask } = req.body;
    if (!hexString || mask === undefined) return res.status(400).json({ success: false, error: 'hexString and mask are required' });
    const decoder = new Decoder();
    await decoder.guessItemType(mask);
    decoder.setHexString(hexString);
    const data = decoder.decode();
    if (data.error) return res.status(400).json({ success: false, error: data.error });
    res.json({ success: true, guessedType: decoder.getItemType()?.constructor.name, mask, data });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.post('/api/translate', async (req, res) => {
  try {
    const { hexString, itemType, lang = 'pt-BR' } = req.body;
    if (!hexString || !itemType) return res.status(400).json({ success: false, error: 'hexString and itemType are required' });
    const decoder = new Decoder();
    await decoder.setItemType(itemType);
    decoder.setLang(lang);
    decoder.setHexString(hexString);
    const data = decoder.translate();
    if (data.error) return res.status(400).json({ success: false, error: data.error });
    res.json({ success: true, itemType, language: lang, data });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.post('/api/decode-mask', (req, res) => {
  try {
    const { mask } = req.body;
    if (mask === undefined) return res.status(400).json({ success: false, error: 'mask is required' });
    res.json({ success: true, mask, flags: Mask.decode(mask), equipmentType: Mask.getEquipmentTypeFromMask(mask) });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`PWHexParser API running on http://localhost:${PORT}`);
});


