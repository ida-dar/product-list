const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Product = require('../../../models/product.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('DELETE /api/products', () => {

  before(async () => {
    const testDepOne = new Product({ _id: '5d9f1140f10a81216cfd4408', name: 'Product #1', price: '20', updateDate: null });
    await testDepOne.save();
  });

  it('"/:id" delete chosen document and return succes', async () => {
    const res = await request(server).delete('/api/products/5d9f1140f10a81216cfd4408');
    const deleted = await Product.findOne({ name: 'Product #1' })
    expect(res.status).to.be.equal(200);
    expect(res.body.message).to.be.equal('OK');
    expect(deleted).to.be.null;
  });

});
