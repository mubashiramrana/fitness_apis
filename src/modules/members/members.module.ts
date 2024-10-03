import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Members, MemberSchema } from 'src/common/models/members.model';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: Members.name, schema: MemberSchema }])
  ],
  providers: [MembersService],
  controllers: [MembersController]
})
export class MembersModule {}
