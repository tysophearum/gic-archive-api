import ampq from 'amqplib';
require('dotenv').config();

const messageKey = process.env.RABBITMQ_FILE_STORAGE_MESSAGE_KEY;

export async function saveFileConsumer(channel: ampq.Channel) {
  try {
    await channel.assertQueue(messageKey, { durable: true });

    channel.consume(messageKey, (message) => {
      console.log(message?.content.toString());
      channel.ack(message!);
    });
  } catch (error) {}
}
