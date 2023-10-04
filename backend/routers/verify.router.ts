import express, {Request, Response} from 'express';
import * as nodemailer from 'nodemailer';
import {load} from 'ts-dotenv';

const env = load({
  EMAIL: String,
  EMAIL_PASS: String,
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL,
    pass: env.EMAIL_PASS,
  },
});

export const verifyRouter = express.Router();

verifyRouter.use(express.json());

const getVerificationCode = (email: string) => {
  return Buffer.from(
    Math.floor(Date.now() / (2 * 60 * 1000)).toString() + email,
  )
    .toString()
    .replace(/[^0-9]/g, '')
    .substring(0, 6);
};

// verifyRouter.post('/send', async (req: Request, res: Response) => {
//   const number: string =
//     req?.body?.number[0] === '+'
//       ? req?.body?.number
//       : (('+57' + req?.body?.number) as string);
//   if (req?.body?.number === '') {
//     return res.status(404).send({error: true, msg: 'Please add a number!'});
//   }
//   let verification;
//   try {
//     verification = await twilio.verify.v2
//       .services(env.TW_VSID)
//       .verifications.create({
//         to: number,
//         channel: 'sms',
//       });
//     if (verification.status === 'pending') {
//       res.status(200).send({error: false, msg: 'The code has been sent!'});
//     } else if (!verification.lookup.valid) {
//       res
//         .status(404)
//         .send({error: true, msg: 'The phone number does not exist!'});
//     } else {
//       res
//         .status(404)
//         .send({error: true, msg: 'There was an error sending the code!'});
//     }
//   } catch (error: any) {
//     console.log(error);
//     if (error.status === 429) {
//       return res.status(404).send({
//         error: true,
//         msg: 'Too many attempts, try again in 10 minutes!',
//       });
//     }
//     res.status(404).send({error: true, msg: 'Unable to send the Twilio code!'});
//   }
// });

verifyRouter.post('/send', async (req: Request, res: Response) => {
  const email: string = req.body.email;
  if (email === '') {
    return res.status(404).send({error: true, msg: 'Please add an email!'});
  }
  try {
    //send emailz
    const info = await transporter.sendMail({
      from: env.EMAIL,
      to: email,
      subject: 'Foro Pensando en Colombia Verificacion',
      html: `
      <!DOCTYPE html>
      <html>
      
      <head>
        <meta charset="utf-8">
        <title>Codigo de Confirmacion</title>
      </head>
      
      <body style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
          <h1 style="color: #333333; margin-bottom: 20px;">Codigo de Confirmacion</h1>
          <img src="cid:${email}"/>
          <p style="color: #666666; margin-bottom: 10px;">Tu codigo de confirmacion es:</p>
          <p style="font-size: 24px; font-weight: bold; color: #333333; margin-top: 30px; margin-bottom: 40px;">${getVerificationCode(email)}</p>
          <p style="color: #666666; margin-bottom: 10px;">Utiliza este codigo a verificar tu cuenta.</p>
        </div>
      </body>
      
      </html>
    `,
    attachments: [{
      filename: 'logo.png',
      path: '../images/logo.png',
      cid: email //same cid value as in the html img src
  }]
      // text: `Tu codigo para Foro Pensando en Colombia es ${getVerificationCode(
      //   email,
      // )}`,
    });
    if (info.accepted) {
      res.status(200).send({error: false, msg: 'The code has been sent!'});
    } else if (!info.rejected) {
      res.status(404).send({error: true, msg: 'The email does not exist!'});
    } else {
      res
        .status(404)
        .send({error: true, msg: 'There was an error sending the code!'});
    }
  } catch (error: any) {
    console.log(error);
    return res.status(404).send({
      error: true,
      msg: 'There was an error sending the code!',
    });
  }
});

verifyRouter.post('/check', async (req: Request, res: Response) => {
  const email: string = req?.body?.email;
  const code: string = req?.body?.code as string;
  if (code.length !== 6) {
    return res.status(404).send({error: true, msg: 'The code is invalid!'});
  }
  try {
    if (getVerificationCode(email) === code) {
      res.status(200).send({error: false, msg: 'The code has been approved!'});
    } else {
      res.status(404).send({error: true, msg: 'Incorrect code!'});
    }
  } catch (error: any) {
    res.status(404).send({error: true, msg: 'Unable to check the code!'});
  }
});
