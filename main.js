const path = require('path');
const koa = require('koa');
const koaRouter = require('koa-router');
const koaStatic = require('koa-static');
const koaEjs = require('koa-ejs');
const koaBody = require('koa-body');
const dotenv = require('dotenv');
dotenv.config()
const ts3 = require('./scripts/script');

const app = new koa();

app.use(koaBody());
koaEjs(app, {
    root: path.resolve('./views'),
    layout: false,
    viewExt: 'ejs'
});

app.use(async (ctx, next) => {
    ctx.oldRender = ctx.render;
    ctx.render = async (template, data) => {
        return ctx.oldRender('layout', {template, data});
    };
    await next();
});

app.use(koaStatic(path.resolve('./public')));

const router = new koaRouter();

require('./scripts/router')(router);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.KOA_PORT || 8080, () => {
    console.log("App listening on: http://localhost:" + (process.env.KOA_PORT || 8080))
});