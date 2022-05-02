import { staticPageStatusEnum } from '../enums/staticPageStatus.enum.js';
import { StaticPage } from '../models/staticPage.model.js';
import { Response } from '../utils/response.js';

const MemberService = {
  showData: async (req, res, next) => {
    try {
      const pages = await StaticPage.find({}).sort({ createdAt: -1 });

      return res.render('contact', {
        pages: pages,
        title: 'List static pages',
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  getDetails: async (req, res, next) => {
    try {
      const {slug} = req.params
      const staticPage = await StaticPage.findOne({slug: slug})
    
      return res.render('staticpage-detail', {
        staticPage,
        title: staticPage.title
      })
    } catch(err) {
      console.log(err);
      return next(err);
    }
  },

  createPage: async (req, res, next) => {
    try {
      const { name, title, content, status } = req.body;

      const staticPage = await StaticPage.create({
        name,
        title,
        content,
        status,
      });

      return res.json(Response.success(staticPage, 'Ok'));
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  updatePage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, title, content, status } = req.body;

      const page = await StaticPage.findOne({ _id: id });

      let isChange = false;
      if (title && page.title !== title) {
        page.title = title;
        isChange = true;
      }
      if (name && page.name !== name) {
        page.name = name;
        isChange = true;
      }
      if (content && page.content !== content) {
        page.content = content;
        isChange = true;
      }
      if (status && page.status !== status) {
        page.status = status;
        isChange = true;
      }

      if (isChange) await page.save();
      return res.json(Response.success(page));
    } catch (e) {
      console.log(e);
    }
  },

  deletePage: async(req, res, next) => {
    try {
      const { id } = req.params;
      const checkDelete = await StaticPage.findOne({ _id: id, status: {$ne: staticPageStatusEnum.DELETED} });
      if (!checkDelete) return res.json(Response.notFound());
      const page = await StaticPage.findByIdAndUpdate(id, { $set: { status: staticPageStatusEnum.DELETED } }, { new: true });
      return res.json(Response.success(page));
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
};
export { MemberService };
