import fs from 'fs';

const Products = [];
fs.writeFileSync('./products.json', JSON.stringify(Products), 'utf-8');

class ProductManager {
	constructor(title, description, price, thumbnail, code, stock, path) {
		this.title = title;
		this.description = description;
		this.price = price;
		this.thumbnail = thumbnail;
		this.code = code;
		this.stock = stock;
		this.id;
		this.path = path;
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
				(async () => {
					try {
						await Products.push(product);
						console.log(`Producto ${this.code} agregado\n\n`);
						let productJSON = await JSON.stringify(Products);
						await fs.promises.writeFile(this.path, productJSON, 'utf-8');
					} catch (e) {
						console.log('addProducts', e);
					}
				})();
			}
		}
	}

	getProducts() {
		(async () => {
			try {
				let getProducts = await fs.promises.readFile('./products.json');
				let parseProducts = await JSON.parse(getProducts);
				await console.log('Productos agregados:');
				await parseProducts.forEach((product) => {
					console.log(`Title: ${product.title}`);
					console.log(`Description: ${product.description}`);
					console.log(`Price: $${product.price}`);
					console.log(`Code: ${product.code}`);
					console.log(`Code: ${product.id}`);
					console.log(`Stock:  ${product.stock}\n\n`);
				});
			} catch (e) {
				console.log('getProducts', e);
			}
		})();
	}

	getProductrById(id) {
		(async () => {
			let getProducts = await fs.promises.readFile('./products.json');
			let parseProducts = await JSON.parse(getProducts);

			let getCode = await parseProducts.find((product) => product.id === id);
			await console.log(`Producto filtrado por código: ${id}`);
			if (getCode) {
				for (let prop in getCode) {
					if (prop === 'price') {
						console.log(`${prop}: $${getCode[prop]}`);
					} else {
						console.log(`${prop}: ${getCode[prop]}`);
					}
				}
			} else {
				console.log(`Producto con id: ${id} NO ENCONTRADO`);
			}
		})();
	}
}

let product;

product = new ProductManager('Agua', 'Fresca', 'http://google.com', 'AGU01', 5, './products.json');
product.addProduct(product);

product = new ProductManager('Agua', 'Fresca', 10, 'http://google.com', 'AGU01', 5, './products.json');
product.addProduct(product);

product = new ProductManager('Agua', 'Fresca', 10, 'http://google.com', 'AGU01', 5, './products.json');
product.addProduct(product);

product = new ProductManager('Vino', 'Mendocino', 15, 'http://yahoo.com', 'VIN01', 5, './products.json');
product.addProduct(product);

product = new ProductManager('cerveza', 'quilmes', 20, 'http://bing.com', 'CERV01', 5, './products.json');
product.addProduct(product);

product = new ProductManager('Agua', 'Fresca', 10, 'http://google.com', 'AGU01', 5, './products.json');
product.addProduct(product);

product = new ProductManager('Vino', 'Mendocino', 15, 'http://yahoo.com', 'VIN01', 5, './products.json');
product.addProduct(product);

product = new ProductManager('Gin', 'Inglés', 25, 'http://yahoo.com', 'GIN01', 5, './products.json');
product.addProduct(product);

product = new ProductManager('Coca-Cola', 'con hielo', 5, 'http://yahoo.com', 'KO01', 5, './products.json');
product.addProduct(product);

product.getProducts();

product.getProductrById(3);
