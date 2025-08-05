import "dotenv/config";
import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.YC_ACCESS_KEY_ID || !process.env.YC_SECRET_ACCESS_KEY) {
    throw new Error('Missing Yandex Cloud access keys in environment variables');
}

const s3 = new S3Client({
  endpoint: process.env.YC_ENDPOINT || 'https://storage.yandexcloud.net',
  region: 'ru-central1',
  credentials: {
    accessKeyId: process.env.YC_ACCESS_KEY_ID,
    secretAccessKey: process.env.YC_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

export default s3;