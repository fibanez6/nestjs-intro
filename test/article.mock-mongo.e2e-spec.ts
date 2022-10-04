import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ArticlesModule } from '../src/articles/articles.module';
import { getModelToken } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

// ************************************
// *** E2E tests with mocking Mongo ***
// ************************************
describe('ArticleController (e2e)', () => {
  let app: INestApplication;

  const mockRepository = {
    // ************************
    // *** Resolver Version ***
    // ************************
    // find: jest.fn().mockResolvedValue(
    //   [{
    //     id: uuidv4(),
    //     name: "test",
    //     description: "desc",
    //     price: 1
    //   }]
    // ),

    // ************************
    // **** Promise Version *** 
    // ************************
    find: jest.fn().mockImplementation(() => Promise.resolve(
      [{
        id: uuidv4(),
        name: "test",
        description: "desc",
        price: 1
      }]
    )),
    create: jest.fn().mockImplementation( (article) => Promise.resolve({
      id: uuidv4(),
      ...article
    })),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ArticlesModule],
    })
      .overrideProvider(getModelToken('Article'))
      .useValue(mockRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/articles (GET)', () => {
    return request(app.getHttpServer())
      .get('/articles')
      .expect(200);
  });

  it('/articles (POST)', () => {
    const inputArticle = {
      name: 'Root',
      description: 'I am Root',
      price: 1
    }

    return request(app.getHttpServer())
      .post('/articles')
      .send(inputArticle)
      .expect(201)
      .expect('Content-Type', /json/ )
      .then(response => {
        expect(response.body).toEqual({
          id: expect.any(String)
        })
      });
  });

});
