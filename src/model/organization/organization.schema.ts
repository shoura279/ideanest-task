import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Organization {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  readonly _id?: mongoose.Schema.Types.ObjectId;
}
export const organizationSchema = SchemaFactory.createForClass(Organization);
