import express from 'express';
import {ArticleService} from "../services/article.service.js";
const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = './layouts/main.hbs'
  next();
})

router.route('/')
.get(ArticleService.showList)

router.get("/create",ArticleService.getCreateArticle)




export default router;