import { kafka } from "./kakfka";

// const groupId = process.argv[2];
const groupId = process.env.GROUP_ID!;

export const startConsumer = async () => {
  const consumer = kafka.consumer({ groupId });

  await consumer.connect();

  await consumer.subscribe({ topic: "rider-updates", fromBeginning: false });

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
