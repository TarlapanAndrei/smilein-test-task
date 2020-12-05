import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Comment } from './Comment';

@Entity('blogs')
export class Blog extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({default: false})
  active: boolean;

  @Column()
  ownerId: string;
  @ManyToOne(()=> User, user => user.blogs)
  @JoinColumn({name: "ownerId"})
  owner: User;

  @Column()
  blogId: number;
  @OneToMany(()=> Comment, comment => comment.blog)
  comments: Comment[];
}