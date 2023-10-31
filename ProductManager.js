const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.loadFromFile();
    }

    loadFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (err) {
            // Si el archivo no existe o hay un error al leerlo, se inicializa con un arreglo vacío.
            this.products = [];
        }
    }

    saveToFile() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data, 'utf8');
    }

    addProduct(productData) {
        const { title, description, price, thumbnail, code, stock } = productData;

        if (!title || !description || !price || !thumbnail || !code || stock === undefined) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        const codeExists = this.products.some((product) => product.code === code);
        if (codeExists) {
            console.log("El código ya existe. No se puede agregar el producto.");
            return;
        }

        const newProduct = {
            id: this.products.length + 1, // ID autoincrementable
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(newProduct);
        this.saveToFile();
        console.log("Producto agregado con éxito.");
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado");
            return null;
        }
    }

    updateProduct(id, updatedProductData) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            console.log("Producto no encontrado");
            return;
        }

        this.products[productIndex] = { ...this.products[productIndex], ...updatedProductData };
        this.saveToFile();
        console.log("Producto actualizado con éxito.");
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            console.log("Producto no encontrado");
            return;
        }

        this.products.splice(productIndex, 1);
        this.saveToFile();
        console.log("Producto eliminado con éxito.");
    }
}



// Ejemplo a ver si funciona 
const filePath = 'productos.json';
const manager = new ProductManager(filePath);

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
