import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Callback } from "aws-lambda";
import convert from "heic-convert";
import Sharp from "sharp";

const allowedExtension: string[] = ["jpg", "jpeg", "png", "webp", "heic"];

const s3: S3Client = new S3Client({ region: "ap-northeast-2" });

export const imageResize = async (
  event: LambdaEventType,
  context: any,
  callback: Callback
) => {
  console.log("serverless-lambda-edge-image-resize 실행!");
  console.log(JSON.stringify(event));
  const { Records }: LambdaEventType = event;

  const { cf } = Records[0];
  const { request, response } = cf;
  const { querystring, origin, uri } = request;
  const { s3 } = origin;

  try {
    const bucketName: string = s3.domainName.replace(
      ".s3.ap-northeast-2.amazonaws.com",
      ""
    );

    const width: string | undefined = getQuerystring(querystring, "w");
    const height: string | undefined = getQuerystring(querystring, "h");
    const quality: string | undefined = getQuerystring(querystring, "q");

    const parseUri: string = decodeURIComponent(uri);
    const objKey: string = parseUri.substring(1);
    const splitKey: string[] = objKey.split(".");
    const ext: string = splitKey[splitKey.length - 1].toLowerCase();

    if (!allowedExtension.includes(ext)) {
      console.log(`Not Allow ext ${ext}`);
      return callback(null, response);
    }

    if (!querystring) {
      console.log(`query string empty response origin`);
      return callback(null, response);
    }

    const file = await getFileFromS3(objKey, bucketName);

    const w: number | undefined = width ? +width : undefined;
    const h: number | undefined = height ? +height : undefined;
    const q: number | undefined = quality ? +quality : undefined;
    const resizeParams: ResizePrams = { w, h, q };

    const buffer =
      ext === "heic"
        ? await convert({ buffer: file, format: "JPEG", quality: 1 })
        : file;

    const base64: string = await resizeImage(buffer, resizeParams);

    response.status = 200;
    response.body = base64;
    response.bodyEncoding = "base64";
    callback(null, response);
  } catch (error) {
    response.status = 400;
    response.body = JSON.stringify(error);
    callback(null, response);
  }
};

const getFileFromS3 = async (
  key: string,
  bucketName: string
): Promise<Uint8Array> => {
  const command = new GetObjectCommand({
    Key: key,
    Bucket: bucketName,
  });
  const file = await s3.send(command);
  const { Body } = file;
  if (!Body) {
    throw new Error(`Not Found Object ${bucketName} : ${key}`);
  }
  const data = await file.Body!.transformToByteArray();
  return data;
};

const resizeImage = async (
  data: Uint8Array | ArrayBuffer,
  resizePrams: ResizePrams
): Promise<string> => {
  const { h, q, w } = resizePrams;
  try {
    const imageBuffer: Buffer = await Sharp(data)
      .resize({ width: w, height: h })
      .toFormat("webp", { quality: q })
      .toBuffer();
    const imageBase64: string = imageBuffer.toString("base64");
    return imageBase64;
  } catch (error) {
    throw new Error(`Image Resize Error ${error}`);
  }
};

const getQuerystring = (
  querystring: string,
  key: keyof RequestQuery
): string | undefined => {
  const query = new URLSearchParams("?" + querystring).get(key);
  return query ?? undefined;
};
