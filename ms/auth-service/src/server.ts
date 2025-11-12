import app from "./app";
import dotenv from "dotenv";
import { MongoConnection } from "./db/mongo.connection";

dotenv.config();
const PORT = process.env.PORT || 4001;

(async () => {
  await MongoConnection.getInstance(process.env.MONGO_URI!);
  app.listen(PORT, () => console.log(`🚀 Auth Service running on ${PORT}`));
})();