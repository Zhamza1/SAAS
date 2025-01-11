import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserService {
  async getAllUsers() {
    return await prisma.user.findMany()
  }

  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    })
  }

  async createUser(data: {
    email: string
    name: string
    password: string
    firstname: string
    role: string
    price?: number
  }) {
    return await prisma.user.create({
      data: {
        ...data,
        price: data.price || 1.0,
      },
    })
  }

  async updateUser(id: number, data: { email?: string; name?: string; password?: string }) {
    return await prisma.user.update({
      where: { id },
      data,
    })
  }

  async deleteUser(id: number) {
    return await prisma.user.delete({
      where: { id },
    })
  }
}
