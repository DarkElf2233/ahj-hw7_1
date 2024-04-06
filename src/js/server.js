const http = require('http');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const cors = require('@koa/cors');
const { bodyParser } = require('@koa/bodyparser');

const app = new Koa();

const tickets = [];

app.use(cors());

app.use(bodyParser());

app.use(koaBody({
  urlencoded: true,
}));

app.use(async (ctx, next) => {
  ctx.body = 'server response';

  await next();
});

app.use(async (ctx) => {
  const { method } = ctx.request.query;

  switch (method) {
    case 'allTickets':
      ctx.response.body = tickets;
      return;

    case 'createTicket':
      const {
        id, name, description, status, created,
      } = ctx.request.body;
      tickets.fill({
        id,
        name,
        description,
        status,
        created,
      });

      return;

    default:
      ctx.response.status = 404;
      return;
  }
});

const server = http.createServer(app.callback());

server.listen(7070);
