import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import Presentation from '../models/presentation';

export const salonesRouter = express.Router();

salonesRouter.use(express.json());

salonesRouter.get('/', async (req: Request, res: Response) => {
  try {
    let presentations = null;
    if (collections.salones) {
      presentations = (await collections.salones
        .find({})
        .toArray()) as unknown as Presentation[];
    }
    res.status(200).send({presentations, error: false, msg: 'Users Exist!'});
  } catch (error) {
    res.status(500).send({error: true, msg: error});
  }
});
