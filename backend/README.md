# gnkr-side-project backend

<br>

このプロジェクトはNestJSで作成しました。

<br>

## Swagger URL

```
$ npm run start

http://localhost:4000/docs/
```

## テーブル削除後、再作成

```bash
$ npm install

$ npm run build

$ npx typeorm schema:drop

$ npx typeorm schema:sync
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


