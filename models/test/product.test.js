const { expect } = require('chai');
const Product = require('../product.model.js');

describe('Product', () => {

  it('should throw an error if no "name, price" arg', () => {
    const dep = new Product({});

    dep.validate(err => {
      expect(err.errors.name).to.exist;
      expect(err.errors.price).to.exist;
    })
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for(let name of cases) {
      const dep = new Product({ name });
  
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should throw an error if "price" is not a string', () => {
    const cases = [{}, []];
    for(let price of cases) {
      const dep = new Product({ price });
  
      dep.validate(err => {
        expect(err.errors.price).to.exist;
      });
    }
  });

  it('shoulg throw an error if "name" is longer than 100', () => {
    const cases = ['LoremipsumloremipsumloremipsumLoremipsumloremipsumloremipsumLoremipsumloremipsumloremipsumLoremipsumloremipsumloremipsumLoremipsumloremipsumloremipsum'];
    for(let name of cases) {
      const dep = new Product({ name });
  
      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should NOT throw error if "name" is correct', () => {
    const cases = ['Design', 'Lorem ipsum'];
    const price = '20';
    
    for(let name of cases) {
      const dep = new Product({ name, price });
  
      dep.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });

  it('should NOT throw error if "price" is correct', () => {
    const cases = ['Design', 'Lorem ipsum'];
    const name = 'Lorem';

    for(let price of cases) {
      const dep = new Product({ name, price });
  
      dep.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });

});
