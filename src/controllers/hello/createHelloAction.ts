import { Hello } from '../../entities';
import { HelloRepositoryImpl } from '../../repositories';
import { HelloService } from '../../services';
import { sendToQueue } from '../../util/rabbitmqUtil';
require('dotenv').config()

const createHelloAction =async ({message}: any): Promise<Hello> => {
    const helloRepository = new HelloRepositoryImpl();
    const helloService = new HelloService(helloRepository);
    await sendToQueue(process.env.RABBITMQ_FILE_STORAGE_MESSAGE_KEY, message);
    return await helloService.createHello({ message });
}

export default createHelloAction;