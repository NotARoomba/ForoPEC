import express, {Request, Response} from 'express';
import {connectToDatabase} from './services/database.service';
import {usersRouter} from './routers/users.router';
import {verifyRouter} from './routers/verify.router';
import {salonesRouter} from './routers/salones.router';

const app = express();
const port = 3001;

const genSecret = async (req: Request) => {
  return req ? Math.floor(Date.now() / (30 * 1000)).toString() : '';
};

connectToDatabase()
  .then(() => {
    // app.use(HMAC(genSecret, {minInterval: 30}));
    app.use('/users', usersRouter);
    app.use('/verify', verifyRouter);
    app.use('/salones', salonesRouter);

    app.use('/', async (_req: Request, res: Response) => {
      res.status(200).send('You arent supposed to be here');
    });

    // app.use(
    //   (
    //     error: {message: string; code: string},
    //     req: Request,
    //     res: Response,
    //     next: () => void,
    //   ) => {
    //     // check by error instance
    //     if (error instanceof AuthError) {
    //       res.status(401).json({
    //         error: 'Invalid request',
    //         info: error.message,
    //       });
    //     }
    //     next();
    //   },
    // );

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });
