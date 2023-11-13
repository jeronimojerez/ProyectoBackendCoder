const fs = require('fs');

class CartManager {
    constructor(filePath) {
        this.path = filePath;
        this.carts = [];
        this.loadFromFile();
    }

    loadFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.carts = JSON.parse(data);
        } catch (err) {
            // Si el archivo no existe o hay un error al leerlo, se inicializa con un arreglo vacío.
            this.carts = [];
        }
    }

    saveToFile() {
        const data = JSON.stringify(this.carts, null, 2);
        fs.writeFileSync(this.path, data, 'utf8');
    }

    addCart(cartData) {
        const { products } = cartData;
       
        if (!products || products.length <=0 ) {
            console.log("Se requiren productos", cartData);
            return "Se requiren productos";
        }

        const newCart = {
            id: this.carts.length + 1, // ID autoincrementable
            products
        };

        this.carts.push(newCart);
        this.saveToFile();
        return;
    }

    getCartById(id) {
        const cart = this.carts.find((cart) => cart.id === id);
        if (cart) {
            return cart;
        } else {
            console.log("Cart no encontrado");
            return null;
        }
    }

    addProductToCart(id, addId) {
        const cartIndex = this.carts.findIndex((cart) => cart.id === id);
        if (cartIndex === -1) {
            return "Carro no encontrado";
        }

        this.carts[cartIndex].products.push(addId);
        this.saveToFile();
        console.log("Carro actualizado con éxito.");
    }
}


module.exports=CartManager
