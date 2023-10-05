import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import User from '../models/user';

export const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.get('/', async (req: Request, res: Response) => {
  try {
    let users = null;
    if (collections.users) {
      users = (await collections.users.find({}).toArray()) as unknown as User[];
    }
    res.status(200).send({users, error: false, msg: 'Users Exist!'});
  } catch (error) {
    res.status(500).send({error: true, msg: error});
  }
});

usersRouter.post('/', async (req: Request, res: Response) => {
  const data: User = req.body;
  try {
    if (collections.users) {
      await collections.users.updateOne(
        {email: data.email},
        {$set: data},
        {
          upsert: true,
        },
      );
    }
    res.send({error: false, msg: 'Usuario actualizado!'});
  } catch (error) {
    res.send({error: true, msg: error});
  }
});

usersRouter.get('/:email', async (req: Request, res: Response) => {
  const email = req?.params?.email;
  console.log(`Getting data for: ${email}`);
  try {
    let user = null;
    if (collections.users) {
      user = (await collections.users.findOne({email})) as unknown as User;
    }
    if (user) {
      res.status(200).send({user, error: false, msg: 'The user exists!'});
    } else {
      res
        .status(404)
        .send({
          user: null,
          error: true,
          msg: '¡No se encontró un usuario con esa dirección de correo electrónico!',
        });
    }
  } catch (error) {
    res.status(404).send({user: null, error: true, msg: error});
  }
});


