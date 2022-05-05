import express from 'express';
import AuthRouters from "./auth.route.js"
import memeberRouter from "./members.route.js";
import projectRouter from "./project.route.js"
import newsRouter from "./article.route.js"
import {MemberService} from "../services/contactMessage.service.js"
import careerRouter from "./career.route.js"
import uploadMedia from "../services/s3.service.js"
import pageRouter from "./page.route.js"

import {authorize} from '../middlewares/authorize.js'
import { accountTypeEnum } from '../enums/accountType.enum.js';
import { ArticleService } from '../services/article.service.js';
import s3Service from '../services/s3.service.js';
import { uploadImageMiddleware } from "../services/uploadImage.service.js";


const router = express.Router();
router.get('/', authorize(accountTypeEnum.ADMIN), ArticleService.showList)
router.use('/auth',AuthRouters)
router.use('/members', authorize(accountTypeEnum.ADMIN), memeberRouter)
router.use('/project', authorize(accountTypeEnum.ADMIN), projectRouter)
router.get('/contacts', authorize(accountTypeEnum.ADMIN),MemberService.showData)
router.use('/news', authorize(accountTypeEnum.ADMIN),newsRouter)
router.use('/career', authorize(accountTypeEnum.ADMIN),careerRouter)
router.use('/s3-upload', authorize(accountTypeEnum.ADMIN),uploadMedia.getResignedUrl)
router.use('/page', authorize(accountTypeEnum.ADMIN), pageRouter)
router.use('/ckeditor-images',uploadImageMiddleware, s3Service.getDownloadLink)


export default router;
