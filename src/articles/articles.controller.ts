import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
    
    constructor(private readonly articlesServices: ArticlesService) { }
    
    @Post()
    async addArticle(
        @Body('name') artName: string,
        @Body('description') artDesc: string,
        @Body('price') artPrice: number
    ) {
        const artId = await this.articlesServices.insertArticle(artName, artDesc, artPrice);
        return { id: artId };
    }

    @Get()
    async getAllArticles() {
        return await this.articlesServices.getArticles();
    }

    @Get(':id')
    async getArticle(@Param('id') artId: string) {
        return await this.articlesServices.getArticle(artId);
    }

    @Patch(':id')
    async updateArticle(
        @Param('id') artId: string,
        @Body('name') artName: string,
        @Body('description') artDesc: string,
        @Body('price') artPrice: number
    ) {
        await this.articlesServices.updateArticle(artId, artName, artDesc, artPrice);
        return null;
    }

    @Delete(':id')
    async removeArticle(@Param('id') artId: string) {
        await this.articlesServices.deleteArticle(artId);
        return null;
    }

}
