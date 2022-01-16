import { Request, Response } from "express";
import Chanel from "../models/chanelmodel";
import Bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

export const CreateChanel = async (req: Request, res: Response) => {
  const username = req.body.username as string;
  const email = req.body.email as string;
  const password = req.body.password as string;
  if (!username || !email || !password) {
    return res.status(400).send("Bad Request");
  } else {
    try {
      Bcrypt.hash(password, 15, async (err, encryptedPassword) => {
        if (err) {
          return res.status(500).send({ err });
        } else {
          const chanel = new Chanel({
            username: username,
            email: email,
            password: encryptedPassword,
            imageProfileUrl: "",
            imageCoverUrl: "",
            yourVideos: [],
            likedVideos: [],
            dislikedVideos: [],
            subscriptions: [],
            playlists: [],
          });
          const response = await chanel.save();
          return res.status(201).send(response);
        }
      });
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  }
};

export const UpdateVideo = (req: Request, res: Response) => {
  const video_id = req.body.video_id as string;
  const id = req.chanel.id;
  if (!ObjectId.isValid(video_id) || !ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Bad Request" });
  } else {
    try {
      Chanel.findByIdAndUpdate(
        id,
        {
          $push: {
            yourVideos: video_id,
          },
        },
        { upsert: false },
        (err, doc) => {
          if (err) {
            throw err;
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
export const GetChanel = (req: Request, res: Response) => {
  const id = req.query.id as string;
  if (ObjectId.isValid(id)) {
    try {
      Chanel.findById(id, null, null)
        .populate("subscriptions")
        .populate("yourVideos")
        .populate("likedVideos")
        .populate("playlists.videos")
        .exec((err, doc) => {
          if (err) {
            throw err;
          } else {
            if (!doc) {
              return res.status(404).send({ message: "chanel not found" });
            }
            return res.status(200).send(doc);
          }
        });
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  } else {
    return res.status(400).send({ error: "Bad Request" });
  }
};
export const GetMyChanel = (req: Request, res: Response) => {
  const id = req.chanel.id;
  if (ObjectId.isValid(id)) {
    try {
      Chanel.findById(id, null, null)
        .populate("subscriptions")
        .populate("yourVideos")
        .populate("likedVideos")
        .populate("playlists.videos")
        .exec((err, doc) => {
          if (err) {
            throw err;
          } else {
            if (!doc) {
              return res.status(404).send({ message: "chanel not found" });
            }
            return res.status(200).send(doc);
          }
        });
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  } else {
    return res.status(400).send({ error: "Bad Request" });
  }
};
export const DeleteChanel = (req: Request, res: Response) => {};

export const UpdateSubscribe = (req: Request, res: Response) => {
  const subscribeChanel = req.body.subscribeChanel as string;
  const id = req.chanel.id;
  if (!ObjectId.isValid(id) || !ObjectId.isValid(subscribeChanel)) {
    return res.status(400).send({ error: "Bad Request" });
  } else {
    try {
      Chanel.findByIdAndUpdate(
        subscribeChanel,
        {
          $push: {
            subscriptions: id,
          },
        },
        {
          upsert: false,
          new: true,
        },
        (err, doc) => {
          if (err) {
            throw err;
          } else if (!doc) {
            return res.status(404).send({ message: "chanel not found" });
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

export const UpdateLikedVideo = (req: Request, res: Response) => {
  const video_id = req.body.video_id as string;
  const addmore = req.body.addmore as string;
  const id = req.chanel.id;
  if (!ObjectId.isValid(id) || !ObjectId.isValid(video_id)) {
    return res.status(400).send({ error: "Bad Request" });
  } else {
    try {
      if (Boolean(addmore)) {
        Chanel.findByIdAndUpdate(
          id,
          {
            $push: {
              likedVideos: video_id,
            },
          },
          {
            upsert: false,
            new: true,
          },
          (err, doc) => {
            if (err) {
              throw err;
            } else if (!doc) {
              return res.status(404).send({ message: "chanel not found" });
            } else {
              return res.status(200).send(doc);
            }
          }
        );
      } else {
        Chanel.findByIdAndUpdate(
          id,
          {
            $pull: {
              likedVideos: video_id,
            },
          },
          {
            upsert: false,
            new: true,
          },
          (err, doc) => {
            if (err) {
              throw err;
            } else if (!doc) {
              return res.status(404).send({ message: "chanel not found" });
            } else {
              return res.status(200).send(doc);
            }
          }
        );
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  }
};

export const UpdateDislikedVideo = (req: Request, res: Response) => {
  const video_id = req.body.video_id as string;
  const addmore = req.body.addmore as string;
  const id = req.chanel.id;
  if (!ObjectId.isValid(id) || !ObjectId.isValid(video_id)) {
    return res.status(400).send({ error: "Bad Request" });
  } else {
    try {
      if (Boolean(addmore)) {
        Chanel.findByIdAndUpdate(
          id,
          {
            $push: {
              dislikedVideos: video_id,
            },
          },
          {
            upsert: false,
            new: true,
          },
          (err, doc) => {
            if (err) {
              throw err;
            } else if (!doc) {
              return res.status(404).send({ message: "chanel not found" });
            } else {
              return res.status(200).send(doc);
            }
          }
        );
      } else {
        Chanel.findByIdAndUpdate(
          id,
          {
            $pull: {
              dislikedVideos: video_id,
            },
          },
          {
            upsert: false,
            new: true,
          },
          (err, doc) => {
            if (err) {
              throw err;
            } else if (!doc) {
              return res.status(404).send({ message: "chanel not found" });
            } else {
              return res.status(200).send(doc);
            }
          }
        );
      }
    } catch (error) {
      console.log({ error });
      return res.status(500).send({ error });
    }
  }
};

export const Login = (req: Request, res: Response) => {
  const email = req.body.email as string;
  const password = req.body.password as string;
  if (!email || !password) {
    return res.status(400).send("Bad Request");
  } else {
    try {
      Chanel.findOne({ email: email }, null, null)
        .populate("subscriptions")
        .populate("yourVideos")
        .populate("likedVideos")
        .populate("playlists.videos")
        .exec((err, doc) => {
          if (err) {
            throw err;
          } else {
            if (!doc) {
              return res.status(404).send({ message: "not found" });
            } else {
              Bcrypt.compare(password, doc.password, (err, same) => {
                if (err) {
                  throw err;
                }
                if (!same) {
                  return res
                    .status(400)
                    .send({ message: "Email or Password is wrong" });
                } else {
                  const payload = {
                    id: doc._id,
                  };
                  const token = Jwt.sign(
                    payload,
                    process.env.JWT_SECRET as string,
                    { expiresIn: 3600 }
                  );
                  return res
                    .status(200)
                    .cookie("token", token, {
                      expires: new Date(Date.now() + 3600000),
                      httpOnly: true,
                    })
                    .send(doc);
                }
              });
            }
          }
        });
    } catch (error) {
      return res.status(500).send({ error });
    }
  }
};

export const DeleteCookie = (req: Request, res: Response) => {
  const chanel = req.chanel;
  if (ObjectId.isValid(chanel.id)) {
    res.clearCookie("token");
    return res.status(200).send({ message: "Cookie has been deleted" });
  } else {
    return res.status(400).send({ error: "Bad Request" });
  }
};
