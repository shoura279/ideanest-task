import { Body, Controller } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { CreateOrganizationDTO } from './dto';
import { CreateResponse } from 'src/common/dto/response.dto';
import { Organization } from 'src/model/organization/organization.schema';
import { OrganizationFactoryService } from './factory';

@Controller()
export class OrganizationController {
  constructor(
    private organizationService: OrganizationService,
    private organizationFactoryService: OrganizationFactoryService,
  ) {}
  public async create(@Body() createOrganizationDTO: CreateOrganizationDTO) {
    const createOrganizationResponse = new CreateResponse<Organization>();
    try {
      const organization = this.organizationFactoryService.create(
        createOrganizationDTO,
      );
      const newOrganization =
        await this.organizationService.create(organization);
      createOrganizationResponse.data = newOrganization;
      createOrganizationResponse.success = true;
    } catch (error) {
      throw error;
    }
    return createOrganizationResponse;
  }
  
}
