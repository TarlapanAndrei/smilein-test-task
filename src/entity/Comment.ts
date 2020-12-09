import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';
import { Blog } from './Blog';

@Entity('comments')
export class Comment extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @PrimaryColumn()
  ownerId: string;
  @ManyToOne(()=> User, user => user.comments, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({name: "ownerId"})
  owner: User;

  @PrimaryColumn()
  blogId: string;
  @ManyToOne(()=> Blog, blog => blog.comments, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn({name: "blogId"})
  blog: Blog;

}