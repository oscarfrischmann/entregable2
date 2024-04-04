class ProductManager {
	constructor(title, description, price, thumbnail, code, stock) {
		this.products = Products;
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
				this.products.push(product);
				console.log(`Producto ${this.code} agregado\n\n`);
				console.log(Products);
				(async () => {
					try {
						let productsJSON = await JSON.stringify(this.products);

						console.log(productsJSON);
					} catch (err) {
						console.log(err);
					}
				})();
			}
		}
	}
}
