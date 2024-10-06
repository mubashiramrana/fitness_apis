import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Members, MemberSchema } from 'src/common/models/members.model';
import { MembersFee, MembersFeeSchema } from 'src/common/models/member-fee.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Members.name, schema: MemberSchema },
      { name: MembersFee.name, schema: MembersFeeSchema }
    ])
  ],
  providers: [MembersService],
  controllers: [MembersController]
})
export class MembersModule { }
