import { CreateOrganizationDTO } from '../dto';
import { Organization } from '../entity';

export class OrganizationFactoryService {
  create(createOrganizationDTO: CreateOrganizationDTO) {
    const newOrganization = new Organization();
    newOrganization.name = createOrganizationDTO.name;
    newOrganization.description = createOrganizationDTO.description;

    return newOrganization;
  }
}
