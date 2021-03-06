set client_min_messages to warning;
-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;
create schema "public";
CREATE TABLE "users" (
    "userId" serial NOT NULL,
    "username" TEXT NOT NULL unique,
    "password" TEXT NOT NULL,
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "posts" (
    "postId" serial NOT NULL,
    "userId" integer NOT NULL,
    "post" TEXT NOT NULL,
    "price" DECIMAL,
    "startTime" TIME,
    "endTime" TIME,
    "location" TEXT,
    "createdAt" timestamptz NOT NULL default now(),
    "startDate" DATE,
    CONSTRAINT "posts_pk" PRIMARY KEY ("postId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "comments" (
    "commentId" serial NOT NULL,
    "postId" integer NOT NULL,
    "userId" integer NOT NULL,
    "commentText" text NOT NULL,
    "createdAt" timestamptz NOT NULL default now(),
    CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "saved" (
  "userId" integer NOT NULL,
  "postId" integer NOT NULL,
  CONSTRAINT "saved_pk" PRIMARY KEY ("userId", "postId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("postId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "saved" ADD CONSTRAINT "saved_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("postId") ON DELETE CASCADE;
ALTER TABLE "saved" ADD CONSTRAINT "saved_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId") ON DELETE CASCADE;
