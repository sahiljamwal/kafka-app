import { createServer } from "http";
import app from "./express";
import mongoose from "mongoose";
import { startConsumer } from ".";

const server = createServer(app);

server.listen(process.env.PORT!, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!, { minPoolSize: 5 });
    console.log("DB Connected");
    startConsumer().catch((err) => console.error(err));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
});
