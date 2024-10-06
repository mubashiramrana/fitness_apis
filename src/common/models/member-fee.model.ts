import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type MembersFeeDocument = HydratedDocument<MembersFee>;

@Schema({ timestamps: true })
export class MembersFee {
    @Prop({ type: mongoose.Schema.Types.ObjectId })
    memberId: any;

    @Prop()
    month: string;

    @Prop()
    year: string;

    @Prop()
    amount: number;

    @Prop()
    remainingAmount :number;

    @Prop()
    paymentMode:string;
}

export const MembersFeeSchema = SchemaFactory.createForClass(MembersFee);