export class Database {
  private data: Record<string, any[]> = {};

  constructor() {
    this.data["tasks"] = [];
  }

  async insert(collection: string, item: any) {
    this.data[collection].push(item);
    return item;
  }

  async findById(collection: string, id: string) {
    return this.data[collection].find(item => item.id === id) || null;
  }

  async findAll(collection: string) {
    return this.data[collection];
  }

  async update(collection: string, id: string, newData: any) {
    const index = this.data[collection].findIndex(item => item.id === id);
    if (index !== -1) this.data[collection][index] = newData;
  }
}
