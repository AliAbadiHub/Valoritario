import { Injectable } from '@nestjs/common';
import { CreateSupermarketDto } from './dto/create-supermarket.dto';
import { UpdateSupermarketDto } from './dto/update-supermarket.dto';

@Injectable()
export class SupermarketsService {
  create(createSupermarketDto: CreateSupermarketDto) {
    return 'This action adds a new supermarket';
  }

  findAll() {
    return `This action returns all supermarkets`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supermarket`;
  }

  update(id: number, updateSupermarketDto: UpdateSupermarketDto) {
    return `This action updates a #${id} supermarket`;
  }

  remove(id: number) {
    return `This action removes a #${id} supermarket`;
  }
}
