import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { MediaService } from '../services/media.service';
import { CreateMediaFileDto } from '../dto/create-media-file.dto';
import { UpdateMediaProtectionDto } from '../dto/update-media-protection.dto';
import * as path from 'path';
import * as fs from 'fs';

@Controller('api/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  async findAll(@Query('type') type?: string) {
    return this.mediaService.findAll(type);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mediaService.findOne(id);
  }

  @Get(':id/:filename')
  async serveFile(
    @Param('id', ParseIntPipe) id: number,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const file = await this.mediaService.findOne(id);
    const filePath = path.join(process.cwd(), 'media', file.filename);
    
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException('File not found');
    }

    res.setHeader('Content-Disposition', `attachment; filename="${file.originalName}"`);
    res.sendFile(filePath);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new NotFoundException('No file uploaded');
    }

    const mediaFile = await this.mediaService.create({
      filename: file.filename,
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      type: file.mimetype.split('/')[0],
    });

    return mediaFile;
  }

  @Patch(':id/protection')
  async updateProtection(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateMediaProtectionDto,
  ) {
    return this.mediaService.updateProtection(id, updateDto.isProtected);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.mediaService.remove(id);
    return { message: 'Media file deleted successfully' };
  }
}