import mongoose from "mongoose"


export class MongoConnection {
    private static instance: MongoConnection

    private constructor() {}

    static async getInstance(url: string) {
        if(!MongoConnection.instance){
            MongoConnection.instance = new MongoConnection()
            await mongoose.connect(url)
            console.log("from hereß")
            console.log("🌿 Connected to MongoDB")
        }
        return MongoConnection.instance
    }
}