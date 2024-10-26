import mongoose from 'mongoose';

export class User {
  name: string;
  email: string;
  password: string;
  readonly _id?: mongoose.Schema.Types.ObjectId;
}
