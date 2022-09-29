import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from "./product.model";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {

    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number): string {
        const id = uuidv4();
        const newProduct = new Product(id, title, desc, price);
        this.products.push(newProduct);
        return id;
    }

    getProducts() {
        // returns a copy of the product array - no the ref to the array memory location
        return [...this.products];
    }


    getProduct(id: string) {
        const product = this.findProduct(id)[0];

        // returns a copy of the product
        return { ...product };
    }

    updateProduct(id: string, title: string, desc: string, price: number) {
        const [product, index] = this.findProduct(id);
        const updatedProduct = {...product}
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    deleteProduct(id: string) {
        const [_, index] = this.findProduct(id);
        this.products.splice(index, 1);
    }

    private findProduct(id: string): [Product, number] {
        const productIdx = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIdx]
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return [product, productIdx];
    }

}
