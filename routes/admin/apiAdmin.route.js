import express from "express";
import memeberRouter from "./member.admin.route.js";
import projectRouter from "./project.admin.route.js";
import newsRouter from "./article.admin.route.js";
import { MemberService } from "../../services/contactMessage.service.js";
import careerRouter from "./career.admin.route.js";
import uploadMedia from "../../services/s3.service.js";
import pageRouter from "./page.admin.route.js";

import { authorize } from "../../middlewares/authorize.js";
import { accountTypeEnum } from "../../enums/accountType.enum.js";
import { ArticleService } from "../../services/article.service.js";
import s3Service from "../../services/s3.service.js";
import { uploadImageMiddleware } from "../../services/uploadImage.service.js";

const router = express.Router();

router.get("/", ArticleService.showList);
router.use("/members", memeberRouter);
router.use("/project", projectRouter);
router.get("/contacts", MemberService.showData);
router.use("/news", newsRouter);
router.use("/career", careerRouter);
router.use("/s3-upload", uploadMedia.getResignedUrl);
router.use("/page", pageRouter);
router.use(
  "/ckeditor-images",
  uploadImageMiddleware,
  s3Service.getDownloadLink
);

export default router;
