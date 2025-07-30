import 'dotenv/config';
import AWS from 'aws-sdk';


const spacesEndpoint = new AWS.Endpoint(process.env.YC_ENDPOINT || 'storage.yandexcloud.net');

if (!process.env.YC_ACCESS_KEY_ID || !process.env.YC_SECRET_ACCESS_KEY) {
    throw new Error('Missing Yandex Cloud access keys in environment variables');
}

const s3 = new AWS.S3({
  endpoint: spacesEndpoint.href,
  accessKeyId: process.env.YC_ACCESS_KEY_ID,
  secretAccessKey: process.env.YC_SECRET_ACCESS_KEY,
});

export default s3;