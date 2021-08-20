import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {
  @PrimaryKey()
  _id!: number;

  //   @SerializedPrimaryKey()
  //   id!: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

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
