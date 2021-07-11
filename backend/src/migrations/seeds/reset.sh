npm run build
npx typeorm schema:drop
npx typeorm schema:sync
npm run seed:config
npm run seed:run