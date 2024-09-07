import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { URL } from "url";

export const S3_BUCKET = {
  NAME: process.env.S3_BUCKET_NAME,
  REGION: process.env.S3_BUCKET_REGION,
  getBaseUrl(bucketName) {
    return `https://${bucketName || this.NAME}.s3-${this.REGION}.amazonaws.com`;
  },
  PROFILE_PICS_FOLDER: "profile-pics",
  POSTS: "posts",
  ACCESS_KEY: process.env.S3_ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
};

const s3 = new S3Client({
  region: S3_BUCKET.REGION,
  credentials: {
    accessKeyId: S3_BUCKET.ACCESS_KEY,
    secretAccessKey: S3_BUCKET.SECRET_ACCESS_KEY,
  },
});

export const getS3URL = (key) => {
  return `${S3_BUCKET.getBaseUrl()}/${key}`;
};

function parseS3Url(s3Url) {
  const url = new URL(s3Url);
  const { hostname, pathname } = url;

  if (!hostname.endsWith(".amazonaws.com")) {
    throw new Error("Not an S3 URL");
  }

  if (!hostname.includes(S3_BUCKET.REGION)) {
    throw new Error("S3 URL doesn't have a valid region");
  }

  const [bucket] = hostname.split(".");
  const key = decodeURIComponent(pathname.substring(1));
  const params = {
    key,
    bucket,
    region: S3_BUCKET.REGION,
  };

  return params;
}

export const uploadFileToS3 = async (bucketName, key, buffer) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ACL: "public-read",
    };
    const command = new PutObjectCommand(params);
    await s3.send(command);

    return getS3URL(key);
  } catch (error) {
    console.log(`Error uploading file: ${error}`);
    throw error;
  }
};

export const deleteFileFromS3 = async ({ key }) => {
  const params = {
    Bucket: S3_BUCKET.NAME,
    Key: key,
  };
  const command = new DeleteObjectCommand(params);
  await s3.send(command);
  return true;
};

export const getFileFromS3 = async ({ key }) => {
  const params = {
    Bucket: S3_BUCKET.NAME,
    Key: key,
  };
  const command = new GetObjectCommand(params);
  const data = await s3.send(command);
  return data.Body;
};

export const getSignedUrlForGET = async ({ url, key, expiresInSecs }) => {
  let params = null;
  if (key) {
    params = {
      Bucket: S3_BUCKET.NAME,
      Key: key,
    };
  }
  if (url) {
    const { bucket, key } = parseS3Url(url);
    params = {
      Bucket: bucket,
      Key: key,
    };
  }
  if (!params) {
    throw new Error("url or key should is required");
  }
  const command = new GetObjectCommand(params);
  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: expiresInSecs || 3600,
  });
  const rawUrl = `${S3_BUCKET.getBaseUrl(params.Bucket)}/${key}`;
  return { signedUrl, url: rawUrl };
};

export const getSignedUrlForPUT = async ({ key, expiresInSecs }) => {
  const params = {
    Bucket: S3_BUCKET.NAME,
    Key: key,
    ACL: "public-read",
  };
  const command = new PutObjectCommand(params);
  const signedUrl = await getSignedUrl(s3, command, {
    expiresIn: expiresInSecs || 3600,
  });
  const url = `${S3_BUCKET.getBaseUrl()}/${key}`;
  return { signedUrl, url };
};

export async function getSignedUrlForProfilePicUpload({ extName }) {
  try {
    const key = `${S3_BUCKET.PROFILE_PICS_FOLDER}/${uuidv4()}${
      extName.startsWith(".") ? extName : "." + extName
    }`;
    return await s3.getSignedUrlForPUT({ key });
  } catch (err) {
    throw err;
  }
}
