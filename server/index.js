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

app.get('/api/posts', (req, res, next) => {
  const sql = `
  select "postId", "userId", "post", "price", "startTime", "endTime", "location", "createdAt", "startDate", "username"
  from "posts"
   join "users" using ("userId")
  order BY "createdAt" desc
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/users/:userId', (req, res, next) => {
  const id = Number(req.params.userId);
  if (!id || id <= 0) {
    res.status(400).json({ error: 'invalid id' });
    return;
  }
  const sql = `select "userId", "username", "password"
  from "users"
  where "userId" = $1
  `;
  const values = [id];
  db.query(sql, values)
    .then(result => {
      const user = result.rows[0];
      if (!user) {
        res.status(404).json({ error: 'userId does not exist' });
        return;
      }
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/posts/:postId', (req, res, next) => {
  const id = Number(req.params.postId);
  if (!id || id <= 0) {
    res.status(400).json({ error: 'invalid id' });
    return;
  }
  const sql = `
  select "postId", "userId", "post", "price", "startTime", "endTime", "location", "createdAt", "startDate", "username"
  from "posts"
   join "users" using ("userId")
  where "postId" = $1
  `;
  const values = [id];
  db.query(sql, values)
    .then(result => {
      const post = result.rows[0];
      if (!post) {
        res.status(404).json({ error: 'postId does not exist' });
        return;
      }
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/saved', (req, res, next) => {
  const sql = `
  select "postId", "userId"
  from "saved"
  `;
  db.query(sql)
    .then(result => {
      const post = result.rows;
      res.status(200).json(post);
    })
    .catch(err => next(err));
});

app.get('/api/saved/:userId', (req, res, next) => {
  const id = Number(req.params.userId);
  if (!id || id <= 0) {
    res.status(400).json({ error: 'invalid id' });
    return;
  }
  const sql = `
  select "p"."postId",
   "p"."userId",
   "p"."post",
   "p"."price",
   "p"."startTime",
   "p"."endTime",
   "p"."location",
   "p"."createdAt",
   "p"."startDate"
  from "saved" as "s"
  join "posts" as "p" using ("postId")
  where "s"."userId" = $1
  `;
  const values = [id];
  db.query(sql, values)
    .then(result => {
      const post = result.rows;
      res.status(201).json(post);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ error: 'An unexpected error has occurred' });
    });
});

app.post('/api/posts/:userId', (req, res, next) => {
  const body = req.body;
  const userId = Number(req.params.userId);
  if (!userId || userId <= 0) {
    res.status(400).json({ error: 'invalid userId' });
    return;
  }
  const sql = `
  insert into "posts" ("post", "price", "startDate", "startTime", "endTime", "location", "userId")
  values ($1, $2, $3, $4, $5, $6, $7)
  returning "post", "price", "startDate", "startTime", "endTime", "location", "userId"
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

app.post('/api/saved/:postId', (req, res, next) => {
  const id = Number(req.params.postId);
  if (!id || id <= 0) {
    res.status(400).json({ error: 'invalid id' });
    return;
  }
  const sql = `
  insert into "saved" ("postId", "userId")
  select "postId", "userId"
  from "posts"
   join "users" using ("userId")
  where "postId" = $1
  returning "postId", "userId"
  `;
  const values = [id];
  db.query(sql, values)
    .then(result => {
      const post = result.rows[0];
      if (!post) {
        res.status(404).json({ error: 'postId does not exist' });
        return;
      }
      res.status(200).json(result.rows);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ error: 'An unexpected error has occurred' });
    });
});

app.patch('/api/posts/:postId', (req, res) => {
  const body = req.body;
  const id = Number(req.params.postId);
  const post = body.post;
  const price = body.price;
  const startTime = body.startTime;
  const endTime = body.endTime;
  const location = body.location;
  const startDate = body.startDate;
  if (!id || id <= 0) {
    res.status(400).json({ error: 'invalid id' });
    return;
  } else if (!post || !price || !startTime || !endTime || !location || !startDate) {
    res.status(400).json({ error: 'Entry must contain a price, startTime, endTime, and location' });
    return;
  }
  const sql = `
    update "posts"
      set "post" = $1,
      "price" = $2,
      "startTime" = $3,
      "endTime" = $4,
      "location" = $5,
      "startDate" = $6
    where "postId" = $7
    returning  "postId", "userId", "post", "price", "startTime", "endTime", "location", "createdAt", "startDate"
  `;
  const values = [post, price, startTime, endTime, location, startDate, id];
  db.query(sql, values)
    .then(result => {
      const updatedPost = result.rows[0];
      if (!updatedPost) {
        res.status(404).json({ error: 'postId does not exist' });
        return;
      }
      res.status(200).json(updatedPost);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ error: 'An unexpected error has occurred' });
    });
});

app.delete('/api/posts/:postId', (req, res, next) => {
  const id = Number(req.params.postId);
  if (!id || id <= 0) {
    res.status(400).json({ error: 'invalid id' });
    return;
  }
  const sql = `
  delete from "posts"
    where "postId" = $1
    returning "postId", "userId", "post", "price", "startTime", "endTime", "location", "createdAt", "startDate"
  `;
  const values = [id];
  db.query(sql, values)
    .then(result => {
      const deletedPost = result.rows[0];
      if (!deletedPost) {
        res.status(404).json({ error: 'postId does not exist' });
        return;
      }
      res.status(200).json(deletedPost);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ error: 'An unexpected error has occurred' });
    });
});

app.delete('/api/saved/:postId', (req, res, next) => {
  const id = Number(req.params.postId);
  if (!id || id <= 0) {
    res.status(400).json({ error: 'invalid id' });
    return;
  }
  const sql = `delete from "saved"
  where "postId" = $1
  returning "postId", "userId"
  `;
  const values = [id];
  db.query(sql, values)
    .then(result => {
      const post = result.rows[0];
      if (!post) {
        res.status(404).json({ error: 'postId does not exist' });
        return;
      }
      res.status(200).json(result.rows);
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log(error);
      res.status(500).json({ error: 'An unexpected error has occurred' });
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
