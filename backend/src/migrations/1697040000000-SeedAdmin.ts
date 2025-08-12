import { Profile } from '../entities/Profile';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';

interface MigrationInterface {
  up(queryRunner: any): Promise<void>;
  down(queryRunner: any): Promise<void>;
}

export class SeedAdmin1697040000000 implements MigrationInterface {
  public async up(queryRunner: any): Promise<void> {
    const profileRepo = queryRunner.manager.getMongoRepository(Profile);
    const adminProfile = await profileRepo.save({ name: 'admin' });

    const userRepo = queryRunner.manager.getMongoRepository(User);
    const passwordHash = bcrypt.hashSync('admin123', 8);
    await userRepo.save({
      name: 'Administrador',
      email: 'admin@example.com',
      passwordHash,
      profileId: adminProfile.id,
    });
  }

  public async down(queryRunner: any): Promise<void> {
    const userRepo = queryRunner.manager.getMongoRepository(User);
    await userRepo.deleteOne({ email: 'admin@example.com' });

    const profileRepo = queryRunner.manager.getMongoRepository(Profile);
    await profileRepo.deleteOne({ name: 'admin' });
  }
}
