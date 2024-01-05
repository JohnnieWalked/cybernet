import { PrismaClient } from '@prisma/client';

/* 
  reason of this operations and not writing just -> "export const db = globalThis.prisma || new PrismaClient();" is NEXT.JS hot reload.

  To avoid initializing new PrismaClient() everytime after file save 
    AND 
  getting errors in Terminal that You have too many active prismaclients 

*/

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
