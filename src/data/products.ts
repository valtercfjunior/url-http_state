export interface Product {
	id: string;
	name: string;
	price: number;
}

interface GetProductsFilter {
	id: string | null
	name: string | null
}

export async function getProducts({id, name}: GetProductsFilter) {
	await new Promise((resolve) => setTimeout(resolve, 1000));
   let products =  [
		{ id: "1", name: "Product 1", price: 25 },
		{ id: "2", name: "Product 2", price: 30 },
		{ id: "3", name: "Product 3", price: 40 },
		{ id: "4", name: "Product 4", price: 15 },
		{ id: "5", name: "Product 5", price: 55 },
		{ id: "6", name: "Product 6", price: 22 },
		{ id: "7", name: "Product 7", price: 50 },
		{ id: "8", name: "Product 8", price: 35 },
		{ id: "9", name: "Product 9", price: 45 },
	/* 	{ id: "10", name: "Product 10", price: 28 },
		{ id: "11", name: "Product 11", price: 48 },
		{ id: "12", name: "Product 12", price: 21 },
		{ id: "13", name: "Product 13", price: 42 },
		{ id: "14", name: "Product 14", price: 32 },
		{ id: "15", name: "Product 15", price: 37 },
		{ id: "16", name: "Product 16", price: 27 },
		{ id: "17", name: "Product 17", price: 23 },
		{ id: "18", name: "Product 18", price: 47 },
		{ id: "19", name: "Product 19", price: 29 },
		{ id: "20", name: "Product 20", price: 44 }, */
	];

	if(id) {
		products = products.filter(products => products.id.includes(id))
	}
	if(name) {
		products = products.filter(products => products.name.includes(name))
	}

	return products
}

interface CreateProductRequest {
	name: string;
	price: number;
}

export async function createProduct(data: CreateProductRequest) {
	await new Promise((resolve) => setTimeout(resolve, 1000));

	return {
		id: crypto.randomUUID(),
		name: data.name,
		price: data.price,
	};
}
