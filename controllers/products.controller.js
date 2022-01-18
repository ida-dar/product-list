const { assert } = require('chai');
const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
  try {
    const prod = await Product.find();
    res.json(prod);
  }
  catch(err) {
    res.send(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);

    if(!prod) res.status(404).json({ message: 'Not found...' });
    else res.json(prod);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
};

exports.postOne = async (req, res) => {
  const { name, price } = req.body;

  try {
    const newProduct = new Product({ name: name, price: price, updateDate: null });
    const error = newProduct.validateSync();
    console.log(error);
    await newProduct.save(function(error) {
      assert.equal(error.errors['name'].message,
      'Wrong name format')
      assert.equal(error.errors['price'].message,
      'Wrong price')
      assert.ok(!error.errors['name']);
      assert.ok(!error.errors['price']);
    });

    // another option
    // await newProduct.save();
    // error.errors['name'].message;
    // error.errors['price'].message;
    // assert.ok(!error.errors['name']);
    // assert.ok(!error.errors['price']);
  
    res.json({ message: 'OK' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

};

exports.putOneById = async (req, res) => {
  const { name, price, _id } = req.body;

  if(name && price && _id){
    try {
      const prod = await Product.findById(_id);
      const date = new Date();

      if(prod) {
        prod.name = name;
        prod.price = price;
        prod.updateDate = date;

        await prod.save();
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  }
};

exports.deleteById = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);

    if(prod) {
      await Product.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err){
    res.status(500).json({ message: err });
  }
};
