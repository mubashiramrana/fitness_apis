import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MemberDocument = HydratedDocument<Members>;

@Schema({ timestamps: true })
export class Members {
        
    @Prop()
    email: string;

    @Prop()
    fullName: string;

    @Prop()
    phoneNo: string;

    @Prop()
    address: string;

    @Prop()
    joiningDate : Date;

}

export const MemberSchema = SchemaFactory.createForClass(Members);