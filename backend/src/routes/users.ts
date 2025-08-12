import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Profile } from '../entities/Profile';
import { authenticate } from '../middleware/auth';
import { ObjectId } from 'mongodb';

const router = Router();
router.use(authenticate);

router.get('/', async (_req, res) => {
  const users = await AppDataSource.getMongoRepository(User).find();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const id = new ObjectId(req.params.id);
  const user = await AppDataSource.getMongoRepository(User).findOneBy({ _id: id });
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  res.json(user);
});

router.post('/', async (req, res) => {
  const { name, email, password, profileId } = req.body;
  const userRepo = AppDataSource.getMongoRepository(User);
  const profileRepo = AppDataSource.getMongoRepository(Profile);
  if (await userRepo.findOneBy({ email })) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }
  const profile = await profileRepo.findOneBy({ _id: new ObjectId(profileId) });
  if (!profile) {
    return res.status(400).json({ message: 'Perfil inválido' });
  }
  const passwordHash = bcrypt.hashSync(password, 8);
  const user = await userRepo.save({ name, email, passwordHash, profileId: profile.id });
  res.status(201).json(user);
});

router.put('/:id', async (req, res) => {
  const id = new ObjectId(req.params.id);
  const userRepo = AppDataSource.getMongoRepository(User);
  const user = await userRepo.findOneBy({ _id: id });
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  const { name, email, password, profileId } = req.body;
  if (email) {
    const existing = await userRepo.findOneBy({ email });
    if (existing && existing.id.toString() !== id.toString()) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }
    user.email = email;
  }
  if (name) user.name = name;
  if (password) user.passwordHash = bcrypt.hashSync(password, 8);
  if (profileId) user.profileId = new ObjectId(profileId);
  await userRepo.save(user);
  res.json(user);
});

router.delete('/:id', async (req, res) => {
  const id = new ObjectId(req.params.id);
  const userRepo = AppDataSource.getMongoRepository(User);
  const user = await userRepo.findOneBy({ _id: id });
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  await userRepo.delete({ _id: id });
  res.json(user);
});

export default router;
