import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './User';
import { Blog } from './Blog';

@Entity('comments')
export class Comment extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @PrimaryColumn()
  ownerId: number;
  @ManyToOne(()=> User, user => user.comments)
  @JoinColumn({name: "ownerId"})
  owner: User;

  @PrimaryColumn()
  blogId: number;
  @ManyToOne(()=> Blog, blog => blog.comments)
  @JoinColumn({name: "blogId"})
  blog: Blog;

}