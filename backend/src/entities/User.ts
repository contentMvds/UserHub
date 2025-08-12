import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id!: any;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column()
  passwordHash!: string;

  @Column()
  profileId!: any;
}
