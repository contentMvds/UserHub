import { User } from '../models/User';
import { Profile } from '../models/Profile';
import bcrypt from 'bcryptjs';

export const profiles: Profile[] = [];
export const users: User[] = [];

let userId = 1;
let profileId = 1;

export function nextUserId() {
  return userId++;
}

export function nextProfileId() {
  return profileId++;
}

// Inicializa com um perfil e usuário padrão
const adminProfile: Profile = { id: nextProfileId(), name: 'admin' };
profiles.push(adminProfile);

const defaultPassword = bcrypt.hashSync('admin123', 8);
users.push({
  id: nextUserId(),
  name: 'Administrador',
  email: 'admin@example.com',
  passwordHash: defaultPassword,
  profileId: adminProfile.id,
});
