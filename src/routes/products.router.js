const {Router} = require('express');
const path = require('path');
const productManager = require(path.join(__dirname,'../')+'productManager.js');

const router = Router();

const products = new productManager(path.join(__dirname,'../')+'products.json');

router.get('/', (req,res) => {
  const allProducts = products.getProducts();
  if ( !req.query.limit ){
    res.send({allProducts});
  }
  else {
    const limitProducts = allProducts.slice(0, req.query.limit);
    res.send({limitProducts});
  }
});

router.get('/:pid', (req, res) => {
  if ( isNaN(req.params.pid) ) {
    res.send('Enter a valid ID');
  } else {
    const product = products.getProductByID(req.params.pid);
    res.send({product});
  }
});

router.post('/', (req, res) => {
  try {
    const newProduct = products.addProduct(req.body);
    res.status(200).json({message: "Product Created", product: newProduct})
  } catch (error) {
    res.status(500).json({error})
  }
});
 
router.put('/:pid', (req,res) => {
  try {
    products.updateProduct(parseInt(req.params.pid), req.body)
    res.status(200).json({message: 'Product Updated'})
  } catch (error) {
    res.status(500).json({error})
  }
})

router.delete('/:pid', (req,res) => {
  try {
    products.deleteProduct(parseInt(req.params.pid), req.body)
    res.status(200).json({message: 'Product Deleted'})
  } catch (error) {
    res.status(500).json({error})
  }
})
module.exports = router;
