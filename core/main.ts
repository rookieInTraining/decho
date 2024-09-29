import { Application, Router } from "jsr:@oak/oak@^12.6";
import { oakCors } from "https://deno.land/x/cors@v1.2.2/mod.ts";
import { logger } from "./logger.ts";

const port = 8080;
const app = new Application();
const router = new Router();

// Logger middleware
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  logger.info(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing middleware
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Frontend Route
router.get("/", (ctx) => {
    const pathParams = ctx.params;

    logger.debug(`Path params received : ${JSON.stringify(pathParams)}`);

    ctx.response.body = `<!DOCTYPE html>
        <html>
          <head><title>Hello! Welcome to Deku!</title><head>
          <body>
            <h1>Hi! I am Deku!</h1>
          </body>
        </html>
      `;
  });

app.use(async (ctx, next) => {
  if (ctx.request.method === 'GET' && ctx.request.url.pathname != "/") {
    logger.warn(`Unhandled GET request: ${ctx.request.url}`);
    ctx.response.status = 200; // Or choose an appropriate status code
    ctx.response.body = {
      status: "success",
      message: "Catch-all GET handler",
      requestedPath: ctx.request.url.pathname,
      query: Object.fromEntries(ctx.request.url.searchParams)
    };
  } else if (ctx.request.method === 'POST') {
    const body = ctx.request.body();
    let requestData;

    if (body.type === "json") {
      requestData = await body.value;
      logger.debug(`Request Data: ${JSON.stringify(requestData)}`);
    } else {
      ctx.throw(415, "Only JSON data is supported");
    }

    const showVerbose = ctx.request.url.searchParams.get("showVerbose") === "true";
    logger.debug(`Show verbose value: ${showVerbose}`);

    if (showVerbose) {
      logger.warn(`Client expecting verbose output`);
      ctx.response.body = {
        method: ctx.request.method,
        headers: Object.fromEntries(ctx.request.headers),
        query: Object.fromEntries(ctx.request.url.searchParams),
        body: requestData,
        res_headers: Object.fromEntries(ctx.response.headers)
      };
    } else {
      logger.warn(`Client expecting only echoed payload`);
      ctx.response.body = requestData;
    }
  } else {
    await next();
  }
});

app.use(router.routes());
app.use(oakCors());
app.use(router.allowedMethods());

logger.info(`Server running on http://localhost:${port}`);

app.listen({ port: port }).catch(logger.critical);
