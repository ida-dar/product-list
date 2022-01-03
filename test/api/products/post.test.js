const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Product = require('../../../models/product.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('POST /api/products', () => {

  after(async () => {
    await Product.deleteMany();
  });

  it('"/" should insert new document to db and return success', async () => {
    const res = await request(server).post('/api/products').send({ name: 'Product #1', price: '20', updateDate: null });
    const newProduct = await Product.findOne({ name: 'Product #1' });
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(newProduct).to.not.be.null;
  });

});
