//# Using Oak - 3rd party dependancy
// # run with deno run --allow-net app.ts

import { Application } from "https://deno.land/x/oak/mod.ts";

import todoRoutes from "./routes/routes.ts"

const app = new Application();

app.use(async (ctx, next) => {
  ctx.response.body = "Middleware";
  await next();
});

app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());


await app.listen({ port: 8000 });


