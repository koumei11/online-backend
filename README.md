# Online Store API

This is an online store API. You can use this API to manipulate user, product and order.

## Set Up Database

1. Install PostgreSQL to your machine.
2. Get into the psql terminal using `psql postgres` command.
3. After you get into the terminal, create a user below.
`CREATE USER full_stack_user WITH PASSWORD 'password123';`
4. Create a database.
`CREATE DATABASE online_store_dev;`
5. Assign permission to the newly created user, full_stack_user.
`GRANT ALL PRIVILEGES ON DATABASE online_store_dev TO full_stack_user;`;

Run `db-migrate up`.

## Get Started

1. Run `npm install` to install all packages required by this project.
2. Run `npm run build` to build the project.
3. Run `npm run start` to start the project.

## Port

Server Port - 3000
Database Port - 5432

## Endpoints

### GET /users

Use this endpoint to get all users

### GET /users/:id

Use this endpoint to get a specific user

### POST /users

Use this endpoint to create a user

### POST /users/authenticate

Use this endpoint to authenticate a user

### GET /products

Use this endpoint to get all products

### GET /products/:id

Use this endpoint to get a specific product

### POST /products

Use this endpoint to create a product

### GET /orders

Use this endpoint to get all orders

### GET /orders/:id

Use this endpoint to get a specific order

### POST /orders

Use this endpoint to create an order

### GET /orders/:user_id/0

Use this endpoint to get progressing orders by a user

### GET /orders/:user_id/1

Use this endpoint to get completed orders by a user

### GET /products/most-popular

Use this endpoint to get five most popular products

### GET /products/:category

Use this endpoint to get products by a category

### POST /order-complete

Use this endpoint to add a value to products_orders table

### GET /each-products/:order_id

Use this endpoint to get each products by the order

### GET /order-products/:order_id

Use this endpoint to get product ids by the order
