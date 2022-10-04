import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ArticlesModule } from '../src/articles/articles.module';
import { v4 as uuidv4 } from 'uuid';
import { closeInMongodConnection, rootMongooseTestModule } from './MongooseTest.module';
import { ArticleSchema } from '../src/articles/article.model';
import { MongooseModule } from '@nestjs/mongoose';

// **************************************
// *** E2E tests with in-memory Mongo ***
// **************************************
describe('ArticleController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ArticlesModule,
        rootMongooseTestModule(),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await closeInMongodConnection();
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
