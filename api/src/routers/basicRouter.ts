import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as filterService from "../services/filterService"
import Broadcast from "../models/broadcast.model";

export let basicRouter = new Router();

const fileName : string = "assets.csv";

basicRouter.get("/top10", bodyParser(), async (ctx, next) => {
  try {
    const provider: string = ctx.request.query.provider;

    const result: Array<Broadcast> = await filterService.getTop10ForProvider(provider.toUpperCase(), fileName);

    ctx.response.body = result;
    ctx.response.status = 200;
  } catch (e) {
    console.log(e);
    ctx.response.status = 500;
  }
  await next();
});

basicRouter.get("/all", bodyParser(), async (ctx, next) => {
  try {
    const provider: string = ctx.request.query.provider;
    const limitPerPage: number = Number(ctx.request.query.limit);
    const startIndex: number = Number(ctx.request.query.start);

    const result: Array<Broadcast> = await filterService.getAllProviderBroadcastsAlphabetical(provider.toUpperCase(), startIndex, limitPerPage, fileName);

    ctx.response.body = result;
    ctx.response.status = 200;
  } catch (e) {
    console.log(e);
    ctx.response.status = 500;
  }
  await next();
});

