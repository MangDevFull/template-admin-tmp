import express from 'express';
import {MemberService} from "../services/member.service.js";
const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = './layouts/main.hbs'
  next();
})

router.route('/')
.get(MemberService.showData)
.post(MemberService.createMember)

router.route('/detail/:username')
.get(MemberService.viewDetail)
.post(MemberService.updateMember)




export default router;