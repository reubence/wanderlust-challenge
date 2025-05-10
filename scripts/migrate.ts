import { PrismaClient } from "@prisma/client"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)
const prisma = new PrismaClient()

async function main() {
  try {
    console.log("Starting database migrations...")

    await execAsync("prisma migrate deploy")

    console.log("Migrations completed successfully")

    await prisma.$disconnect()
  } catch (error) {
    console.error("Migration failed:", error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

main()
