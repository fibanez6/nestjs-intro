import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.model';

@Injectable()
export class ArticlesService {

    constructor(@InjectModel('Article') private readonly articleModel: Model<Article>) { };

    async insertArticle(name: string, desc: string, price: number): Promise<string> {
        const newArticle = await this.articleModel.create({
            name,
            description: desc,
            price
        })

        // ****************************************************************************
        // ** Other way to create an Article, but I dunno how to mock teh constructor *
        // ****************************************************************************
        // const newArticle = new this.articleModel({
        //     name,
        //     description: desc,
        //     price
        // });
        // const result = await newArticle.save(); // returns a promise
        // return result.id as string; // this also return a promise
        return newArticle.id as string; // this also return a promise
    }

    async getArticles() {
        const articles = await this.articleModel.find();
        return articles.map((art) => ({
            id: art.id,
            name: art.name,
            description: art.description,
            price: art.price,
        })); // to cleanup extra fields added by mongo
    }

    async getArticle(id: string) {
        const article = await this.findArticle(id);
        console.log(article)
        return {
            id: article.id,
            name: article.name,
            description: article.description,
            price: article.price
        };
    }

    async updateArticle(id: string, name: string, desc: string, price: number): Promise<void> {
        const updatedArticle = await this.findArticle(id);
        if (name) {
            updatedArticle.name = name;
        }
        if (desc) {
            updatedArticle.description = desc;
        }
        if (price) {
            updatedArticle.price = price;
        }
        updatedArticle.save();
    }

    async deleteArticle(id: string): Promise<void> {
        try {
            await this.articleModel.findByIdAndDelete(id);
        } catch (error) {
            throw new NotFoundException('Could not find article');
        }
    }

    private async findArticle(id: string): Promise<Article> {
        let article;
        try {
            article = await this.articleModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find article');
        }

        return article;
    }

}
