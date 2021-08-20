import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { __PORT__, __prod__ } from "./constants";
import "reflect-metadata";
// @ts-ignore
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
// Imports
/* --------------------------------- redis -------------------------------- */

/* ---------------------------------- main ---------------------------------- */
const main = async () => {
  // !Inits the mikroserver
  const orm = await MikroORM.init(mikroConfig);
  //   !Migrates
  await orm.getMigrator().up();
  //   !creates express app
  const app = express();
  /* -------------------- run this before making middleware ------------------- */
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, //cookie only works in https
      },
      saveUninitialized: false,
      secret: "djkahjkdlhwajkdhawjkdlhajk",
      resave: false,
    })
  );
  /* ----------------------------------- .. ----------------------------------- */
  //   creates apolloserver with resolvers
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ em: orm.em, req, res }),
  });
  //   //   app is the express that combines with graphql server
  apolloServer.applyMiddleware({ app });
  app.listen(__PORT__, () => {
    console.log("server started on localhost:", __PORT__);
  });
};
main().catch((err) => {
  console.log(err);
});
