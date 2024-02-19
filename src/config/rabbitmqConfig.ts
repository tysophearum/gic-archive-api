import amqp from 'amqplib';
import { consumerLoader } from '../consumer/consumersLoader';
require('dotenv').config()

const amqpConnectionURI = process.env.RABBITMQ_URI

async function connectAmqp () {
    try {
        const connection = await amqp.connect(amqpConnectionURI);
        const channel = await connection.createChannel();
        console.log('Connected to RabbitMQ');
        await consumerLoader(channel);
        return channel;
    } catch (error) {
        console.error('Error connecting to RabbitMQ:', error);
    }
}

export {connectAmqp};