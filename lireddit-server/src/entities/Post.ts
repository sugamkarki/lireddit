import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  //   @SerializedPrimaryKey()
  //   id!: string;

  @Field(() => String)
  @Property()
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property()
  title!: string;

  //   @Property()
  //   email!: string;

  //   @Property({ nullable: true })
  //   age?: number;

  //   @Property()
  //   termsAccepted: boolean = false;

  //   @Property({ nullable: true })
  //   identities?: string[];

  //   @Property({ nullable: true })
  //   born?: Date;

  //   @OneToMany(() => Book, (book) => book.author)
  //   books = new Collection<Book>(this);

  //   @ManyToMany(() => Author)
  //   friends = new Collection<Author>(this);

  //   @ManyToOne(() => Book, { nullable: true })
  //   favouriteBook?: Book;

  //   @Property({ version: true })
  //   version!: number;

  //   constructor(name: string, email: string) {
  //     this.name = name;
  //     this.email = email;
  //   }
}
