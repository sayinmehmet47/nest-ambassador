import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export abstract class AbstractService {
  protected constructor(private readonly repository: Repository<any>) {}

  async create(options) {
    return await this.repository.save(options);
  }

  async findOne(options) {
    return await this.repository.findOneBy(options);
  }

  async findOneByRelation({ id, relations }) {
    return await this.repository.findOne({ where: id, relations: relations });
  }

  async findOneByTransactionId({ transaction_id, relations }) {
    return await this.repository.findOne({
      where: { transaction_id },
      relations: relations,
    });
  }

  async findOneByCode({ code, relations }) {
    return await this.repository.findOne({
      where: { code },
      relations: relations,
    });
  }

  async update(id: number, options) {
    return this.repository.update(id, options);
  }
  async find(options) {
    return this.repository.find(options);
  }

  async findAll(options) {
    return this.repository.find(options);
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
