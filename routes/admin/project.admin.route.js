import express from "express";
import { ProjectService } from "../../services/project.service.js";
import { uploadImageMiddleware } from "../../services/uploadImage.service.js";
const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = "./layouts/main.hbs";
  next();
});

router
  .route("/")
  .get(ProjectService.showList)
  .post(uploadImageMiddleware, ProjectService.createProject);

router.get("/create", ProjectService.getCreateProject);

router
  .route("/:slug")
  .get(ProjectService.getDetails)
  .post(uploadImageMiddleware, ProjectService.updateProject);

export default router;
