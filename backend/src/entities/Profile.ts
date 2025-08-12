import { Entity, ObjectIdColumn, Column } from 'typeorm';

@Entity()
export class Profile {
  @ObjectIdColumn()
  id!: any;

  @Column()
  name!: string;
}
