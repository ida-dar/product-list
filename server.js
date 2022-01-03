const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const productsRoutes = require('./routes/products.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
})

const NODE_ENV = process.env.NODE_ENV;
let dbUrl = '';
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;

if(NODE_ENV === 'production') dbUrl = `mongodb+srv://${username}:${password}@cluster0.zlq2v.mongodb.net/ProductList?retryWrites=true&w=majority`;
else if(NODE_ENV === 'test') dbUrl = 'mongodb://localhost:27017/ProductListTest';
else dbUrl = 'mongodb://localhost:27017/ProductList';

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});

module.exports = server;
