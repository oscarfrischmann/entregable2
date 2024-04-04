import fs from 'fs';
const jsonProducts = [];
const Products = [];

// fs.existsSync('products.json')
// 	? console.log('existe')
// 	: fs.writeFileSync('./products.json', 'utf-8');

class ProductManager {
	constructor(title, description, price, thumbnail, code, stock) {
		// this.products = Products;
		this.title = title;
		this.description = description;
		this.price = price;
		this.thumbnail = thumbnail;
		this.code = code;
		this.stock = stock;
		this.id;
		this.path = './products.json';
	}

	addProduct(product) {
		let lastIndexOfProducts = Products.length;
		this.id = lastIndexOfProducts++;

		const values = Object.values(product);
		const notProvided = values.includes(undefined);
		if (notProvided) {
			console.log('Please provide all the required fields\n\n');
		} else {
			const existsInProducts = Products.find(({ code }) => code === product.code);
			if (existsInProducts) {
				console.log(`The product with this code already exists.\n`);
			} else {
				Products.push(product);
				console.log(`Producto ${this.code} agregado\n\n`);
				console.log(Products);
				(async () => {
					try {
						let productJSON = await JSON.stringify(product);
						Products.push(productJSON);
						await fs.appendFileSync('./products.json', productJSON, 'utf-8');
					} catch (err) {
						console.log(err);
					}
				})();
			}
		}
	}

	getProducts() {
		console.log('Productos agregados:');
		Products.forEach((product) => {
			console.log(`Title: ${product.title}`);
			console.log(`Description: ${product.description}`);
			console.log(`Price: $${product.price}`);
			console.log(`Code: ${product.code}`);
			console.log(`Code: ${product.id}`);
			console.log(`Stock:  ${product.stock}\n\n`);
		});
	}

	getProductrById(id) {
		console.log(`Producto filtrado por código: ${id}`);

		let getCode = Products.find((product) => product.id === id);
		if (getCode) {
			for (let prop in getCode) {
				if (prop === 'price') {
					console.log(`${prop}: $${getCode[prop]}`);
				} else {
					console.log(`${prop}: ${getCode[prop]}`);
				}
			}
		} else {
			console.log('Product not found');
		}
	}
}
let product;

product = new ProductManager('Agua', 'Fresca', 10, 'http://google.com', 'AGU01', 5);
product.products = 0;
product.addProduct(product);

product = new ProductManager('Agua', 'Fresca', 10, 'http://google.com', 'AGU01', 5);
product.products = 0;
product.addProduct(product);

product = new ProductManager('Vino', 'Mendocino', 15, 'http://yahoo.com', 'VIN01', 5);
product.products = 0;
product.addProduct(product);

product = new ProductManager('cerveza', 'quilmes', 20, 'http://bing.com', 'CERV01', 5);
product.products = 0;
product.addProduct(product);

product = new ProductManager('Agua', 'Fresca', 10, 'http://google.com', 'AGU01', 5);
product.products = 0;
product.addProduct(product);

product = new ProductManager('Vino', 'Mendocino', 15, 'http://yahoo.com', 'VIN01', 5);
product.products = 0;
product.addProduct(product);

product = new ProductManager('Gin', 'Inglés', 25, 'http://yahoo.com', 'GIN01', 5);
product.products = 0;
product.addProduct(product);

product.getProducts();

product.getProductrById(1);
