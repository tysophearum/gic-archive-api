import ampq from 'amqplib';
import { saveFileConsumer } from './saveFileConsumer';

export async function consumerLoader(channel: ampq.Channel) {
  await saveFileConsumer(channel);
  console.log('Consumers Loaded');
}
