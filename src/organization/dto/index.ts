import { IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';

export class CreateOrganizationDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  readonly _id?: mongoose.Schema.Types.ObjectId;
}
