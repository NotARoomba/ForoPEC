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

usersRouter.get('/:number', async (req: Request, res: Response) => {
  const id = req?.params?.number;

  try {
    const query = {number: parseInt(id, 10)};
    let user = null;
    if (collections.users) {
      user = (await collections.users.findOne(query)) as unknown as User;
    }
    if (user) {
      res.status(200).send({user, error: false, msg: 'The user exists!'});
    } else {
      res.status(404).send({error: true, msg: 'User not found!'});
    }
  } catch (error) {
    res.status(404).send({error: true, msg: error});
  }
});
