import mongoose from 'mongoose';

export class Organization {
  name: string;
  description: string;
  _id?: mongoose.Schema.Types.ObjectId;
}
