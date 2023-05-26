<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



# Dev execution

1. Clon the repository
2. Execute
```
yarn install
```

3. Need Nest CLI 
```
npm i -g @nestjs/cli
```

4. Docker to start database - MONGODB
```
docker-compose up -d
```

5. Clon the file __.env.template__ and rename to __.env__  

6. Fille the env variables

7. Start the app in dev mode
```
$ yarn run start:dev
```

8. Upload database with seed data
```
http://localhost:3000/api/v2/seed
```

## Stack Usado
* MongoDB
* Nest

# Production build
1. Create the file
```
.env.prod
```
2. Fill the env variables

3. Generate the docker image
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```


## Notes
For run the image use this:
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
