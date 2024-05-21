import { group } from "console";
import { kafka } from "./kakfka";

const groupId = process.argv[2];

const init = async () => {
  const consumer = kafka.consumer({ groupId });

  await consumer.connect();

  await consumer.subscribe({ topic: "rider-updates", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log({
        groupId,
        topic,
        partition,
        key: message.key?.toString(),
        value: JSON.parse(message.value?.toString()!),
        headers: message.headers,
      });
    },
  });
};

init();
