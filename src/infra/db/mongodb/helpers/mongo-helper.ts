import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,
  url: null as unknown as string,

  async connect (url: string): Promise<void> {
    this.url = url
    this.client = await MongoClient.connect(this.url, {})
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) { await this.connect(this.url) }

    return this.client.db().collection(name)
  }
}
