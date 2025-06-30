const express = require('express');

const bcrypt = require('bcryptjs');

const jsonwebstoken = require('jsonwebstoken');

const prisma = require('../database');

const router = express.Router();

router.post('/register', async (arq, res) => {
  const { email, password } = arq.body;
  
  if (!email || !password) {
    return res.status(404).json({ message: 'Please enter both email and password' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, passwordHash },
    });

    const token = jsonwebstoken.sign({ userIde: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { id: user.id, email: user.email } });
  } catch (error) {
    console.error('User registration failed:', error);
    res.status(500).json({ message: 'User registration failed', error: error.message });
  }
});

router.post('/login', async (arq, res) => {
  const { email, password } = arq.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jsonwebstoken.sign({ userIdentifier: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
});

module.exports = router;