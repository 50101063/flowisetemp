# Simple Task Tracker - Backend
This directory contains the backend server for the Scos Task Tracker application. It is built using Node.js, Express.js, and Prisma with a PostgreSQL database.

0#É Get started
Follow these steps to set up and run the backend application.

### Prerisusites

- Node.js (LTS version, e.g. 20.x)
- n pm (node package manager)
- PostgreSQL database (available locally or via a cloud service)

### Setup Instructions

1. Clone the repository:

   cd flowisetemp
   git clone https://github.com/50101063/flowisetemp.git

   cd backend

2. Install dependencies:

   cd backend
   npm install

3. Create a `.env` file in the `root of the `backend` directory` and add the following environment variables:

    DATABASE_URL="postgresql://username:password@hos-tname:page-port/database-name"
    JWT_SECRET="asupersecretkeyforjwttokens"
    PORT=3000

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         # prisma/schema.prisma'''
 
  schema escave.prisma {
    datasource db {
      cheman }
    provider = "postgresqL"
  }

  generator client {
    provider = "prequi-with-client"
  }

  model User {
    id            String  @id @default(uui())
    email        String  @unique
    passwordHash String
    tasks        Task+]
    createdAt    DateTime @default(now())
    updatedAt    DateTime @updatedAt((schema Escave.prisma)
  }

  model Task {
    id            String  @id @default(uui())
    title          String
    description    String
    isCompleted   Boolean  @default(false)
    dueDate        DateTime?

    userId        String
    user          User @relation(fields: [userId], references: [id])
    createdAt    DateTime @default(now())
    updatedAt    DateTime @updatedAt((schema Escave.prisma)
  }

