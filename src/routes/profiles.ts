import { Router } from 'express';
import { profiles, nextProfileId } from '../data/store';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/', (req, res) => {
  res.json(profiles);
});

router.get('/:id', (req, res) => {
  const profile = profiles.find((p) => p.id === Number(req.params.id));
  if (!profile) {
    return res.status(404).json({ message: 'Perfil não encontrado' });
  }
  res.json(profile);
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const profile = { id: nextProfileId(), name };
  profiles.push(profile);
  res.status(201).json(profile);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const profile = profiles.find((p) => p.id === id);
  if (!profile) {
    return res.status(404).json({ message: 'Perfil não encontrado' });
  }
  if (req.body.name) profile.name = req.body.name;
  res.json(profile);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = profiles.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Perfil não encontrado' });
  }
  const removed = profiles.splice(index, 1)[0];
  res.json(removed);
});

export default router;
