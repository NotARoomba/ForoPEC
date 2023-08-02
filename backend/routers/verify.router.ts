import express, {Request, Response} from 'express';
import {load} from 'ts-dotenv';

const env = load({
  TW_SID: String,
  TW_VSID: String,
  TW_TOKEN: String,
});

const twilio = require('twilio')(env.TW_SID, env.TW_TOKEN);

export const verifyRouter = express.Router();

verifyRouter.use(express.json());

verifyRouter.get('/', async (req: Request, res: Response) => {
  const number = req?.body?.number;
  const code = req?.body?.code;
  let verification;

  try {
    verification = await twilio.verify
      .services(env.TW_VSID)
      .verificationChecks.create({code, to: number});
    if (verification.status === 'approved') {
      res.status(200);
    } else {
      res.status(404);
    }
  } catch (error) {
    res.status(404).send('Unable to send Twilio code');
  }
});