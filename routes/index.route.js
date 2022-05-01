import express from 'express';
import AuthRouters from "./auth.route.js"
import memeberRouter from "./members.route.js";
import projectRouter from "./project.route.js"
import newsRouter from "./article.route.js"
import {MemberService} from "../services/contactMessage.service.js"
import careerRouter from "./career.route.js"
import uploadMedia from "../services/s3.service.js"

const router = express.Router();
router.get('/',(req, res) => {
    return res.render('index')
})
router.use('/auth',AuthRouters)
router.use('/members',memeberRouter)
router.use('/project',projectRouter)
router.get('/contacts',MemberService.showData)
router.use('/news',newsRouter)
router.use('/career',careerRouter)
router.use('/s3-upload',uploadMedia.getResignedUrl)



export default router;
