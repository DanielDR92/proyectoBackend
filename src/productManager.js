const fs = require('fs');

class productManager {
  constructor(path) {
    this.path = path;
    this.products = fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path,`utf-8`)) : [];
  }

  getProducts() {
    this.products = fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path,`utf-8`)) : [];
    return this.products;
  }

  addProduct(obj) {
    if ( fs.existsSync(this.path)) 
      this.products = JSON.parse(fs.readFileSync(this.path,`utf-8`));

    const id = this.products.length == 0 ? 1 : this.products[this.products.length - 1].id + 1;
    const newProduct = {...obj, id};

    if (this.products.some(x => x.code == newProduct.code))
      throw new Error(`Code ${newProduct.code} repeated`);
    if ((!newProduct.title && !typeof(newProduct.title) == `string`) || (!newProduct.description && !typeof(newProduct.description) == `string`) || (!newProduct.price && !typeof(newProduct.price) == `string`) || (!newProduct.price && !typeof(newProduct.price) == number) || (!newProduct.status && !typeof(newProduct.status) == `boolean`) || (!newProduct.stock && !typeof(newProduct.stock) == `number`) || (!newProduct.category && !typeof(newProduct.category) == `number`) || (newProduct.thumbnail && !Array.isArray(newProduct.thumbnail)) )
      throw new Error("All fields are mandatory");

    this.products.push(newProduct);
    fs.writeFileSync(this.path, JSON.stringify(this.products));
    return newProduct
  }
  
  getProductByID(id) {
    const productSearch = fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path,`utf-8`)).find(x => x.id == id) : [];

    return productSearch;
  }

  updateProduct(id, update) {
    const productSearch = fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path,`utf-8`)).find(x => x.id == id) : null;
    if (productSearch){
      for (let k in update) {
        if (k == `id`)
          continue
        productSearch[k] = update[k];
      }
      this.products[this.products.findIndex(x => x.id == id)] = productSearch;
      fs.writeFileSync(this.path, JSON.stringify(this.products));
    } else {
      throw new Error("Product not found")    }
  }

  deleteProduct(id) {
    const productSearch = fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path,`utf-8`)).find(x => x.id == id) : null;

    if (productSearch){
      this.products.splice(this.products.findIndex(x => x.id == id), 1);
      fs.writeFileSync(this.path, JSON.stringify(this.products));
    }
  }
}

module.exports = productManager;