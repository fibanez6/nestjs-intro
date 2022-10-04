import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { v4 as uuidv4 } from 'uuid';

describe('ArticlesController', () => {
  let controller: ArticlesController;

  // NOTE: Articles Methods contain 'async' before the function name (Article methods dont have), 
  // so you need to use resolvers 
  const mockArticlesService = {
    insertArticle: jest.fn().mockResolvedValueOnce(uuidv4())
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [ArticlesService]
    })
      .overrideProvider(ArticlesService)
      .useValue(mockArticlesService)
      .compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be create an article', () => {
    expect(controller.addArticle('testName', 'testDescription', 1)).resolves.toEqual({
      id: expect.any(String)
    });
  });

});
