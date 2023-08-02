import express, {Request, Response} from 'express';
import {Twilio} from 'twilio';
import {load} from 'ts-dotenv';

const env = load({
  TW_SID: String,
  TW_VSID: String,
  TW_TOKEN: String,
});

const twilio: Twilio = new Twilio(env.TW_SID, env.TW_TOKEN);

export const verifyRouter = express.Router();

verifyRouter.use(express.json());

verifyRouter.post('/', async (req: Request, res: Response) => {
  const number: string = req?.body?.number as string;
  const code: string = req?.body?.code as string;
  let verification;
  console.log(code, number, req.body);
  try {
    verification = await twilio.verify.v2
      .services(env.TW_VSID)
      .verificationChecks.create({code, to: number});
    console.log(verification);
    if (verification.status === 'approved') {
      res.status(200);
    } else {
      res.status(404);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send('Unable to send Twilio code');
  }
});
