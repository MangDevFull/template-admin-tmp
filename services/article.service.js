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
      const article = await Article.findOne({slug: slug}).populate('category')
      const categories = await Category.find({type: categoryTypeEnum.ARTICLE,_id:{$ne:article.category._id}});
      return res.render('news-detail', {
        article: article,
        categories,
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
      const { title, subTitle, thumbnail, content, source,category,status } = req.body;
      const file = req.file
      let location = file?.location;
       await Article.create({
        title,
        subTitle,
        category,
        content : content || "",
        thumbnail: location,
        source,
        status
      });

     return res.redirect('/news')

    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  updateArticle: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const article = await Article.findOne({ slug: slug});
      if (!article) return res.json(Response.notFound());

      const { title, subTitle, thumbnail, source,category,content,status } = req.body;
      let isChange = false;
      if (title && article.title !== title) {
        article.title = title;
        isChange = true;
      }
      if (status && article.status !== status) {
        article.status = status;
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
      if (category && article.category != category) {
        article.category = category;
        isChange = true;
      }
      if (source && article.source !== source) {
        article.source = source;
        isChange = true;
      }
      if (content && article.content !== source) {
        article.content = content;
        isChange = true;
      }
      if(isChange) await article.save();

      return httpMsgs.sendJSON(req,res,{'boolean' : true,"ac":article})

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
