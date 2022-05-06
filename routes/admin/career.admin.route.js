import express from "express";
import { CareersService } from "../../services/career.service.js";
import { uploadImageMiddleware } from "../../services/uploadImage.service.js";
const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = "./layouts/main.hbs";
  next();
});

router
  .route("/")
  .get(CareersService.index)
  .post(uploadImageMiddleware, CareersService.createCareer);

router.get("/create", CareersService.getCreateCareer);

router
  .route("/:slug")
  .get(CareersService.getDetails)
  .post(uploadImageMiddleware, CareersService.update);

export default router;
