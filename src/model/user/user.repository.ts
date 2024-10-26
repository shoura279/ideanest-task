import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { User } from './user.schema';

export class UserRepository extends AbstractRepository<User> {
  constructor(@InjectModel(User.name) userModel: Model<User & Document>) {
    super(userModel);
  }
}
