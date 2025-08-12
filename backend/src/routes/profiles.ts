import { Router } from 'express';
import { AppDataSource } from '../data-source';
import { Profile } from '../entities/Profile';
import { authenticate } from '../middleware/auth';
import { ObjectId } from 'mongodb';

const router = Router();
router.use(authenticate);

router.get('/', async (_req, res) => {
  const profiles = await AppDataSource.getMongoRepository(Profile).find();
  res.json(profiles);
});

router.get('/:id', async (req, res) => {
  const id = new ObjectId(req.params.id);
  const profile = await AppDataSource.getMongoRepository(Profile).findOneBy({ _id: id });
  if (!profile) {
    return res.status(404).json({ message: 'Perfil não encontrado' });
  }
  res.json(profile);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const profileRepo = AppDataSource.getMongoRepository(Profile);
  const profile = await profileRepo.save({ name });
  res.status(201).json(profile);
});

router.put('/:id', async (req, res) => {
  const id = new ObjectId(req.params.id);
  const profileRepo = AppDataSource.getMongoRepository(Profile);
  const profile = await profileRepo.findOneBy({ _id: id });
  if (!profile) {
    return res.status(404).json({ message: 'Perfil não encontrado' });
  }
  if (req.body.name) profile.name = req.body.name;
  await profileRepo.save(profile);
  res.json(profile);
});

router.delete('/:id', async (req, res) => {
  const id = new ObjectId(req.params.id);
  const profileRepo = AppDataSource.getMongoRepository(Profile);
  const profile = await profileRepo.findOneBy({ _id: id });
  if (!profile) {
    return res.status(404).json({ message: 'Perfil não encontrado' });
  }
  await profileRepo.delete({ _id: id });
  res.json(profile);
});

export default router;
