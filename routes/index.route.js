import express from 'express';
import {indexPage, servicesPage} from '../services/index.service.js'
import {ArticleService} from "../services/article.service.js";
import {MemberService} from "../services/member.service.js";
import { CareersService } from "../services/career.service.js"
import info from "../info.js";

const router = express.Router();
router.use((req, res, next) => {
    res.locals.info = info;
    next();
});

/* GET home page. */
router.route('/').get(indexPage)
router.route('/service').get(servicesPage);
// router.route('/about').get(aboutPage)
router.route('/about').get(MemberService.showData);
router.route('/postMember').post(MemberService.createMember)

router.route('/articles').get(ArticleService.showList)
router.route('/articles/new').post(ArticleService.createArticle)

router.route('/adminNoAuthen/postCareers').post(CareersService.createCareer)
router.route('/careers').get(CareersService.index)
router.route('/careers/:slug').get(CareersService.getDetails)
router.route('/careers/:id/delete').delete(CareersService.deleteCareer)

router.get("/services-products", function (req, res, next) {
    res.render("all-services/services-products", {
        title: "Dịch vụ và sản phẩm phần mềm",
    });
});
router.get("/services-electronic-digital", function (req, res, next) {
    res.render("all-services/services-electronic-digital", {
        title: "Dịch vụ và thiết bị số hoá điện tử",
    });
});
router.get("/information-security-system", function (req, res, next) {
    res.render("all-services/information-security-system", {
        title: "Hệ thống an toàn thông tin",
    });
});
router.get("/high-tech-security-system", function (req, res, next) {
    res.render("all-services/high-tech-security-system", {
        title: "Hệ thống an ninh công nghệ cao",
    });
});
router.get("/buy-rent-LED", function (req, res, next) {
    res.render("all-services/buy-rent-LED", {
        title: "Bán và cho thuê màn hình LED",
    });
});
router.get("/urban-decor", function (req, res, next) {
    res.render("all-services/urban-decor", {title: "Trang trí đô thị"});
});
router.get("/office-stage", function (req, res, next) {
    res.render("all-services/office-stage", {
        title: "Nội thất văn phòng và sân khấu chuyên nghiệp",
    });
});
router.get("/supply-supplies-equipment", function (req, res, next) {
    res.render("all-services/supply-supplies-equipment", {
        title: "Cung ứng vật tư và thiết bị văn phòng",
    });
});
router.get("/contact", function (req, res, next) {
    res.render("contact", {title: "Liên hệ"})
})


export default router;
