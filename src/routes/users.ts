import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { users, nextUserId } from '../data/store';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const user = users.find((u) => u.id === Number(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  res.json(user);
});

router.post('/', (req, res) => {
  const { name, email, password, profileId } = req.body;
  if (users.some((u) => u.email === email)) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }
  const passwordHash = bcrypt.hashSync(password, 8);
  const newUser = { id: nextUserId(), name, email, passwordHash, profileId };
  users.push(newUser);
  res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  const { name, email, password, profileId } = req.body;
  if (email && users.some((u) => u.email === email && u.id !== id)) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }
  if (name) user.name = name;
  if (email) user.email = email;
  if (password) user.passwordHash = bcrypt.hashSync(password, 8);
  if (profileId) user.profileId = profileId;
  res.json(user);
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado' });
  }
  const removed = users.splice(index, 1)[0];
  res.json(removed);
});

export default router;
