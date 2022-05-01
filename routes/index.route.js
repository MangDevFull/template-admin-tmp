import express from 'express';
import AuthRouters from "./auth.route.js"
import memeberRouter from "./members.route.js";

const router = express.Router();
router.get('/',(req, res) => {
    return res.render('index')
})
router.use('/auth',AuthRouters)
router.use('/members',memeberRouter)



export default router;
