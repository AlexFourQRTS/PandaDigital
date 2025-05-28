import { Controller, Get, Post, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { TechnologiesService } from '../services/technologies.service';
import { CreateTechnologyDto } from '../dto/create-technology.dto';

@Controller('api/technologies')
export class TechnologiesController {
  constructor(private readonly technologiesService: TechnologiesService) {}

  @Get()
  async findAll() {
    return this.technologiesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.technologiesService.findOne(id);
  }

  @Post()
  async create(@Body() createDto: CreateTechnologyDto) {
    return this.technologiesService.create(createDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.technologiesService.remove(id);
    return { message: 'Technology deleted successfully' };
  }
}