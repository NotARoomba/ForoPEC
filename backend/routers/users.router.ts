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
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send('Error getting users from Mongo!');
  }
});

usersRouter.get('/:number', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = {number: id};
    let user = null;
    if (collections.users) {
      user = (await collections.users.findOne(query)) as unknown as User;
    }

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res
      .status(404)
      .send(`Unable to find matching document with id: ${req.params.id}`);
  }
});
