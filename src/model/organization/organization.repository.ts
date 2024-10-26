import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { AbstractRepository } from '../abstract.repository';
import { Organization } from './organization.schema';

export class OrganizationRepository extends AbstractRepository<Organization> {
  constructor(
    @InjectModel(Organization.name)
    organizationModel: Model<Organization & Document>,
  ) {
    super(organizationModel);
  }
}
