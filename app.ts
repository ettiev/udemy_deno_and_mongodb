//# Using Oak - 3rd party dependancy
// # run with deno run --allow-net app.ts

import { Application } from "https://deno.land/x/oak/mod.ts";
import "https://raw.githubusercontent.com/daychongyang/dotenv/master/load.ts";

import todoRoutes from "./routes/routes.ts"
import { connect } from "./helpers/db_client.ts";

connect();

const app = new Application();

// app.use(async (ctx, next) => {
//   ctx.response.body = "Middleware";
//   await next();
// });

app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  await next()
})

app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());


await app.listen({ port: 8000 });


