import express, { Request, Response } from 'express';
import multer from 'multer';
import { uploadFile } from '../util/s3';
import { ClassProjectRepositoryImpl, ThesisRepositoryImpl, UserRepositoryImpl } from '../repositories';
import { ClassProjectService, ThesisService, UserService } from '../services';


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

const router = express.Router();

router.post('/files', upload.array('files', 5), (req: Request, res: Response) => {
  
  res.json({ message: 'Files uploaded successfully' });
});


router.post('/classProject/image', upload.single('image'), async (req: Request, res: Response) => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);
  const filename = Date.now().toString();
  
  const classProject = await classProjectService.getClassProjectById(req.body.classProjectId);
  if (!classProject) {
    throw new Error('Class project not found');
  }

  const file = req.file;
  
  await uploadFile(file.buffer, filename, file.mimetype);
  classProject.image = filename;
  await classProjectService.updateClassProject(classProject);

  res.json({ message: 'Image uploaded successfully' });
});

router.post('/thesis/image', upload.single('image'), async (req: Request, res: Response) => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  const filename = Date.now().toString();

  const thesis = await thesisService.getThesisById(req.body.thesisId);
  if (!thesis) {
    throw new Error('Thesis not found');
  }

  const file = req.file;
  await uploadFile(file.buffer, filename, file.mimetype);
  thesis.image = filename;
  await thesisService.updateThesis(thesis);
  
  res.json({ message: 'Image uploaded successfully' });
});

router.post('/profile/image', upload.single('image'), async (req: Request, res: Response) => {
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);
  let filename = Date.now().toString();

  const user = await userService.getUserById(req.body.userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.image) {
    filename = user.image;
  }

  const file = req.file;
  await uploadFile(file.buffer, filename, file.mimetype);
  user.image = filename;
  await userService.updateUser(user);
  
  res.json({ message: 'Image uploaded successfully' });
});

router.post('/profile/cover', upload.single('image'), async (req: Request, res: Response) => {
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);
  let filename = Date.now().toString();

  const user = await userService.getUserById(req.body.userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.coverImage) {
    filename = user.coverImage;
  }

  const file = req.file;
  await uploadFile(file.buffer, filename, file.mimetype);
  user.coverImage = filename;
  await userService.updateUser(user);
  
  res.json({ message: 'Image uploaded successfully' });
});

export default router;
