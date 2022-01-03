# Product list 
This project is a REST API written with Node.js and Express to manage product list.
<br><br>
I decided to present two solutions:
- on branch [master](https://github.com/ida-dar/product-list/tree/master) the product list is a remote database created with MongoDB. To test it open [product-list](https://product-list-recruitment-task.herokuapp.com/api/products). Due to lack of front-end and the fact that remote database requires a username and a password (in accordance to secure practices sensitive data shouldn't be commited to public repositories) I decided to save such data in environment-specific values on Heroku.
- on branch [solution-2](https://github.com/ida-dar/product-list/tree/solution-2) I present the second solution where product list is stored in a db.js file.
<br>

**Both solutions are testable from the browser level or e.g. with Postman.**

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
  - on branch `master` open [product-list](https://product-list-recruitment-task.herokuapp.com/api/products) to see the products list.
  - or switch to branch `solution-2` (`git checkout solution-2`) open [localhost:8000/api/products](http://localhost:8000/api/products) to see the products list.

#### Test the app in Postman:
  - on branch `master` copy base link: https://product-list-recruitment-task.herokuapp.com/api/
  - on branch `solution-2` copy base link: http://localhost:8000/api/

### Available endpoints
All endpoints are prefixed with `/api`

- `GET` `/products` - returns the entire list of entries.
- `GET` `/products/:id` - returns specific entry based on its id.
- `POST` `/products` - adds a new entry based on req.body.
- `PUT` `products:/:id` - modification of an entry with a given id based on req.body.
- `DELETE` `/products/:id` - removal of an entry based on its id.

### Testing of CRUD operations, endpoints and Mongoose models (available on branch `master`):

- `yarn test:watch` or `npm run test:watch`
