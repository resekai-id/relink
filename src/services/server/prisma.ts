import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

prisma
  .$runCommandRaw({
    createIndexes: 'links',
    indexes: [
      {
        key: {expiry: 1},
        name: 'expiryTTL',
        expireAfterSeconds: 0,
      },
    ],
  })
  .catch(console.error);

export default prisma;
