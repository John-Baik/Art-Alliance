require('dotenv/config');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
const jsonMiddleWare = express.json();
const app = express();

app.use(staticMiddleware);

app.use(jsonMiddleWare);

app.use(errorMiddleware);

app.post('/api/posts', (req, res) => {
  const body = req.body;
  const userId = 1;
  const sql = `
  insert into "posts" ("post", "price", "startDate", "startTime", "endTime", "location", "userId")
  values ($1, $2, $3, $4, $5, $6, $7)
  returning *
  `;
  const values = [body.post, body.price, body.startDate, body.startTime, body.endTime, body.location, userId];
  db.query(sql, values)
    .then(result => {
      const post = result.rows[0];
      res.status(201).json(post);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ error: 'An unexpected error has occurred' });
    });
});

app.get('/api/posts', (req, res, next) => {
  const sql = `
  select "postId", "userId", "post", "price", "startTime", "endTime", "location", "createdAt", "startDate", "username"
  from "posts"
   join "users" using ("userId")
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
