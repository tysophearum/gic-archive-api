# GIC Archive API Document
GIC-Archive-API is a graphQL API that use technology like: ExpressJS (with TypeScript), GraphQL that connects to MongoDB database and a AWS S3 file management system.
## Project installation and Setup
### 1. Clone project
```bash
git clone https://github.com/tysophearum/gic-archive-api
```
### 2. Infrastructure setup
1. You need a mongoDB database. You can install it via the official mongoDB website (https://www.mongodb.com/docs/manual/installation/) or you create create one via docker.
2. You need a AWS S3 for file storage. You need to create an AWS account to create a S3 bucket. After creating an AWS account please follow this video to set the S3 bucket permission properly (https://www.youtube.com/watch?v=eQAIojcArRY&t=1417s&ab_channel=SamMeech-Ward). It will also teach you how the project access to S3 bucket.
After you create your S3 bucket successfully, create folders in the bucket following this structure:
```bash
file
|
|--- classProject
|
|--- thesis
|
image
|
|--- classProject
|
|--- thesis
|
|--- user
     |
     |--- cover
     |
     |--- profile
```
### 3. Project setup
1. Install dependecy with this command:
```bash
npm install
```
2. Create a .env file with these variables
```bash
MONGO_URI=mongodb://localhost:27017 # Your mongoDB URI
JWT_SECRET=some-secret # you can put whatever
MAX_LIMIT=20 # default amount for pagination
PORT=4000 # API port

AWS_BUCKET_NAME=your-AWS-S3-bucket-name
AWS_BUCKET_REGION=your-AWS-S3-bucket-region
AWS_ACCESS_KEY=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
```
3. Run project:
```bash
npm run start
# or
npm run dev
```
### 4. Project description
```bash
src/
├── config/
├── controllers/
├── entities/
├── middleware/
├── repositories/
├── resolvers/
├── services/
├── typeDefs/
└── util/
```
