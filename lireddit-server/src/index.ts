import { MikroORM } from "@mikro-orm/core";
import express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import mikroConfig from "./mikro-orm.config";
const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  await orm.getMigrator().up();
  const app = express();
    const apolloServer=new ApolloServer({
        schema;
    })
  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};
main().catch((err) => {
  console.log(err);
});
