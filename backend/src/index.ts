import { Hono } from 'hono';
import { blogRouter, userRouter } from './routes';
import { cors } from 'hono/cors';

const app = new Hono();

app.get("/", (c) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Medium backend</title>
  </head>
  <body style="padding: 0px; margin: 0px; box-sizing: border-box;">
      <div style="height: 100vh; width: 100vw; display: flex; justify-content: center; align-items: center; background-color: #0e1111;">
          <div style="background-color: #3b444b; padding: 50px 70px; border-radius: 15px; text-align: center; cursor: default;">
              <h1 style="color: white; margin-bottom: 20px;">Medium blog backend server!</h1>
              <p style="color: gray;">A backend API routes to fetch data...</p>
          </div>
      </div>
  </body>
  </html>
  `;
  return c.html(html);
})
app.use('/*', cors());

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

export default app