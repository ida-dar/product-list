const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

router.route('/products').get((req, res) => {
  res.json(db.products);
});

router.route('/products/:id').get((req, res) => {
  const id = req.params.id;
  const obj = db.products.find(el => el.id === parseInt(id));

  res.json(obj);
});

router.route('/products').post((req, res) => {
  const { name, price } = req.body;

  if(name && price) {
    const id = uuidv4();
    const obj = { id: id, name: name, price: price, updateDate: null };
    db.products.push(obj);

    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/products/:id').put((req, res) => {
  const { name, price, id } = req.body;

  if(name && price) {
    const date = new Date();
    const newData = { id: id, name: name, price: price, updateDate: date };
    const objIndex = db.products.findIndex((obj => obj.id == id));
    db.products[objIndex] = newData;

    res.json({ message: 'OK' });
  } else {
    res.json({ message: 'Something went wrong' });
  }
});

router.route('/products/:id').delete((req, res) => {
  const id = req.params.id;

  const objIndex = db.products.findIndex((obj => obj.id == id));
  db.products.splice(objIndex, 1);

  res.json({ message: 'OK' });
});

module.exports = router;
