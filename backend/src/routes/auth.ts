import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { jwtSecret } from '../middleware/auth';

const router = Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await AppDataSource.getMongoRepository(User).findOneBy({ email });
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }
  const token = jwt.sign({ id: user.id.toString(), email: user.email }, jwtSecret, {
    expiresIn: '1h',
  });
  return res.json({ token });
});

export default router;
