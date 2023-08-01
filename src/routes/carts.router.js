const {Router} = require('express');
const path = require('path');
const cartManager = require(path.join(__dirname,'../')+'cartManager.js');

const router = Router();

const cart = new cartManager(path.join(__dirname,'../')+'cart.json');


router.post('/', (req, res) => {
  const newCart = cart.createCart();
  res.status(200).json({message: "Cart Created", cart: newCart})
});

router.get('/:cid', (req, res) => {
  if ( isNaN(req.params.cid) ) {
    res.status(500).json({message: "No cart found"})
  } else {
    const cartSearch = cart.getCartByID(req.params.cid);
    res.status(200).json({message: "Cart found", cart: cartSearch})
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  try {
    const cartList = cart.addProductToCart(req.params);
    res.status(200).json({message: "Product added", cart: cartList})
  } catch (error) {
    res.status(500).json({error})
  }
});

module.exports = router;
