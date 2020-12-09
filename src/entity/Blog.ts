import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import {v4 as uuid} from 'uuid';

@Entity('blogs')
export class Blog extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({default: false})
  active: boolean;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column()
  ownerId: string;
  @ManyToOne(()=> User, user => user.blogs, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({name: "ownerId"})
  owner: User;

  @OneToMany(()=> Comment, comment => comment.blog, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  comments: Comment[];
}