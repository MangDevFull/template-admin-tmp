import { careerStatusEnum } from "../enums/careerStatus.enum.js"
import { Career } from "../models/career.model.js"
import {Tag} from '../models/tag.model.js'
import { tagTypeEnum } from "../enums/tagType.enum.js"

import {Response} from '../utils/response.js'
import httpMsgs from "http-msgs";


const CareersService = {
  index: async (req, res, next) => {
    const careers = await Career.find({ status: careerStatusEnum.PUBLISHED }).populate("tags")
    console.log(careers)
    return res.render('career', {
      careers: careers,
      title: 'Carrer list ',
    })
  },

  getDetails: async (req, res, next) => {
    try {
      const {slug} = req.params
      const career = await Career.findOne({slug: slug}).populate('tags')
      return res.render('career-details', {
        career: career,
        title: career.title
      })
    } catch(err) {
      console.log(err);
      return next(err);
    }
  },

  getCreateCareer: async(req, res, next) => {
    try {
      const tags = await Tag.find({type: tagTypeEnum.ARTICLE});

      return res.render('create-career', {
        tags,
        title: "Create career"
      })
    } catch(err) {
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

      const fTags = tags.split(',')

      console.log(fTags)

      const career = await Career.create({
        title,
        position,
        featuredImage,
        expirationWork,
        salary,
        location,
        status,
        timeTable:{
          timeTitle,
          timeWork
        },
        content,
        tags:fTags
      })
      return httpMsgs.sendJSON(req,res,{'boolean' : true,"ac":career})
    } catch (e) {
      console.log(e)
    }
  },

  deleteCareer: async (req, res, next) => {
    try {
      const { id } = req.params;
      const checkDelete = await Career.findOne({ _id: id, status: {$ne: careerStatusEnum.DELETED} });
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
