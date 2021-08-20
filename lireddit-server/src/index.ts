import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { __prod__ } from "./constants";
import "reflect-metadata";
// @ts-ignore
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";
// Imports
const main = async () => {
  // !Inits the mikroserver
  const orm = await MikroORM.init(mikroConfig);
  //   !Migrates
  await orm.getMigrator().up();
  //   const post = orm.em.create(Post, { title: "my second post" });
  //   await orm.em.persistAndFlush(post);
  //   const posts = await orm.em.find(Post, {});
  //   console.log(posts);
  //   !creates express app
  const app = express();
  //   creates apolloserver with resolvers
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em }),
  });
  //   //   app is the express that combines with graphql server
  //   app.get("/", (_, res) => {
  //     // console.log("object");
  //     res.send("running");
  //   });
  apolloServer.applyMiddleware({ app });
  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};
main().catch((err) => {
  console.log(err);
});
