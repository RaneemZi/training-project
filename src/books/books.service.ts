import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/book.dto.create';
import { UpdateBookDto } from './dto/book.dto.update';

@Injectable()
export class BooksService {
  constructor(private readonly prisma: PrismaService) {}

  create(book: CreateBookDto) {
    return this.prisma.book.create({
      data: book,
    });
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book With ID ' + id + ' Not Found');
    }
    return book;
  }

   update(id: number, book: UpdateBookDto) {
   return this.prisma.book.update({
      where: { id },
      data: book,
    });

  }

  async remove(id: number) {
    await this.prisma.book.delete({
      where: { id },
    });

    return 'The Book Has Been Deleted';
  }
}
