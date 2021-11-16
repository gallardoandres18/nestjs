import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { nanoid } from 'nanoid';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Descripción',
      price: 122,
      image: null,
      stock: 2,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const product = this.products.find((item) => item.id === id);

    if (!product) {
      throw new NotFoundException(`Product ${id} not found`);
    }

    return product;
  }

  create(payload: CreateProductDto) {
    const newProduct = {
      id: nanoid(4),
      ...payload,
    };
    this.products.push(newProduct);

    return newProduct;
  }

  delete(id: string) {
    this.products = this.products.filter((product) => product.id !== id);
    return this.products;
  }

  update(id: string, payload: UpdateProductDto) {
    let product = this.findOne(id);

    if (!product) {
      return null;
    }

    const index = this.products.findIndex((product) => product.id === id);
    this.products[index] = { ...product, ...payload };

    return this.products[index];
  }
}
