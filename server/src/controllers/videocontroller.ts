import { Request, Response } from "express";
import mongoose from "mongoose";
import Video from "../models/videomodel";

const ObjectId = mongoose.Types.ObjectId;

export const CreateVideo = async (req: Request, res: Response) => {
  console.log(req.body);
  const title = req.body.title as string;
  const chanel_id = req.body.chanel_id as string;
  const description = req.body.description as string;
  const poster_id = req.body.poster_id as string;
  const duration = req.body.duration as string;
  const id = req.body.id as string;
  const size = req.body.size as string;
  const mimeType = req.body.mimeType as string;

  if (!duration || !title || !ObjectId.isValid(chanel_id) || !id) {
    return res.status(400).send("Bad Request");
  } else {
    const videoUrl =
      "http://localhost:4000/api/assets/video?id=" +
      id +
      "&size=" +
      size +
      "&mimeType=" +
      mimeType;
    const posterUrl = poster_id
      ? "http://localhost:4000/api/assets/image?id=" + poster_id
      : "";
    const video = new Video({
      id: id,
      title: title,
      chanel: chanel_id,
      size: size,
      type: mimeType,
      comments: [],
      poster: posterUrl,
      description: description,
      dislike: 0,
      like: 0,
      duration: parseInt(duration),
      videoUrl: videoUrl,
      views: 0,
    });
    try {
      const response = await video.save();
      return res.status(201).send(response);
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
};
export const UpdateCommentVideo = (req: Request, res: Response) => {
  const comment_id = req.body.comment_id as string;
  const video_id = req.body.video_id as string;
  if (!ObjectId.isValid(comment_id) || !ObjectId.isValid(video_id)) {
    return res.status(400).send({ message: "Bad Request" });
  } else {
    try {
      Video.findByIdAndUpdate(
        video_id,
        {
          $push: {
            comments: comment_id,
          },
        },
        { upsert: false, new: true },
        (err, doc) => {
          if (err) {
            throw err;
          } else {
            if (!doc) {
              return res.status(404).send({ message: "video not found" });
            } else {
              return res.status(200).send(doc);
            }
          }
        }
      );
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  }
};

export const GetVideo = (req: Request, res: Response) => {
  const id = req.query.id as string;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Bad Request" });
  } else {
    try {
      Video.findById(id, null, null)
        .populate({
          path: "chanel",
          model: "Chanel",
          populate: [
            {
              path: "subscriptions",
              model: "Chanel",
            },
          ],
        })
        .populate({
          path: "comments",
          model: "Comment",
          populate: [
            {
              path: "chanel",
              model: "Chanel",
            },
          ],
        })
        .exec((error, doc) => {
          if (error) {
            throw error;
          } else {
            if (!doc) {
              return res.status(404).send({ message: "video not found" });
            } else {
              return res.status(200).send(doc);
            }
          }
        });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
};
export const VideoRecommended = (req: Request, res: Response) => {
  try {
    Video.find({}, null, { limit: 10 })
      .populate("chanel")
      .exec((error, doc) => {
        if (error) {
          throw error;
        } else {
          return res.status(200).send(doc);
        }
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
};
export const GetRelativeVideo = (req: Request, res: Response) => {
  const queryString = req.query.queryString as string;
  console.log(queryString);
  try {
    Video.find(
      { $text: { $search: queryString } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .populate("chanel")
      .limit(20)
      .exec((error, doc) => {
        if (error) {
          throw error;
        } else {
          if (!doc) {
            return res.status(404).send({ message: "video not found" });
          } else {
            return res.status(200).send(doc);
          }
        }
      });
  } catch (error) {
    console.log({ error });
    return res.status(500).send({ error });
  }
};

export const GetChanelRelativeVideo = (req: Request, res: Response) => {
  const chanel_id = req.query.chanel_id as string;
  if (!ObjectId.isValid(chanel_id)) {
    return res.status(400).send({ message: "Bad Request" });
  }
  try {
    Video.find({ chanel: chanel_id }, null, { limit: 3 })
      .populate("chanel")
      .exec((error, doc) => {
        if (error) {
          throw error;
        } else if (!doc) {
          return res.status(404).send({ message: "video not found" });
        } else {
          return res.status(200).send(doc);
        }
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export const Search = (req: Request, res: Response) => {
  const queryString = req.query.queryString as string;
  console.log({ queryString });
  if (!queryString) {
    return res.status(400).send({ message: "Bad Request" });
  } else {
    try {
      Video.find(
        {
          $text: {
            $search: queryString,
            $caseSensitive: true,
          },
        },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .populate("chanel")
        .exec((err, doc) => {
          console.log({ doc });
          if (err) throw err;
          else if (!doc) {
            return res.status(404).send({ message: "video not found" });
          } else return res.status(200).send(doc);
        });
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  }
};

export const IncrementView = (req: Request, res: Response) => {
  const inc = req.body.inc as string;
  const video_id = req.body.video_id as string;
  if (parseInt(inc) > 1 || parseInt(inc) < 0 || !ObjectId.isValid(video_id)) {
    return res.status(400).send({ message: "Bad Request" });
  } else {
    try {
      Video.findByIdAndUpdate(
        video_id,
        {
          $inc: {
            views: parseInt(inc),
          },
        },
        { upsert: false, new: true },
        (error, doc) => {
          if (error) {
            throw error;
          } else if (!doc) {
            return res.status(404).send({ message: "video not found" });
          } else {
            return res.status(200).send(doc);
          }
        }
      );
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  }
};

export const IncrementLikeAndDislike = (req: Request, res: Response) => {
  const action = req.body.action as string;
  const decrementLike = req.body.decrementLike as string;
  const decrementDisLike = req.body.decrementDisLike as string;
  const video_id = req.body.video_id as string;
  const id = req.chanel.id;
  if (!action || !ObjectId.isValid(video_id) || !ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Bad Request" });
  } else {
    const like = action === "like" ? (Boolean(decrementLike) ? -1 : 1) : 0;
    const dislike =
      action === "dislike" ? (Boolean(decrementDisLike) ? -1 : 1) : 0;
    try {
      Video.findByIdAndUpdate(
        video_id,
        {
          $inc: {
            like: like,
            dislike: dislike,
          },
        },
        { upsert: false, new: true },
        (error, doc) => {
          if (error) {
            throw error;
          } else if (!doc) {
            return res.status(404).send({ message: "video not found" });
          } else {
            return res.status(200).send(doc);
          }
        }
      );
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  }
};

export const DeleteVideo = (req: Request, res: Response) => {};
