const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');
const port = 3000;

const filePath = 'productos.json'; 
const manager = new ProductManager(filePath);


app.use(express.json());


app.get('/products', (req, res) => {
    const limit = req.query.limit;
    const products = manager.getProducts();

    if (limit) {
        const limitedProducts = products.slice(0, limit);
        res.json(limitedProducts);
    } else {
        res.json(products);
    }
});

// Ruta para obtener un producto por ID
app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = manager.getProductById(productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: "Producto no encontrado" });
    }
});

app.listen(port, () => {
    console.log(`Servidor Express en ejecución en el puerto ${port}`);
});