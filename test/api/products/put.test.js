const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Product = require('../../../models/product.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/products', () => {

  before(async () => {
    const testDepOne = new Product({ _id: '5d9f1140f10a81216cfd4408', name: 'Product #1', price: '20', updateDate: null });
    await testDepOne.save();
  });
  
  after(async () => {
    await Product.deleteMany();
  });

  it('"/:id" should update chosen document and return success', async () => {
    const res = await request(server).put('/api/products/5d9f1140f10a81216cfd4408').send({ _id: '5d9f1140f10a81216cfd4408', name: 'Updated', price: 'updated', updateDate: new Date() });
    const updated = await Product.findOne({ name: 'Updated' });
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(updated).to.not.be.null;
  });

});
