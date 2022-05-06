import express from "express";
import { MemberService } from "../../services/member.service.js";
import { uploadImageMiddleware } from "../../services/uploadImage.service.js";
const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = "./layouts/main.hbs";
  next();
});

router
  .route("/")
  .get(MemberService.showData)
  .post(uploadImageMiddleware, MemberService.createMember);

router.route("/new").get(MemberService.getCreateMember);

router
  .route("/edit/:username")
  .get(MemberService.getUpdate)
  .post(uploadImageMiddleware, MemberService.updateMember);

router.route("/detail/:username").get(MemberService.viewDetail);

export default router;
