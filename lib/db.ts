import { PrimsClient } from '@prisma/client';

declare global {
  var prisma: PrimsClient | undefined;
}

export const db = globalThis.prisma || new PrimsClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}