import { RequestHandler } from "express";
import formidable, { File } from "formidable";

declare global {
  namespace Express {
    interface Request {
      // single file
      file?: File;
    }
  }
}

const fileParser: RequestHandler = async (req, res, next) => {
  const form = formidable();

  const [fields, files] = await form.parse(req);

  if (!req.body) req.body = {};

  for (let key in fields) {
    req.body[key] = fields[key]![0];
  }

  if (!req.file) req.file = {} as File;

  for (let key in files) {
    req.file = files[key]![0];
  }
  next();
};

export default fileParser;
