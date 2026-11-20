import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/book.dto.create';
import { UpdateBookDto } from './dto/book.dto.update';
import { PositiveIdPipe } from '../common/pipes/positive-id.pipe';
import { RequestTimingInterceptor } from '../common/interceptors/request-timing.interceptors';
import { BooksWriteGuard } from '../common/guards/books-write.guard';
import { UserAgent } from '../common/decorators/user-agent.decorator';

@Controller('books')
@UseInterceptors(RequestTimingInterceptor)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UseGuards(BooksWriteGuard)
  create(@Body() book: CreateBookDto) {
    return this.booksService.create(book);
  }

  @Get()
  findAll(@UserAgent() userAgent: string) {
    console.log(`Client: ${userAgent}`);
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@UserAgent() userAgent: string, @Param('id', ParseIntPipe, PositiveIdPipe) id: number) {
  console.log(`Client: ${userAgent}`);
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(BooksWriteGuard)
  update(@Param('id', ParseIntPipe, PositiveIdPipe) id: number, @Body() book: UpdateBookDto) {
    return this.booksService.update(id, book);
  }

  @Delete(':id')
  @UseGuards(BooksWriteGuard)
  remove(@Param('id', ParseIntPipe, PositiveIdPipe) id: number) {
    return this.booksService.remove(id);
  }
}
