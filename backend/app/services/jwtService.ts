import jwt from 'jsonwebtoken';

const JWT_SECRET = 'pourLinstantJspQuoiMettreEtFautLePlacerDansLeEnvPlusTardImo';
const JWT_EXPIRES_IN = '24h'; // trop long il faudra changer plus tard

export class JwtService {
  generateToken(user: { id: number; email: string; name: string; firstname: string }) {
    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      firstname: user.firstname
    }

    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  }

  verifyToken(token: string) {
    try {
      return jwt.verify(token, JWT_SECRET) as {
        userId: number
        email: string
        name: string
        firstname: string
      }
    } catch (error) {
      throw new Error('Token invalide');
    }
  }
}