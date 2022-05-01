import express from 'express';
import {CareersService} from "../services/career.service.js";
const router = express.Router();
router.use((req, res, next) => {
  res.locals.layout = './layouts/main.hbs'
  next();
})

router.route('/')
.get(CareersService.index)

router.get("/create",CareersService.getCreateCareer)




export default router;