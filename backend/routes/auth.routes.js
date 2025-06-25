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
      res.status(500).json(�Y\��Y�N�	�\��܈�Y�\�\�[��\�\��JNB�JN�����[�\�\���]\����
	����[��\�[��
�\K�\�HO��ۜ��[XZ[\���ܙHH�\K���N�Y�
Y[XZ[\\���ܙ
H�]\���\˜�]\�
K���ۊ�Y\��Y�N�	�[XZ[[�\���ܙ\�H�\]Z\�Y	�JNB���H�ۜ�\�\�H]�Z]�\�XK�\�\���[�[�\]YJ�\�N��[XZ[K�JN�Y�
]\�\�H�]\���\˜�]\�
K���ۊ��W76vS�t��fƖB7&VFV�F��2rғ��Р�6��7B�57v�&EVƖB�v�B&7'�B�6��&R�77v�&B�W6W"�77v�&D�6������b��577v�&EVƖB���&WGW&�&W2�7FGW2�C��6�⇲�W76vS�t��fƖB7&VFV�F��2rғ��Р�6��7BF��V���wB�6�v•�W6W$�C�W6W"�B�V��âW6W"�V������&�6W72�V�b�uE�4T5$UB����W��&W4��s�r���F��V�W��&W2����W ����&W2�7FGW2�#��6�⇲F��V�ғ���6F6��W'&�"���6��6��R�W'&�"�t��v��W'&�#�r�W'&�"���&W2�7FGW2�S��6��쁵��ͅ��耝�ɽȁ��������������(�����)���()mmmodule.exports = router;