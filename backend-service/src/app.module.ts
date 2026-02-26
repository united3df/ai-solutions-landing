import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SkillsModule } from './skills/skills.module';
import { GeminiModule } from './gemini/gemini.module';
import { TopicsModule } from './topics/topics.module';
import { BlogModule } from './blog/blog.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    SkillsModule,
    GeminiModule,
    TopicsModule,
    BlogModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
