const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();
const fs = require("fs");

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

function uploadToCloud(file) {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

function deleteFromCloud(file) {}

function readFromCloud(Key) {
  try {
    const readParams = {
      Key,
      Bucket: process.env.AWS_BUCKET_NAME,
    };

    return s3.getObject(readParams).createReadStream();
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { uploadToCloud, readFromCloud };
