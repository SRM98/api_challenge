import * as Koa from "koa";
import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyParser from "koa-bodyparser";
import { basicRouter } from "./routers/basicRouter";

const cors = require('@koa/cors');

const app = new Koa();

// Middlewares
app.use(cors({
  origin: "*",
  allowHeaders: "DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,x-access-token",
  exposeHeaders: "Content-Length,Content-Range"
}));

app.use(json());
app.use(logger());
app.use(bodyParser());

// Routes
app.use(basicRouter.routes()).use(basicRouter.allowedMethods());

app.listen(8080, () => {
  console.log("service started");  
});

