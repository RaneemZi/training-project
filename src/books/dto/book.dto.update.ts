import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './book.dto.create';

export class UpdateBookDto extends PartialType(CreateBookDto, {
  skipNullProperties: false,
}) {}
