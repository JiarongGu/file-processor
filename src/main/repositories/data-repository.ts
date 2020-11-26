import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';

import { dbContext } from './db-context';

export class DataRepository<T extends { id: string }> {
  name: string;

  constructor(name) {
    this.name = name;
  }

  async list(process?: T): Promise<T[]> {
    const collection = await this.collection();
    if (!process) {
      return collection.value();
    } else {
      return collection.filter((x) => x.process === process).value();
    }
  }

  async fetch(id: string, _?: T): Promise<T> {
    const collection = await this.collection();
    return collection
      .filter((x) => x.id === id)
      .first()
      .value();
  }

  async create(value: T): Promise<T> {
    value.id = uuid();
    const collection = await this.collection();
    await collection.push(value).write();
    return value;
  }

  async update(value: T) {
    const collection = await this.collection();
    await collection
      .find((x) => x.id === value.id)
      .assign(value)
      .write();
  }

  async delete(id: string): Promise<void> {
    const collection = await this.collection();
    await collection
      .filter((x) => x.id === id)
      .remove()
      .write();
  }

  private async collection(): Promise<any> {
    return (await dbContext()).get(this.name);
  }
}
