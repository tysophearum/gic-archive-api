import { Hello } from '../../entities';
import { HelloRepositoryImpl } from '../../repositories';
import { HelloService } from '../../services';

const getAllHellosAction = async (): Promise<Hello[]> => {
    const helloRepository = new HelloRepositoryImpl();
    const helloService = new HelloService(helloRepository);

    return await helloService.getAllHellos();
}

export default getAllHellosAction;