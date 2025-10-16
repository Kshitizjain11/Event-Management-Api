import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export async function createUser(data) {
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email
        }
    });
    return user;
}

export async function listUsers() {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true
        }
    });
}