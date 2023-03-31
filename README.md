-   https://github.com/vercel/mongodb-starter
-   https://www.mongodb.com/developer/languages/javascript/nextjs-with-mongodb/
-   https://github.com/vercel/next.js/tree/canary/examples/with-mongodb

```sh
docker run -d -p 27017:27017 --name md-mongo mongo:5.0.15

cp .env.local.example .env.local

yarn ts-node scripts/create-schema.ts

yarn ts-node scripts/seed.ts
```
