const amqp = require("amqplib");
const uuid = require("uuid");

const QUEUE_NAME = "test-queue";

async function send(messages) {
  const connection = await amqp.connect(
    process.env.RABBITMQ_HOST || "amqp://localhost"
  );

  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME, {
    durable: true,
  });

  // Correlation ID is used to know if the message is still related with another message
  const correlationId = uuid.v4();

  for (let message of messages) {
    const buff = Buffer.from(JSON.stringify(message), "utf-8");
    const result = channel.sendToQueue(QUEUE_NAME, buff, {
      persistent: true,
      messageId: uuid.v4(),
      correlationId: correlationId,
    });
    console.log(correlationId, result);
  }

  await channel.close();
  await connection.close();
}

send([
  { test: "Hello World 0" },
  { test: "Hello World 1" },
  { test: "Hello World 2" },
  { test: "Hello World 3" },
  { test: "Hello World 4" },
]);
