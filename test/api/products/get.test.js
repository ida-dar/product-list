const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Product = require('../../../models/product.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/products', () => {

  before(async () => {
    const testDepOne = new Product({ _id: '5d9f1140f10a81216cfd4408', name: 'Product #1', price: '20', updateDate: null });
    await testDepOne.save();
  
    const testDepTwo = new Product({ _id: '5d9f1140f10a81216cfd4409', name: 'Product #2', price: '20', updateDate: null });
    await testDepTwo.save();
  });
  
  after(async () => {
    await Product.deleteMany();
  });

  request(server).get('/api/products');

  it('"/" should return all products', async () => {
    const res = await request(server).get('/api/products');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('"/:id" should return one product by :id ', async () => {
    const res = await request(server).get('/api/products/5d9f1140f10a81216cfd4408');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body).to.not.be.null;
  });

});
