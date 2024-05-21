import { kafka } from "./kakfka";

const init = async () => {
  const admin = kafka.admin();
  await admin.connect();
  console.log("admin connected");

  await admin.createTopics({
    topics: [{ topic: "rider-updates", numPartitions: 2 }],
  });

  console.log("topics created");

  await admin.disconnect();
};

init();
