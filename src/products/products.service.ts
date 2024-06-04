import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  private Productos: Product[] = [];
  private IdContador: number = 1;

  create(product: Omit<Product, 'id'>): Product {
    const newProduct: Product = { Id: this.IdContador++, ...product };
    this.Productos.push(newProduct);
    return newProduct;
  }

  findAll(): Product[] {
    return this.Productos;
  }

  findOne(id: number): Product {
    const product = this.Productos.find((prod) => prod.Id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  update(id: number, updatedProduct: Omit<Product, 'id'>): Product {
    const productIndex = this.Productos.findIndex((prod) => prod.Id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const updated = { id, ...updatedProduct };
    this.Productos[productIndex] = updated;
    return updated;
  }

  remove(id: number): void {
    const productIndex = this.Productos.findIndex((prod) => prod.Id === id);
    if (productIndex === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.Productos.splice(productIndex, 1);
  }
}
