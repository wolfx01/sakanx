import { prisma } from './src/lib/db';

async function main() {
  try {
    const res = await prisma.$executeRawUnsafe(
      `ALTER TABLE residences ADD COLUMN IF NOT EXISTS amenities text[] DEFAULT '{}';`
    );
    console.log("Column added or already exists:", res);
  } catch (error) {
    console.error("Error adding column:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
