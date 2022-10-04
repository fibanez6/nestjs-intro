import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ArticlesModule } from './articles/articles.module';
import { MongoMemoryServer } from 'mongodb-memory-server';

@Module({
  imports: [
    ProductsModule, 
    ArticlesModule,
    // *************************
    // ** External connection **
    // *************************
    // MongooseModule.forRoot(
    //   'mongodb+srv://Admin:g8r5UR2M4xgysTYe@cluster0.neggdid.mongodb.net/nestjs-demo?retryWrites=true&w=majority'
    //   ), 

    // ***************
    // ** In memory **
    // ***************
    MongooseModule.forRootAsync({
      imports: [],
      useFactory: async () => {
        let mongo = await MongoMemoryServer.create();
        const uri = await mongo.getUri();
        return {
          uri: uri,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
