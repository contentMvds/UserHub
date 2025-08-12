import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { ObjectId } from 'mongodb';

const secret = 'supersecret';

export interface AuthRequest extends Request {
  user?: { id: string; email: string };
}

export async function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }
  const [, token] = authHeader.split(' ');
  try {
    const decoded = jwt.verify(token, secret) as { id: string; email: string };
    const user = await AppDataSource.getMongoRepository(User).findOneBy({ _id: new ObjectId(decoded.id) });
    if (!user) {
      return res.status(401).json({ message: 'Usuário inválido' });
    }
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export const jwtSecret = secret;
