const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

async function main() {
  const password = await bcrypt.hash('admin123', 10)
  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@example.com',
      password,
      role: 'admin'
    }
  })
}

main().finally(() => prisma.$disconnect())
