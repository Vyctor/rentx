import { SESClient } from '@aws-sdk/client-ses';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import { IMailProvider } from '../IMailProvider';

@injectable()
class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const sesClient = new SESClient({
      region: process.env.AWS_REGION,
    });

    this.client = nodemailer.createTransport({
      SES: { ses: sesClient },
    } as any);
  }

  async sendMail(to: string, subject: string, variables: unknown, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: 'Rentx <vyctorguimaraes@rentx.com.br>',
      subject,
      html: templateHTML,
    });
  }
}

export { SESMailProvider };
