import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import fs from 'fs';
import mime from 'mime';
import { resolve } from 'path';

import upload from '@config/upload';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = resolve(upload.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalName);

    const putObjectCommand = new PutObjectCommand({
      Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType: mime.getType(originalName) || 'application/octet-stream',
    });

    await this.client.send(putObjectCommand);

    await fs.promises.unlink(originalName);

    return file;
  }

  async delete(file: string, folder: string): Promise<void> {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: `${process.env.AWS_BUCKET_NAME}/${folder}`,
      Key: file,
    });

    await this.client.send(deleteObjectCommand);
  }
}

export { S3StorageProvider };
