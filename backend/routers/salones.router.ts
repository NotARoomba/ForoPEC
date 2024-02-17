import express, {Request, Response} from 'express';
import {collections} from '../services/database.service';
import Presentation from '../models/presentation';
import STATUS_CODES from '../models/status';

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
    res.status(200).send({presenters, status: STATUS_CODES.SUCCESS});
  } catch (error) {
    res.status(500).send({status: STATUS_CODES.GENERIC_ERROR});
  }
});

salonesRouter.get('/list', async (req: Request, res: Response) => {
  try {
    let salones = null;
    if (collections.salones) {
      salones = await collections.salones.distinct('salon');
    }
    res.status(200).send({salones, status: STATUS_CODES.SUCCESS});
  } catch (error) {
    res.status(500).send({status: STATUS_CODES.GENERIC_ERROR});
  }
});
