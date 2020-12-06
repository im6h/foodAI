import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from '../services/cities.service';
import { WardsService } from '../services/wards.service';
import { ProvinceService } from '../services/province.service';
import { QueryLocationProvinceApp, QueryLocationWardsApp, QueryLocationCitiesApp } from '../dto/locations.app.dto';

@ApiTags('Locations')
@Controller('app/locations')
export class LocationAppController {
  constructor(
    public readonly provinceService: ProvinceService,
    public readonly citiesService: CitiesService,
    public readonly wardsService: WardsService,
  ) { }

  @Get('cities')
  async getAllCities(@Query() query: QueryLocationCitiesApp) {
    return await this.citiesService.getAllCities(query);
  }
  @Get('province')
  async getAllProvince(@Query() query: QueryLocationProvinceApp) {
    return await this.provinceService.getAllProvince(query);
  }
  @Get('wards')
  async getAllWards(@Query() query: QueryLocationWardsApp) {
    return await this.wardsService.getAllWards(query);
  }
}
