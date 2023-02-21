import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupermarketDto } from './dto/create-supermarket.dto';
import { UpdateSupermarketDto } from './dto/update-supermarket.dto';
import { Supermarket } from './entities/supermarket.entity';

@Injectable()
export class SupermarketsService {
  constructor(
    @InjectRepository(Supermarket)
    private supermarketRepository: Repository<Supermarket>,
  ) {}
  create(createSupermarketDto: CreateSupermarketDto) {
    const newSupermarket = this.supermarketRepository.create({
      ...createSupermarketDto,
      createdAt: new Date(),
    });
    return this.supermarketRepository.save(newSupermarket);
  }

  findAll() {
    return this.supermarketRepository.find();
  }

  findOne(supermarketId: number) {
    return this.supermarketRepository.findOneBy({ supermarketId });
  }

  update(
    supermarketId: number,
    updateSupermarketDetails: UpdateSupermarketDto,
  ) {
    return this.supermarketRepository.update(
      { supermarketId },
      { ...updateSupermarketDetails, updatedAt: new Date() },
    );
  }

  deleteSupermarket(supermarketId: number) {
    return this.supermarketRepository.delete({ supermarketId });
  }
}
