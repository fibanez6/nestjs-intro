import * as mongoose from "mongoose";

export const ArticleSchema = new mongoose.Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
});

export interface Article extends mongoose.Document {
    id: string;
    name: string;
    description: string;
    price: number;
}