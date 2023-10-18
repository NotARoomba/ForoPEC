import express, {Request, Response} from 'express';
import {collections, connectToDatabase} from './services/database.service';
import {usersRouter} from './routers/users.router';
import {verifyRouter} from './routers/verify.router';
import {salonesRouter} from './routers/salones.router';
import ForoPECEvents from './models/events';
import {Server, Socket} from 'socket.io';
import {createServer} from 'http';
import cors, {CorsOptions} from 'cors';

const app = express();
const httpServer = createServer(app);
const port = 3001;

export const corsOptions: CorsOptions = {
  origin: [
    'https://foropec2023-api.notaroomba.xyz',
    'http://foropec2023-api.notaroomba.xyz',
  ],
};

const io = new Server(httpServer, {cors: corsOptions});

export let usersConnected: {[key: string]: string} = {};

connectToDatabase(io)
  .then(() => {
    app.use(cors(corsOptions));
    // app.use(HMAC(genSecret, {minInterval: 30}));
    app.use(express.json({limit: '500mb'}));
    app.use('/users', usersRouter);
    app.use('/verify', verifyRouter);
    app.use('/salones', salonesRouter);

    app.use('/', async (_req: Request, res: Response) => {
      res.status(200).send('You arent supposed to be here');
    });

    io.on(ForoPECEvents.CONNECT, (socket: Socket) => {
      console.log(`New client connected: ${socket.id}`);
      //start the cycle
      socket.emit(ForoPECEvents.UPDATE_DATA);
      socket.on(ForoPECEvents.REQUEST_DATA, async (email: string, callback) => {
        usersConnected[email] = socket.id;
        const user = await collections.users?.findOne({email});
        return callback(user);
      });
      socket.on(ForoPECEvents.DISCONNECT, () => {
        console.log('Client disconnected');
      });
    });
    io.on(ForoPECEvents.DISCONNECT, (socket: Socket) => {
      for (var user in usersConnected) {
        if (
          usersConnected.hasOwnProperty(user) &&
          usersConnected[user] == socket.id
        ) {
          delete usersConnected[user];
        }
      }
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
    httpServer.listen(port);
    console.log(`Server started!`);
    // app.listen(port, () => {
    //   console.log(`Server started at http://localhost:${port}`);
    // });
  })
  .catch((error: Error) => {
    console.error('Database connection failed', error);
    process.exit();
  });
