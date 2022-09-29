import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './article.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }])],
  providers: [ArticlesService],
  controllers: [ArticlesController]
})
export class ArticlesModule {}
