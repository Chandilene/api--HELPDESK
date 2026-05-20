import multer from "multer";
import path from "node:path";
import crypto from "node:crypto";
import fs from "fs";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "temp");
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads");

if (!fs.existsSync(UPLOADS_FOLDER)) {
  fs.mkdirSync(UPLOADS_FOLDER, { recursive: true });
}

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

export { TMP_FOLDER, UPLOADS_FOLDER, MULTER };
