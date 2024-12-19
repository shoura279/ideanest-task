import { ConflictException, Injectable } from '@nestjs/common';
import { Organization } from './entity';
import { OrganizationRepository } from 'src/model/organization/organization.repository';

@Injectable()
export class OrganizationService {
  constructor(private organizationRepository: OrganizationRepository) {}

  async create(organization: Organization) {
    const organizationExist = await this.organizationRepository.getOne({
      name: organization.name,
    });
    if (organization) {
      throw new ConflictException('organization already exist');
    }
    const newOrganization =
      await this.organizationRepository.create(organization);

    return newOrganization;
  }
}
