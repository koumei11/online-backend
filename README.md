# Online Store API

This is an online store API. You can use this API to manipulate user, product and order.

## Get Started

1. Run `npm install` to install all packages required by this project.
2. Run `npm run build` to build the project.
3. Run `npm run start` to start the project.

## Set Up Database

Run `db-migrate up` to set up the database.
This commands creates online_store_dev database and neccessary tables of this project.

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
