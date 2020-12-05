import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, BeforeInsert, CreateDateColumn, UpdateDateColumn, BeforeUpdate } from 'typeorm';
import {v4 as uuid} from 'uuid';
import { IsEmail, Length, IsNotEmpty, IsOptional } from 'class-validator';
import bcrypt from 'bcrypt';

import { Blog } from './Blog';
import { Comment } from './Comment';

@Entity('users')
export class User extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'uuid'})
  uuid: string;

  @Column()
  @Length(10, 20)
  @IsNotEmpty()
  firstName: string;

  @Column()
  @Length(10, 20)
  @IsNotEmpty()
  lastName: string;

  @Column({unique: true, nullable: false})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({select: false})
  @IsNotEmpty()
  password: string

  @Column({nullable: true})
  @IsOptional()
  passwordChangeAt: Date

  @BeforeInsert()
  @BeforeUpdate()
   async hashPassword() {
  if (this.password) {
    this.password = await hashPassword(this.password);
  }
}

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
    createUuid() {
      this.uuid = uuid();
    }

  @OneToMany(()=> Blog, blog => blog.owner)
  blogs: Blog[];

  @OneToMany(()=> Comment, comment => comment.owner)
  comments: Comment[];

}
const hashPassword = async(password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}