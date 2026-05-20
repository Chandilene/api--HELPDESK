import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await hash("admin123", 8);

  await prisma.user.upsert({
    where: { email: "chandiadmin@email.com" },
    update: {},
    create: {
      name: "Chandilene Borges",
      email: "chandiadmin@email.com",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  console.log("✅ Seed: Admin criado com sucesso!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
