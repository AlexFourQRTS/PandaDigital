import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
import { NewsService } from '../services/news.service';
import { CreateNewsArticleDto } from '../dto/create-news-article.dto';

@Controller('api/news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.newsService.findOne(id);
  }

  @Post()
  async create(@Body() createDto: CreateNewsArticleDto) {
    return this.newsService.create(createDto);
  }
}