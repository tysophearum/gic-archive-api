import ampq from 'amqplib'
import { connectAmqp } from '../config/rabbitmqConfig'

export async function sendToQueue(messageKey:string, payload:string) {
    const channel = await connectAmqp();
    await channel.assertQueue(messageKey,  { durable: true });

    channel.sendToQueue(messageKey, Buffer.from(payload), { persistent: true });
}