import { articleStatusEnum } from '../enums/articleStatus.enum.js';
import { categoryTypeEnum } from '../enums/categoryType.enum.js';
import { Article } from '../models/article.model.js';
import { Category } from '../models/category.model.js';
import { Response } from '../utils/response.js';
import httpMsgs from "http-msgs";

const ArticleService = {
  showList: async (req, res, next) => {
    try {
      const articles = await Article.find({
        status: articleStatusEnum.PUBLISHED,
    }).populate('category').sort({ createdAt: -1 });
      return res.render('news', { articles: articles, title: 'News' });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  getDetails: async (req, res, next) => {
    try {
      const {slug} = req.params
      const article = await Article.findOne({slug: slug}).populate('category author')
      return res.render('article-details', {
        article: article,
        title: article.title
      })
    } catch(err) {
      console.log(err);
      return next(err);
    }
  },

  getCreateArticle: async(req, res, next) => {
    try {
      const categories = await Category.find({type: categoryTypeEnum.ARTICLE});

      return res.render('create-article', {
        categories,
        title: "Create article"
      })
    } catch(err) {
      console.error(err);
      return next(err);
    }
  },

  createArticle: async (req, res, next) => {
    try {
      const { title, subTitle, thumbnail, content, source,category } = req.body;

      const article = await Article.create({
        title,
        subTitle,
        category,
        content,
        thumbnail,
        source,
      });

      // return res.json(Response.success()) or return res.render()...
      return httpMsgs.sendJSON(req,res,{'boolean' : true,"ac":article})

    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  updateArticle: async (req, res, next) => {
    try {
      const { id } = req.params;
      const article = await Article.findById(id);
      if (!article) return res.json(Response.notFound());

      const { title, subTitle, thumbnail, source } = req.body;
      let isChange = false;
      if (title && article.title !== title) {
        article.title = title;
        isChange = true;
      }
      if (subTitle && article.subTitle !== subTitle) {
        article.subTitle = subTitle;
        isChange = true;
      }
      if (thumbnail && article.thumbnail !== thumbnail) {
        article.thumbnail = thumbnail;
        isChange = true;
      }
      if (source && article.source !== source) {
        article.source = source;
        isChange = true;
      }
      if(isChange) await article.save();

      // return res.json(Response.success()) or return res.render()...
      return res.redirect('/')

    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  deleteArticle: async(req, res, next) => {
    try {
      const { id } = req.params;
      const checkDelete = await Article.findOne({ _id: id, status: {$ne: articleStatusEnum.DELETED} });
      if (!checkDelete) return res.json("Career not found");
      const article = await Article.findByIdAndUpdate(id, { $set: { status: careerStatusEnum.DELETED } }, { new: true });
      return res.json(Response.success(article));
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
};
export { ArticleService };
