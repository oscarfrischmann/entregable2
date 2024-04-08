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
						fs.promises.writeFile(this.path, productJSON, 'utf-8');
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

	updateProduct(id, price, stock) {
		(async () => {
			try {
				let getProducts = await fs.promises.readFile('./products.json');
				let parseProducts = await JSON.parse(getProducts);
				let getCode = await parseProducts.find((product) => product.id === id);
				let index = await parseProducts.indexOf(getCode);
				console.log('Producto sin modificar', getCode);
				getCode.price = price;
				getCode.stock = stock;
				console.log('Producto modificado', getCode);
				parseProducts.splice(index, 1, getCode);
				await fs.promises.writeFile(getCode.path, JSON.stringify(parseProducts));
			} catch (e) {
				console.log(e);
			}
		})();
	}

	deleteProduct(id) {
		(async () => {
			try {
				let getProducts = await fs.promises.readFile('./products.json');
				let parseProducts = await JSON.parse(getProducts);
				console.log('DELETE', parseProducts);
				let getCode = await parseProducts.find((product) => product.id === id);
				console.log('getCODE', getCode);
				let index = await parseProducts.indexOf(getCode);
				console.log(index, 'indexx');
				await parseProducts.splice(index, 1);
				console.log('productos splice', parseProducts);
				let newProductList = JSON.stringify(parseProducts);
				fs.promises.writeFile(getCode.path, newProductList, 'utf-8');
			} catch (e) {
				console.log(e);
			}
		})();
	}
}

let product;

product = new ProductManager('Agua', 'Fresca', 'http://google.com', 'AGU01', 5, './products.json');
product.addProduct(product);
console.log('1');
product = new ProductManager('Agua', 'Fresca', 10, 'http://google.com', 'AGU01', 5, './products.json');
product.addProduct(product);
console.log('2');

product = new ProductManager('Agua', 'Fresca', 10, 'http://google.com', 'AGU01', 5, './products.json');
product.addProduct(product);
console.log('3');

product = new ProductManager('Vino', 'Mendocino', 15, 'http://yahoo.com', 'VIN01', 5, './products.json');
product.addProduct(product);
console.log('4');

product = new ProductManager('cerveza', 'quilmes', 20, 'http://bing.com', 'CERV01', 5, './products.json');
product.addProduct(product);
console.log('5');

product = new ProductManager('Agua', 'Fresca', 10, 'http://google.com', 'AGU01', 5, './products.json');
product.addProduct(product);
console.log('6');

product = new ProductManager('Vino', 'Mendocino', 15, 'http://yahoo.com', 'VIN01', 5, './products.json');
product.addProduct(product);
console.log('7');

product = new ProductManager('Gin', 'Inglés', 25, 'http://yahoo.com', 'GIN01', 5, './products.json');
product.addProduct(product);
console.log('8');

product = new ProductManager('Coca-Cola', 'con hielo', 5, 'http://yahoo.com', 'KO01', 5, './products.json');
product.addProduct(product);
console.log('9');

product.getProducts();
console.log('10');

product.getProductrById(3);
console.log('11');

product.updateProduct(3, 500, 4);
console.log('12');

setTimeout(() => {
	product.deleteProduct(1);
	console.log('13');
}, 500);
