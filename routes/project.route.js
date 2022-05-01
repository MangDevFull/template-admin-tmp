import express from 'express';
import {ProjectService} from "../services/project.service.js";
const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = './layouts/main.hbs'
  next();
})

router.route('/')
.get(ProjectService.showList)

router.get("/create",ProjectService.getCreateProject)




export default router;