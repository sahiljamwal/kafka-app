import { kafka } from "./kakfka";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const init = async () => {
  const producer = kafka.producer();

  await producer.connect();
  console.log("producer connected");

  rl.setPrompt(">");
  rl.prompt();

  rl.on("line", async (line) => {
    const [riderName, location] = line.split(" ");
    await producer.send({
      topic: "rider-updates",
      messages: [
        {
          partition: location.toLowerCase() === "north" ? 0 : 1,
          key: "location-update",
          value: JSON.stringify({ riderName, location }),
        },
      ],
    });
    console.log("message sent to topic");
  }).on("close", async () => await producer.disconnect());
};

init();
