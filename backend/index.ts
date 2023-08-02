import express, {Request, Response} from 'express';
import {connectToDatabase} from './services/database.service';
import {usersRouter} from './routers/users.router';

const app = express();
const port = 3001;

connectToDatabase()
  .then(() => {
    app.use('/users', usersRouter);

    app.use('/', async (_req: Request, res: Response) => {
      res.status(200).send('You arent supposed to be here');
    });
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });
