const amqp = require("amqplib");

const QUEUE_NAME = "test-queue";

async function consume() {
  const connection = await amqp.connect(
    process.env.RABBITMQ_HOST || "amqp://localhost"
  );

  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE_NAME, {
    durable: true,
  });

  console.log(
    " [*] Waiting for messages in %s. To exit press CTRL+C",
    QUEUE_NAME
  );

  channel.consume(
    QUEUE_NAME,
    function (message) {
      console.log(
        "[%s] Received with id (%s) message: %s",
        message.properties.correlationId,
        message.properties.messageId,
        message.content.toString()
      );

      // Acknowledge manually
      channel.ack(message);
    },
    {
      noAck: false,
    }
  );
}

consume();
