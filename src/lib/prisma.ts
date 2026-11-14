import {PrismaClient} from "@/generated/prisma/client";

if (!global.prismaBox) {
    global.prismaBox = {
        prisma: null,
    }
}

if (!global.prismaBox.prisma) {
    global.prismaBox.prisma = new PrismaClient();
}

export const prisma = global.prismaBox.prisma;
