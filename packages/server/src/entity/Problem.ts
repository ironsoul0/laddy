import {
  Entity,
  BaseEntity,
  Column,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn
} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

import { Ladder } from "./Ladder";

@ObjectType()
@Entity("problems")
export class Problem extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  url: string;

  @Field(() => Int)
  @Column()
  difficulty: number;

  @Field(() => [Ladder])
  @ManyToMany(
    () => Ladder,
    ladder => ladder.problems
  )
  @JoinTable()
  ladders: Ladder[];
}
