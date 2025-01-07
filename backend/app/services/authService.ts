import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { JwtService } from './jwtService.js';

const prisma = new PrismaClient();
const SALT_ROUNDS = 12;

interface RegisterData {
  email: string
  password: string
  name: string
  firstname: string
  role: string
}

export class AuthService {
  private jwtService : JwtService;

  constructor() {
    this.jwtService = new JwtService();
  }

  async register(data: RegisterData) {
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        firstname: data.firstname,
        role: data.role
      }
    });
  
    const token = this.jwtService.generateToken(user);
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token
    }
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Identifiants incorrects');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Identifiants incorrects');
    }

    const token = this.jwtService.generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token
    }
  }
}