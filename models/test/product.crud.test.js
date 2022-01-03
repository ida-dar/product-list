const { expect } = require('chai');
const { mongoose } = require('mongoose');
const Product = require('../product.model');

describe('Product', () => {

  before(async function() {
    try {
      await mongoose.connect('mongodb://localhost:27017/ProductListTest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {
      console.error(err);
    }
  });

  describe('Reading data', function () {

    before(async function () {
    const testDepOne = new Product({ _id: '5d9f1140f10a81216cfd4408', name: 'Product #1', price: '20', updateDate: null });
    await testDepOne.save();

    const testDepTwo = new Product({ _id: '5d9f1140f10a81216cfd4409', name: 'Product #2', price: '20', updateDate: null });
    await testDepTwo.save();
    });

    after(async function () {
      await Product.deleteMany();
    });

    it('should return all the data with "find" method', async function () {
      const products = await Product.find({});
      const expectedLength = 2;
      expect(products.length).to.be.equal(expectedLength);
    });

    it('should return a proper document by "name" with "findOne" method', async function () {
      const product = await Product.findOne({ name: 'Product #1' });
      expect(product.name).to.be.equal('Product #1');
    });

  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async function () {
      const product = new Product({ name: 'Product #3', price: '20', updateDate: null });
      await product.save();
      expect(product.isNew).to.be.false;
    });
    
    after(async function() {
      await Product.deleteMany();
    });

  });

  describe('Updating data', () => {

    beforeEach(async function() {
      const testDepOne = new Product({ _id: '5d9f1140f10a81216cfd4408', name: 'Product #1', price: '20', updateDate: null });
      await testDepOne.save();
    
      const testDepTwo = new Product({ _id: '5d9f1140f10a81216cfd4409', name: 'Product #2', price: '20', updateDate: null });
      await testDepTwo.save();
    });

    afterEach(async function() {
      await Product.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async function() {
      await Product.updateOne({ name: 'Product #1' }, { $set: { name: '=Product #1=', updateDate: new Date() }});
      const updatedProduct = await Product.findOne({ name: '=Product #1=' });
      expect(updatedProduct).to.not.be.null;
    });
  
    it('should properly update one document with "save" method', async function() {
      const product = await Product.findOne({ name: 'Product #1' });
      product.name = '=Product #1=';
      product.updateDate = new Date();
      await product.save();
    
      const updatedProduct = await Product.findOne({ name: '=Product #1=' });
      expect(updatedProduct).to.not.be.null;
    });
  
    it('should properly update multiple documents with "updateMany" method', async function() {
      await Product.updateMany({}, { $set: {name: 'Updated'}});
      const products = await Product.find();
      expect(products).to.not.be.null;
      expect(products[0].name).to.be.equal('Updated');
      expect(products[1].name).to.be.equal('Updated');
    });
  
  });

  describe('Removing data', () => {

    beforeEach(async function() {
      const testDepOne = new Product({ _id: '5d9f1140f10a81216cfd4408', name: 'Product #1', price: '20', updateDate: null });
      await testDepOne.save();
    
      const testDepTwo = new Product({ _id: '5d9f1140f10a81216cfd4409', name: 'Product #2', price: '20', updateDate: null });
      await testDepTwo.save();
    });
    
    afterEach(async function() {
      await Product.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async function() {
      await Product.deleteOne({ name: 'Product #1' });
      const removed = await Product.findOne({ name: 'Product #1'});
      expect(removed).to.be.null;
    });
  
    it('should properly remove one document with "remove" method', async function() {
      const product = await Product.findOne({ name: 'Product #1' });
      await product.remove();
      const removedProduct = await Product.findOne({ name: 'Product #1' });
      expect(removedProduct).to.be.null;
    });
  
    it('should properly remove multiple documents with "deleteMany" method', async function() {
      await Product.deleteMany({});
      const removed = await Product.find();
      expect(removed.length).to.equal(0);
    });
  
  });

});