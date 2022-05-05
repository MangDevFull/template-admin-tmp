import { careerStatusEnum } from "../enums/careerStatus.enum.js"
import { Career } from "../models/career.model.js"
import { Tag } from '../models/tag.model.js'
import { tagTypeEnum } from "../enums/tagType.enum.js"

import { Response } from '../utils/response.js'
import httpMsgs from "http-msgs";


const CareersService = {
  index: async (req, res, next) => {
    const careers = await Career.find().populate("tags")
    console.log(careers)
    return res.render('career', {
      careers: careers,
      title: 'Carrer list ',
    })
  },



  getDetails: async (req, res, next) => {
    try {
      const { slug } = req.params
      const career = await Career.findOne({ slug: slug }).populate('tags')
      const t = career.tags.map(tag => {
        return tag._id
      })
      console.log("t", t)
      console.log(career)
      const tags = await Tag.find({ type: tagTypeEnum.ARTICLE, _id: { $nin: t } });
      console.log(career)
      return res.render('career-detail', {
        career: career,
        tags,
        title: career.title
      })
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  getCreateCareer: async (req, res, next) => {
    try {
      const tags = await Tag.find({ type: tagTypeEnum.ARTICLE });

      return res.render('create-career', {
        tags,
        title: "Create career"
      })
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  createCareer: async (req, res, next) => {
    try {
      const {
        title,
        position,
        featuredImage,
        timeTitle,
        timeWork,
        expirationWork,
        salary,
        location,
        status,
        content,
        tags,
      } = req.body
      const file = req.file
      let thum = file?.location;

      await Career.create({
        title,
        position,
        featuredImage,
        expirationWork,
        salary,
        location,
        featuredImage: thum,
        status,
        timeTable: {
          timeTitle,
          timeWork
        },
        content,
        tags: tags
      })
      return res.redirect('/career')
    } catch (e) {
      console.log(e)
    }
  },

  update: async (req, res, next) => {
    try {
      const { slug } = req.params
      const {
        title,
        position,
        featuredImage,
        timeTitle,
        timeWork,
        expirationWork,
        salary,
        location,
        status,
        content,
        tags,
      } = req.body
      console.log('tags',tags)
      const file = req.file
      let thum = file?.location;
      let updateQ = {}
      if (status) {
        updateQ = {
          ...updateQ,
          status: status
        }
      } else {
        updateQ = {
          ...updateQ,
          title,
          position,
          featuredImage,
          expirationWork,
          salary,
          location,
          status,
          timeTable: {
            timeTitle,
            timeWork
          },
          content,
          tags
        }
      }
      if (thum) {
        updateQ = {
          ...updateQ,
          featuredImage: thum
        }
      }
      const career = await Career.findOneAndUpdate({ slug: slug }, {
        $set: updateQ
      }, { new: true })
      if(status){
        return httpMsgs.sendJSON(req, res, { 'boolean': true, "ac": career })
      }else{
        return res.redirect(`/career/${slug}`)
      }
    } catch (e) {
      console.log(e)
    }
  },

  deleteCareer: async (req, res, next) => {
    try {
      const { id } = req.params;
      const checkDelete = await Career.findOne({ _id: id, status: { $ne: careerStatusEnum.DELETED } });
      if (!checkDelete) return res.json("Career not found");
      const career = await Career.findByIdAndUpdate(id, { $set: { status: careerStatusEnum.DELETED } }, { new: true });
      return res.json(Response.success(career));
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
}
export { CareersService }
