# APPLICATIONS

### This project includes 3 applications.

- [x] Api:Backend of the applications created by NestJS. As a database, I used PostgreSQL. Application is dockerized, so you can start all the backend with one line of code on the terminal.You can monitor also all the database with pg-adminer. TypeORM is used for query and manipulate data from a PostgreSQL. 
Redis is used for caching. 
- [x] Frontend: This is one of the frontend applications. It mainly consume ADMIN APIS. It contains many technologies including the MATERIAL UI,REDUX. You can see how I handle AUTHENTICATIN, AUTHORIZATION,PAGINATION.
- [x] React-Ambassador: This is one of the frontend applications. It consume AMBASSADOR APIS. For state management I used REDUX. But in addition to redux, I integrated the RTK QUERY to redux. So I can handle all my API calls in RTK slices.


#### You can find all api collection in **Ambasaddor APP.postman_collection.json**

## start the api

```js
        cd api
        npm install
        docker compose up
        docker-compose exec backend sh  // used for going inside the docker container and seed the database
        npm run seed:ambassador
        npm run seed:product
        npm run seed:orders
```

### start the frontend

 ```js
        cd frontend
        npm install
        npm start
 ```

### start react-ambassador
```js
        cd react-ambassador
        npm install
        npm start
```
![image](https://user-images.githubusercontent.com/75525090/190682653-3ffcb615-d024-47f1-bf2b-5f2b1958077a.png)

