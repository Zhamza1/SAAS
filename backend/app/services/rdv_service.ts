import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class RdvService {
  async getAllRdvs() {
    const rdvs = await prisma.rdv.findMany({
      include: {
        coach: {
          select: {
            id: true,
            email: true,
            name: true,
            firstname: true,
            role: true,
            createdAt: true,
            updatedAt: true
          }
        },
        client: {
          select: {
            id: true,
            email: true,
            name: true,
            firstname: true,
            role: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });
  
    return rdvs;
  }

  async getRdvById(id: number) {
    return await prisma.rdv.findUnique({
      where: { id },
      include: {
        coach: {
            select: {
              id: true,
              email: true,
              name: true,
              firstname: true,
              role: true,
              createdAt: true,
              updatedAt: true
            }
          },
          client: {
            select: {
              id: true,
              email: true,
              name: true,
              firstname: true,
              role: true,
              createdAt: true,
              updatedAt: true
            }
          }
      }
    });
  }

  async getRdvsByCoachId(coachId: number) {
    return await prisma.rdv.findMany({
      where: {
        coachId: coachId
      },
      include: {
        coach: {
            select: {
              id: true,
              email: true,
              name: true,
              firstname: true,
              role: true,
              createdAt: true,
              updatedAt: true
            }
          },
          client: {
            select: {
              id: true,
              email: true,
              name: true,
              firstname: true,
              role: true,
              createdAt: true,
              updatedAt: true
            }
          }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async getRdvsByClientId(clientId: number) {
    return await prisma.rdv.findMany({
      where: {
        clientId: clientId
      },
      include: {
        coach: {
            select: {
              id: true,
              email: true,
              name: true,
              firstname: true,
              role: true,
              createdAt: true,
              updatedAt: true
            }
          },
          client: {
            select: {
              id: true,
              email: true,
              name: true,
              firstname: true,
              role: true,
              createdAt: true,
              updatedAt: true
            }
          }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async createRdv(data: { coachId: number; clientId: number }) {
    return await prisma.rdv.create({
      data: {
        coach: { connect: { id: data.coachId } },
        client: { connect: { id: data.clientId } }
      },
      include: {
        coach: {
            select: {
              id: true,
              email: true,
              name: true,
              firstname: true,
              role: true,
              createdAt: true,
              updatedAt: true
            }
          },
          client: {
            select: {
              id: true,
              email: true,
              name: true,
              firstname: true,
              role: true,
              createdAt: true,
              updatedAt: true
            }
          }
      }
    });
  }

  async updateRdv(id: number, data: { coachId?: number; clientId?: number }) {
    const updateData: any = {};
    
    if (data.coachId) {
      updateData.coach = { connect: { id: data.coachId } };
    }
    if (data.clientId) {
      updateData.client = { connect: { id: data.clientId } };
    }

    return await prisma.rdv.update({
      where: { id },
      data: updateData,
      include: {
        coach: {
            select: {
              id: true,
              email: true,
              name: true,
              firstname: true,
              role: true,
              createdAt: true,
              updatedAt: true
            }
          },
          client: {
            select: {
              id: true,
              email: true,
              name: true,
              firstname: true,
              role: true,
              createdAt: true,
              updatedAt: true
            }
          }
      }
    });
  }

  async deleteRdv(id: number) {
    return await prisma.rdv.delete({
      where: { id }
    });
  }
}