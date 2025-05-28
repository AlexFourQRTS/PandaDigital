import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';

import { DatabaseModule } from './database/database.module';
import { BlogModule } from './modules/blog/blog.module';
import { ChatModule } from './modules/chat/chat.module';
import { MediaModule } from './modules/media/media.module';
import { NewsModule } from './modules/news/news.module';
import { TechnologiesModule } from './modules/technologies/technologies.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    // Rate limiting
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    
    // Static file serving
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'media'),
      serveRoot: '/media',
    }),
    
    // Core modules
    DatabaseModule,
    UsersModule,
    BlogModule,
    ChatModule,
    MediaModule,
    NewsModule,
    TechnologiesModule,
  ],
})
export class AppModule {}