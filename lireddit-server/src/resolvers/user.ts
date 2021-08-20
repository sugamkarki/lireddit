import { User } from "../entities/User";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
// hashing for password
import argon2 from "argon2";
// Just a new way of taking args
@InputType()
class UsernamePasswordInfo {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
@Resolver()
export class UserResolver {
  /* -------------------------- returns current user -------------------------- */
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    if (!req.session.userId) {
      return "You are not logged in";
    }
    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }
  // ------------------------
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInfo,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const existingUser: User | null = await em.findOne(User, {
      username: options.username,
    });
    if (existingUser) {
      return {
        errors: [
          {
            field: "username",
            message: "User already exists",
          },
        ],
      };
    }

    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greater than 2",
          },
        ],
      };
    }
    if (options.password.length <= 3) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than three",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);
    // console.log(user);
    req.session.userId = user.id;

    return { user };
  }
  //   ?Login
  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInfo,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      username: options.username,
    });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "that username doesn't exist",
          },
        ],
      };
    }
    const isValid: boolean = await argon2.verify(
      user.password,
      options.password
    );
    if (!isValid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }
    req.session.userId = user.id;

    return {
      user,
    };
  }
}
