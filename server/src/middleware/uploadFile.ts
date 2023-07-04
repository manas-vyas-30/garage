import multer from "multer";

const fileStorageEng = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({
  storage: fileStorageEng,
  limits: { fileSize: 1024 * 1024 * 10 },
});

export default upload;
