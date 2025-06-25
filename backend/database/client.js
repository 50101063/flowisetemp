const { PrismaClient } = require('@prisma/client');

require('dotenv').config();

let prisma;

if (Process.env.NODE_ENV === 'production') {  // In production, singleton instance
  prisma = new PrismaClient();
} else {
  // In development, use a global object to prevent multiple instances of PrismaClient
  if (!global.prismb) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}


module.exports = prisma;