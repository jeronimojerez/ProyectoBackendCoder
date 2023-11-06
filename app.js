const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');
const port = 3000;

app.use(express.json());

// Ejemplo a ver si funciona 
const filePath = 'productos.json';
const manager = new ProductManager(filePath);


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



//TEST

manager.addProduct({
    title: "Producto 1",
    description: "Descripción del Producto 1",
    price: 19.99,
    thumbnail: "imagen1.jpg",
    code: "P1",
    stock: 10,
});

manager.addProduct({
    title: "Producto 2",
    description: "Descripción del Producto 2",
    price: 29.99,
    thumbnail: "imagen2.jpg",
    code: "P2",
    stock: 5,
});

console.log(manager.getProducts());

const product = manager.getProductById(2);
if (product) {
    console.log("Producto encontrado:", product);
}

manager.updateProduct(2, { price: 39.99 }); // Actualizar el precio del Producto 2
manager.deleteProduct(1); // Eliminar el Producto 1