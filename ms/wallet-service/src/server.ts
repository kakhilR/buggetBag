import dotenv from "dotenv"
import app from "./app"
import { MongoConnection } from "./db/mongo.connection"

dotenv.config()
// console.log(process.env.MONGO_URI)
const PORT = process.env.PORT || 8002;
MongoConnection.getInstance(process.env.MONGO_URI!)
// (async () => {
//   await MongoConnection.getInstance(process.env.MONGO_URI!)
//   // app.listen(PORT, () => console.log(`💰 Wallet Service running on ${PORT}`))
// })
app.listen(PORT, () => console.log(`💰 Wallet Service running on ${PORT}`));
