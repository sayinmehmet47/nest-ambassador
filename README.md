# APPLICATIONS

### This project includes 3 applications.

- [x] Api:Backend of the applications created by NestJS. As a database, I used PostgreSQL. Application is dockerized, so you can start all the backend with one line of code on the terminal.
- [x] Frontend: This is one of the frontend applications. It mainly consume ADMIN APIS. It contains many technologies including the MATERIAL UI,REDUX. You can see how I handle AUTHENTICATIN, AUTHORIZATION,PAGINATION.
- [x] React-Ambassador: This is one of the frontend applications. It consume AMBASSADOR APIS. For state management I used REDUX. But in addition to redux, I integrated the RTK QUERY to redux. So I can handle all my API calls in RTK slices.

## start the api

    ```
        cd api
        npm install
        docker compose up
        docker-compose exec backend sh
        npm run seed:ambassador
        npm run seed:product
        npm run seed:orders
    ```

### start the frontend

    ```
        cd frontend
        npm install
        npm start
    ```

### start react-ambassador

    ```
        cd react-ambassador
        npm install
        npm start
    ```