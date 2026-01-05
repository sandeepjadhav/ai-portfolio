import express from "express";
import multer from "multer";
import { ingestFile } from "../rag/ingest.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
  await ingestFile(req.file.path);
  res.json({ success: true });
});

export default router;
