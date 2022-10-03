import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { v4 as uuidv4 } from 'uuid';

describe('ArticlesService', () => {
  let service: ArticlesService;

  const mockRepository = {
    findById: jest.fn().mockImplementation((id) => Promise.resolve({
      id: id,
      name: "test",
      description: "desc",
      price: 1
    })),
  };

  beforeEach(async () => {
   const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        { provide: getModelToken('Article'), useValue: mockRepository }
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should fetch an article', async () => {
  //   const id = uuidv4();
  //   expect(await service.getArticle(id)).toEqual({
  //     id: id,
  //     name: expect.any(String),
  //     description: expect.any(String),
  //     price: expect.any(Number)
  //   });
  // });

  it('should fetch an article', () => {
    const id = uuidv4();
    expect(service.getArticle(id)).resolves.toEqual({
      id: id,
      name: expect.any(String),
      description: expect.any(String),
      price: expect.any(Number)
    });
  });

});
