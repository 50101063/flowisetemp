const express = require('express');

const router = express.Router();
const bcrypt = require('bcrypt');
require('dotenv').config();

const prisma = require('../database/client'); // Prisma client
const jwt = require('jsonwebtoken');

require('dotenv').config();
	// Register a new user
router.post('/register', async (req, res) => {
    const { email, password } = req.body;


      if (!email || !password) {
          return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
          data: {
            email,
            passwordHashed: hashedPassword,
          },
      });
      res.status(201).json({message: 'User registered successfully', userId: user.id});
    } catch (error) {
      if (error.code === 'P2002') { // Unique constraint violation
        return res.status(409).json({ message: 'Email already registered' });
      }
      console.error('Registration error:', error);
      res.status(500).json(ÈY\ÜØYÙNˆ	Ñ\œ›Üˆ™YÚ\İ\š[™È\Ù\‰ÈJNÂˆBŸJNÂ‚‹ËÈÙÚ[ˆ\Ù\„›İ]\‹œÜİ
	ËÛÙÚ[‰Ë\Ş[˜È
™\K™\ÊHOˆÂˆÛÛœİÈ[XZ[\ÜİÛÜ™HH™\K˜›ÙNÂ‚ˆYˆ
Y[XZ[\\ÜİÛÜ™
HÂˆ™]\›ˆ™\Ëœİ]\Ê
KšœÛÛŠÈY\ÜØYÙNˆ	Ñ[XZ[[™\ÜİÛÜ™\™H™\]Z\™Y	ÈJNÂˆB‚ˆHÂˆÛÛœİ\Ù\ˆH]ØZ]š\ÛXK\Ù\‹™š[™[š\]YJÂˆÚ\™NˆÈ[XZ[KˆJNÂ‚ˆYˆ
]\Ù\ŠHÂˆ™]\›ˆ™\Ëœİ]\Ê
KšœÛÛŠ²ÖW76vS¢t–çfÆ–B7&VFVçF–Ç2rÒ“°¢Ğ ¢6öç7B—57v÷&EVÆ–BÒv—B&7'—Bæ6ö×&R‡77v÷&BÂW6W"ç77v÷&D†6‚“° ¢–b‚—577v÷&EVÆ–B’°¢&WGW&â&W2ç7FGW2ƒC’æ§6öâ‡²ÖW76vS¢t–çfÆ–B7&VFVçF–Ç2rÒ“°¢Ğ ¢6öç7BFö¶VâÒ§wBç6–vâ€¢²W6W$–C¢W6W"æ–BÂVÖ–Ã¢W6W"æVÖ–ÂÒÀ¢&ö6W72æVçbä¥uEõ4T5$UBÂÀ¢²W‡—&W4–ã¢s‚rÒòòFö¶VâW‡—&W2–â†÷W ¢“°¢&W2ç7FGW2ƒ#’æ§6öâ‡²Fö¶VâÒ“°¢Ò6F6‚†W'&÷"’°¢6öç6öÆRæW'&÷"‚tÆöv–âW'&÷#¢rÂW'&÷"“°¢&W2ç7FGW2ƒS’æ§6öâìµ•ÍÍ…”è€ÉÉ½È±½¥¸¥¸œô¤ì(€€€ô)ô¤ì()mmmodule.exports = router;