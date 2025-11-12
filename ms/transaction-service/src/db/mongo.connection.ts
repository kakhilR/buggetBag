import mongoose from 'mongoose'


export class MongoConnection {
    private static instance: MongoConnection

    private constructor() {}

    static async getInstance(uri: string) {
    if (!MongoConnection.instance) {
        MongoConnection.instance = new MongoConnection()
            await mongoose.connect(uri)
            console.log('✅ MongoDB connected (Transaction Service)')
        }
       return MongoConnection.instance
    }
}