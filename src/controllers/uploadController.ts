import express, { Request, Response } from 'express';
import multer from 'multer';
import { deleteFile, uploadToS3 } from '../util/s3';
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
    if (classProject.files?.length && classProject?.files?.[0] !== "") {
      classProjectFiles = classProject.files
    }
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
    return res.json({ message: 'Files uploaded successfully' });
  } catch (err) {
    console.error('Error processing request:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/thesis/files', upload.array('files', 5), async (req: Request, res: Response) => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);

  try {
    // Retrieve class project
    let thesis = await thesisService.getThesisById(req.body.thesisId);
    if (!thesis) {
      return res.status(404).json({ error: 'Class project not found' });
    }

    // Initialize an array to store file links
    let thesisFiles: string[] = [];
    if (thesis.files?.length && thesis?.files?.[0] !== "") {
      thesisFiles = thesis.files
    }
    const files = req.files as Express.Multer.File[];

    // Upload each file and store its link
    for (const file of files) {
      const date = Date.now().toString();
      const filename = `file/thesis/${date + file.originalname}`;
      try {
        await uploadToS3(file.buffer, filename, file.mimetype);
        thesisFiles.push(filename);
      } catch (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }
    }

    // Update the class project with new file links
    thesis.files = thesisFiles;
    try {
      await thesisService.updateThesis(thesis);
    } catch (err) {
      console.error('Error updating class project:', err);
      return res.status(500).json({ error: 'Error updating class project' });
    }

    // Send a success response
    return res.json({ message: 'Files uploaded successfully' });
  } catch (err) {
    console.error('Error processing request:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/classProject/files/delete', upload.single('file'), async (req: Request, res: Response) => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);
  
  try {
    // Retrieve class project
    let classProject = await classProjectService.getClassProjectById(req.body.classProjectId);
    if (!classProject) {
      return res.status(404).json({ error: 'Class project not found' });
    }

    const originalFiles = classProject.files;
    const id = req.body.classProjectId;
    const filesToDelete = req.body.filesToDelete;

    for (const file of filesToDelete) {
      try {
        await deleteFile(file);
      } catch (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Error deleting file' });
      }
    }

    const updatedFiles = originalFiles.filter(item => !filesToDelete.includes(item));
    classProject.files = updatedFiles
    try {
      await classProjectService.updateClassProject(classProject);
    } catch (err) {
      console.error('Error updating class project:', err);
      return res.status(500).json({ error: 'Error updating class project' });
    }

    // Send a success response
    return res.json({ message: 'Files deleted successfully' });
  } catch (err) {
    console.error('Error processing request:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/thesis/files/delete', upload.single('file'), async (req: Request, res: Response) => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  
  try {
    let thesis = await thesisService.getThesisById(req.body.thesisId);
    if (!thesis) {
      return res.status(404).json({ error: 'Thesis not found' });
    }

    const originalFiles = thesis.files;
    const id = req.body.thesisId;
    const filesToDelete = req.body.filesToDelete;

    for (const file of filesToDelete) {
      try {
        await deleteFile(file);
      } catch (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Error deleting file' });
      }
    }

    const updatedFiles = originalFiles.filter(item => !filesToDelete.includes(item));
    thesis.files = updatedFiles
    try {
      await thesisService.updateThesis(thesis);
    } catch (err) {
      console.error('Error updating thesis:', err);
      return res.status(500).json({ error: 'Error updating thesis' });
    }

    // Send a success response
    return res.json({ message: 'Files deleted successfully' });
  } catch (err) {
    console.error('Error processing request:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/classProject/image', upload.single('image'), async (req: Request, res: Response) => {
  const classProjectRepository = new ClassProjectRepositoryImpl();
  const classProjectService = new ClassProjectService(classProjectRepository);
  let filename = `image/classProject/${Date.now().toString()}`;

  const classProject = await classProjectService.getClassProjectById(req.body.classProjectId);
  if (!classProject) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Class project not found',
        details: 'The class project with the provided ID does not exist.'
      }
    });    
  }

  if (classProject.image) {
    filename = classProject.image;
  }

  let file = req.file;

  const imageSizeMB = file.size / 1024 / 1024;
  if (imageSizeMB > 0.15) {
    file = await resizeImage(file, 0.15);
  }

  await uploadToS3(file.buffer, filename, file.mimetype);
  classProject.image = filename;
  await classProjectService.updateClassProject(classProject);

  return res.json({ message: 'Image uploaded successfully' });
});

router.post('/thesis/image', upload.single('image'), async (req: Request, res: Response) => {
  const thesisRepository = new ThesisRepositoryImpl();
  const thesisService = new ThesisService(thesisRepository);
  let filename = `image/thesis/${Date.now().toString()}`;

  const thesis = await thesisService.getThesisById(req.body.thesisId);
  if (!thesis) {
    throw new Error('Thesis not found');
  }

  if (thesis.image) {
    filename = thesis.image;
  }

  let file = req.file;

  const imageSizeMB = file.size / 1024 / 1024;
  if (imageSizeMB > 0.15) {
    file = await resizeImage(file, 0.15);
  }
  await uploadToS3(file.buffer, filename, file.mimetype);
  thesis.image = filename;
  await thesisService.updateThesis(thesis);

  return res.json({ message: 'Image uploaded successfully' });
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
      filename = user.image;
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

    return res.json({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Error uploading image:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
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

  return res.json({ message: 'Image uploaded successfully' });
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
      await registerUserAction({...userInput, role: "student"});
    }
    
    return res.json({
      message: 'CSV file successfully processed'
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/teacher/csv', upload.single('file'), async (req: Request, res: Response) => {
  const file = req.file;

  const [data, error] = await readUserFromCSV(file);
  if (error) {
    return res.status(400).json({ message: error.message });
  }

  const userInputs: UserRegisterInput[] = data;

  try {
    for (let userInput of userInputs) {
      userInput.studentId = "Teacher";
      await registerUserAction({...userInput, role: "teacher"});
    }
    
    return res.json({
      message: 'CSV file successfully processed'
    });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/test', upload.single('file'), async (req: Request, res: Response) => {
  deleteFile(req.body.name)
  return res.json({
    message: 'Test route'
  });
})

export default router;
