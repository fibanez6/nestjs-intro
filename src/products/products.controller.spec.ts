import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { v4 as uuidv4 } from 'uuid';

describe('ProductsController', () => {
  let controller: ProductsController;

  // NOTE: Product Methods dont contain async before function name (Articles methods have), 
  // so you dont need to use resolvers 
  const mockProductsService = {
    insertProduct: jest.fn().mockImplementation(() => uuidv4())
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService]
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create an product', () => {
    expect(controller.addProduct('testTitle', 'testDescription', 1)).toEqual({
      id: expect.any(String)
    });
  });

});
