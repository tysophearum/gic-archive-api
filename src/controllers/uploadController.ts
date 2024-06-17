import express, { Request, Response } from 'express';
import multer from 'multer';
import { uploadToS3 } from '../util/s3';
import { ClassProjectRepositoryImpl, ThesisRepositoryImpl, UserRepositoryImpl } from '../repositories';
import { ClassProjectService, ThesisService, UserService } from '../services';
import readUserFromCSV from '../util/readUserFromCSV';
import { UserRegisterInput } from '../entities';
import { registerUserAction } from './user';
import resizeImage from '../util/resizeImage';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 } // maximun 20 mb
});

const router = express.Router();

router.post('/classProject/files', upload.array('files', 5), async (req: Request, res: Response) => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);

  try {
    // Retrieve class project
    let classProject = await classProjectService.getClassProjectById(req.body.classProjectId);
    if (!classProject) {
      return res.status(404).json({ error: 'Class project not found' });
    }

    // Initialize an array to store file links
    let classProjectFiles: string[] = [];
    const files = req.files as Express.Multer.File[];

    // Upload each file and store its link
    for (const file of files) {
      const date = Date.now().toString();
      const filename = `file/classProject/${date + file.originalname}`;
      try {
        await uploadToS3(file.buffer, filename, file.mimetype);
        classProjectFiles.push(filename);
      } catch (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }
    }

    // Update the class project with new file links
    classProject.files = classProjectFiles;
    try {
      await classProjectService.updateClassProject(classProject);
    } catch (err) {
      console.error('Error updating class project:', err);
      return res.status(500).json({ error: 'Error updating class project' });
    }

    // Send a success response
    res.json({ message: 'Files uploaded successfully' });
  } catch (err) {
    console.error('Error processing request:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/thesis/files', upload.array('files', 5), async (req: Request, res: Response) => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  let thesis = await thesisService.getThesisById(req.body.thesisId);
  if (!thesis) {
    throw new Error('Class project not found');
  }

  let thesisFiles: string[] = [];
  const files = req.files as Express.Multer.File[];
  for (const file of files) {
    const date = Date.now().toString();
    const filename = `file/thesis/${date + file.originalname}`;
    await uploadToS3(file.buffer, filename, file.mimetype);
    thesisFiles.push(filename);
  }

  thesis.files = thesisFiles;
  await thesisService.updateThesis(thesis);

  res.json({ message: 'Files uploaded successfully' });
});


router.post('/classProject/image', upload.single('image'), async (req: Request, res: Response) => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);
  const filename = `image/classProject/${Date.now().toString()}`;

  const classProject = await classProjectService.getClassProjectById(req.body.classProjectId);
  if (!classProject) {
    throw new Error('Class project not found');
  }

  let file = req.file;

  const imageSizeMB = file.size / 1024 / 1024;
  if (imageSizeMB > 0.5) {
    file = await resizeImage(file, 0.5);
  }
  await uploadToS3(file.buffer, filename, file.mimetype);
  classProject.image = filename;
  await classProjectService.updateClassProject(classProject);

  res.json({ message: 'Image uploaded successfully' });
});

router.post('/thesis/image', upload.single('image'), async (req: Request, res: Response) => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  const filename = `image/thesis/${Date.now().toString()}`;

  const thesis = await thesisService.getThesisById(req.body.thesisId);
  if (!thesis) {
    throw new Error('Thesis not found');
  }

  const file = req.file;
  await uploadToS3(file.buffer, filename, file.mimetype);
  thesis.image = filename;
  await thesisService.updateThesis(thesis);

  res.json({ message: 'Image uploaded successfully' });
});

router.post('/profile/image', upload.single('image'), async (req: Request, res: Response) => {
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);

  try {
    let filename = `image/user/profile/${Date.now().toString()}`;
    const user = await userService.getUserById(req.body.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.image) {
      filename = `image/user/profile/${user.image}`;
    }

    let file = req.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageSizeMB = file.size / 1024 / 1024;
    if (imageSizeMB > 0.15) {
      file = await resizeImage(file, 0.15);
    }

    await uploadToS3(file.buffer, filename, file.mimetype);
    user.image = filename;
    await userService.updateUser(user);

    res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.post('/profile/cover', upload.single('image'), async (req: Request, res: Response) => {
  const userRepository = new UserRepositoryImpl();
  const userService = new UserService(userRepository);
  let filename = `image/user/profile/${Date.now().toString()}`;

  const user = await userService.getUserById(req.body.userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.coverImage) {
    filename = `image/user/cover/${user.coverImage}`;
  }

  const file = req.file;
  await uploadToS3(file.buffer, filename, file.mimetype);
  user.coverImage = filename;
  await userService.updateUser(user);

  res.json({ message: 'Image uploaded successfully' });
});

router.post('/user/csv', upload.single('file'), async (req: Request, res: Response) => {
  const file = req.file;

  const [data, error] = await readUserFromCSV(file);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const userInputs: UserRegisterInput[] = data;

  try {
    for (const userInput of userInputs) {
      await registerUserAction(userInput);
    }
    
    res.json({
      message: 'CSV file successfully processed'
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


export default router;
