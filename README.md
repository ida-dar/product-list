# Product list 
This project is a REST API written with Node.js and Express to manage product list.
<br><br>
The app is testable from the browser level or e.g. with Postman.
<br><br>
I decided to present two solutions:
- on branch [master](https://github.com/ida-dar/product-list/tree/master) the product list is a remote database created with MongoDB. The address (https://product-list-recruitment-task.herokuapp.com/api/products)
- on branch [solution-2](https://github.com/ida-dar/product-list/tree/solution-2)
Initially I used MongoDB and Mongoose for the database. However, due to lack of front-end I decided to 

## Getting Started

### Requirement:
- node : 14.x.x or above 
- npm : 6.x.x or above

### Clone this repo:
`git clone https://github.com/ida-dar/product-list.git`

### Navigate to the root folder and install all dependencies:

- `yarn` or `npm install`

### Start Development Mode:

- `yarn start` or `npm start`
- Open:
  - if you are on branch `master` open published app [](https://product-list-recruitment-task.herokuapp.com/api/products)
- Open [http://localhost:8000/api/products](http://localhost:8000/api/products) to see the products list.

### Available endpoints
All endpoints are prefixed with `/api`

- `GET` `/products` - returns the entire list of entries.
- `GET` `/products/:id` - returns specific entry based on its id.
- `POST` `/products` - adds a new entry based on req.body.
- `PUT` `products:/:id` - modification of an entry with a given id based on req.body.
- `DELETE` `/products/:id` - removal of an entry based on its id.

### Testing of CRUD operations, endpoints and Mongoose models:

- `yarn test:watch` or `npm run test:watch`
