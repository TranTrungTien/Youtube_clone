import Busboy, { BusboyHeaders } from "busboy";
import { Request, Response } from "express";
import { v4 } from "uuid";
import drive from "../helper/googledrive";

export const UploadVideo = async (req: Request, res: Response) => {
  const busboy = Busboy({ headers: req.headers as BusboyHeaders });
  busboy.on(
    "file",
    async (fieldName, fileStream, fileName, encoding, mimeType) => {
      try {
        const response = await drive.files.create({
          requestBody: {
            name: v4() + "-" + fieldName,
            mimeType: mimeType,
            parents: ["1gwDY4HhgFMVNh-G_er2pCwkH3Ua37sU8"],
          },
          media: {
            mimeType: mimeType,
            body: fileStream,
          },
        });
        return res.status(201).send(response.data);
      } catch (error) {
        console.log({ error });
        res.status(500).send({ error });
      }
    }
  );
  req.pipe(busboy);
};

export const GetVideoAsset = (req: Request, res: Response) => {
  const id = req.query.id as string;
  const size = req.query.size;
  const mimeType = req.query.mimeType as string;

  const range = req.headers.range || "range=0";
  const video_id = id;
  if (!range) return res.status(400).send({ message: "Require range" });

  const sizeVideo = Number(size) || 0;

  console.log(video_id, " : ", size);
  // const chunk = 3 * (10 ^ 6);
  // const start = Number(range.replace(/\D/g, ""));
  // const end = Math.min(start + chunk, sizeVideo - 1);
  // const contentLength = end - start + 1;

  const parts = range.replace(/bytes=/, "").split("-");
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : sizeVideo - 1;
  const contentLength = end - start + 1;
  console.log(
    "start : ",
    start,
    "end :",
    end,
    "content length : ",
    contentLength
  );
  const headers = {
    "Content-Type": mimeType,
    "Content-Range": `bytes ${start}-${end}/${sizeVideo}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
  };
  try {
    drive.files.get(
      {
        fileId: video_id,
        alt: "media",
      },
      {
        headers: {
          Range: `bytes=${start}-${end}`,
        },
        responseType: "stream",
      },
      (err, data) => {
        if (err) throw err;
        if (data) {
          res.writeHead(206, headers);
          data.data
            .on("end", () => console.log("done"))
            .on("error", (error) => console.log(error))
            .pipe(res);
        }
      }
    );
  } catch (error) {
    console.log({ getvideoAccess: error });
    return res.status(500).send({ getvideoAccess: error });
  }
};

export const GetImageAsset = async (req: Request, res: Response) => {
  const image_id = req.query.image_id as string;
  try {
    drive.files.get(
      {
        fileId: image_id,
        alt: "media",
      },
      {
        responseType: "stream",
      },
      (err, data) => {
        if (err) throw err;
        if (data) {
          res.writeHead(200);
          data.data
            .on("end", () => console.log("done"))
            .on("error", (error) => console.log(error))
            .pipe(res);
        }
      }
    );
  } catch (error) {
    console.log({ getimageAccess: error });
    return res.status(500).send({ getimageAccess: error });
  }
};
