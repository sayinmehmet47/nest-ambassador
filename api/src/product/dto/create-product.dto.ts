import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  title?: string;
  description?: string;
  image?: string;
  price?: string;
}
