import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import Presentation from '../models/presentation';

export const salonesRouter = express.Router();

salonesRouter.use(express.json());

salonesRouter.post('/', async (req: Request, res: Response) => {
  try {
    let presenters = null;
    if (collections.salones) {
      presenters = (await collections.salones
        .find(req?.body?.filter)
        .toArray()) as unknown as Presentation[];
    }
    console.log(presenters, req?.body);
    res.status(200).send({presenters, error: false, msg: 'Presenters Exist!'});
  } catch (error) {
    res.status(500).send({error: true, msg: error});
  }
});

salonesRouter.get('/list', async (req: Request, res: Response) => {
  try {
    let salones = null;
    if (collections.salones) {
      salones = await collections.salones.distinct('salon');
    }
    res.status(200).send({salones, error: false, msg: 'Salones Exist!'});
  } catch (error) {
    res.status(500).send({error: true, msg: error});
  }
});