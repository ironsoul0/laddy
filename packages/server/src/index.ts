import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { createConnection, getConnectionOptions } from "typeorm";
import path from "path";

import { UserResolver } from "./resolvers/UserResolver";
import { AuthResolver } from "./resolvers/AuthResolver";
import { LadderResolver } from "./resolvers/LadderResolver";

const bootstrap = async () => {
  const app = express();

  const dbOptions = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...dbOptions, name: "default" });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, AuthResolver, LadderResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });
  apolloServer.applyMiddleware({ app });

  const buildPath = path.resolve(__dirname, "../../client/build");
  app.use(express.static(buildPath));

  app.use("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
  });

  const PORT = (process.env.PORT || 4000) as number;
  app.listen(PORT, "127.0.0.1", () => {
    console.log(`🚀 Server is started on port ${PORT}`);
  });
};

bootstrap();
