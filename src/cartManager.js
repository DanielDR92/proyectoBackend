const fs = require('fs');

class cartManager {
  constructor(path) {
    this.path = path;
    this.cart = fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path,`utf-8`)) : [];
  }

  createCart() {
    if ( fs.existsSync(this.path)) 
      this.cart = JSON.parse(fs.readFileSync(this.path,`utf-8`));

    const id = this.cart.length == 0 ? 1 : this.cart[this.cart.length - 1].id + 1;
    const products = [];
    const newCart = {products, id};

    this.cart.push(newCart);
    fs.writeFileSync(this.path, JSON.stringify(this.cart));
    return newCart
  }
  
  getCartByID(id) {
    const cartSearch = fs.existsSync(this.path) ? JSON.parse(fs.readFileSync(this.path,`utf-8`)).find(x => x.id == id) : [];

    return cartSearch;
  }

  addProductToCart(params) {
    const cartList = JSON.parse(fs.readFileSync(this.path,`utf-8`));
    let cartIndex = cartList.findIndex(x => x.id == parseInt(params.cid));

    if ( !cartIndex )
      throw new Error("No cart found with that ID")
    if ( cartList[cartIndex].products.some(x => x.id == parseInt(params.pid)) ){
      let productIndex = cartList[cartIndex].products.findIndex(x => x.id == parseInt(params.pid))

      cartList[cartIndex].products[productIndex].quantity++
    } else {
      cartList[cartIndex].products.push({id: params.pid, quantity: 1})
    }

    fs.writeFileSync(this.path, JSON.stringify(cartList));

    return cartList[cartIndex]
  }

}

module.exports = cartManager;