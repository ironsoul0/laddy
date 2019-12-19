import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToMany
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

import { User } from "./User";
import { Problem } from "./Problem";

@ObjectType()
@Entity("ladders")
export class Ladder extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  name: string;

  @Field(() => [User])
  @ManyToMany(
    () => User,
    user => user.ladders
  )
  users: User[];

  @Field(() => [Problem])
  @ManyToMany(
    () => Problem,
    problem => problem.ladders
  )
  problems: Problem[];
}
