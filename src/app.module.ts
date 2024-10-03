import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MembersModule } from './modules/members/members.module';
import { CommonModule } from './common/common.module';
import { SharedModule } from './modules/shared/shared.module';
import { MongoModule } from './database/mongo/mongo.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [MembersModule, CommonModule, SharedModule, MongoModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
