import { Module } from '@nestjs/common';
import { TechnologiesController } from './controllers/technologies.controller';
import { TechnologiesService } from './services/technologies.service';

@Module({
  controllers: [TechnologiesController],
  providers: [TechnologiesService],
  exports: [TechnologiesService],
})
export class TechnologiesModule {}