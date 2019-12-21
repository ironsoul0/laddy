import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

import { Ladder } from "./Ladder";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  email: string;

  @Field()
  @Column("text")
  handle: string;

  @Column("text")
  password: string;

  @Field(() => [Ladder])
  @ManyToMany(
    () => Ladder,
    ladder => ladder.users
  )
  @JoinTable()
  ladders: Ladder[];
}
