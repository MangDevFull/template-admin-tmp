import express from 'express';
import {MemberService} from "../services/staticPage.service.js";
import { uploadImageMiddleware } from "../services/uploadImage.service.js";

const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = './layouts/main.hbs'
  next();
})

router.route('/')
.get(MemberService.showData)
.post(MemberService.createPage)

router.get("/create",(req,res)=>{
  res.render('create-page',{title:"Create page"})
})

router.route('/:slug')
  .get(MemberService.getDetails)
  .post(MemberService.updatePage)






export default router;