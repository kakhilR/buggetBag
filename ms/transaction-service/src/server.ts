import dotenv from "dotenv"
import { MongoConnection } from "./db/mongo.connection"
import app from "./app"

dotenv.config();
const PORT = process.env.PORT || 8003;

(async () => {
  await MongoConnection.getInstance(process.env.MONGO_URI!)
  app.listen(PORT, () => console.log(`🔁 Transaction Service running on port ${PORT}`))
})();