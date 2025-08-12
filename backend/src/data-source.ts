import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import { Profile } from './entities/Profile';

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGO_URL || 'mongodb://mongo:27017/userhub',
  useNewUrlParser: true,
  useUnifiedTopology: true,
  synchronize: false,
  logging: false,
  entities: [User, Profile],
  migrations: ['src/migrations/*.ts'],
});
