import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';
import { ProductsService } from 'src/services/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId') productId: string) {
    return this.productsService.findOne(productId);
  }

  @Get()
  getProducts(
    @Query('limit') limit: number = 1000,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string = 'xyz',
  ) {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put('id')
  update(@Param('id') id: any, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }
}
