const express = require(`express`);
const productsRouter = require(`./routes/products.router.js`);
const cartsRouter = require(`./routes/carts.router.js`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

/** Setting routes */
app.use(`/api/products`, productsRouter);
app.use(`/api/carts`, cartsRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Escuchando al puerto ${PORT}`)
})