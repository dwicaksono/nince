import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import accounts from './accounts';
import categories from './categories';
import transactions from './transactions';
import summary from './summary';
import { HTTPException } from 'hono/http-exception';
import mockInterview from './mockInterview';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

// handle error other way using HTTPException from hono
// app.onError((err, c) => {
// 	if (err instanceof HTTPException) {
// 		return err.getResponse();
// 	}
// 	return c.json({ error: "Internal error" }, 500);
// });

const routes = app
  .route('/accounts', accounts)
  .route('/categories', categories)
  .route('/transactions', transactions)
  .route('/summary', summary)
  .route('/mockInterview', mockInterview);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
export type AppType = typeof routes;
