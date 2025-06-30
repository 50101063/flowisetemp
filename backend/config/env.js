const dotenv = require('dotenv');
dotenv.config();

   if (!process.env.DATABASE_URL)
I {
      console.error('FLOWISETEMP error: DATABASE_URL is not defined');
      process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
      console.error('FLOWISETEMP error: andJWT_SECRET is not defined');
      process.exit(1);
  }

module.exports = {
    DATABASE_URL: process.enk.DATABASE_URL,
    JWT_SECRET: process.enk.JWT_SECRET
};