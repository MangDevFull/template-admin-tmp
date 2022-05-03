import { Project } from '../models/project.model.js';
import {Category} from '../models/category.model.js'
import { projectStatusEnum } from '../enums/projectStatus.enum.js';
import { Response } from '../utils/response.js';
import { categoryTypeEnum } from '../enums/categoryType.enum.js';
import httpMsgs from "http-msgs";

const ProjectService = {
  showList: async (req, res, next) => {
    try {
      const projects = await Project.find().populate('category').sort({ createdAt: -1 });

      console.log(projects)
      return res.render('list-project', {
        projects: projects,
        title: 'Project List',
      });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  getDetails: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const project = await Project.findOne({ slug: slug }).populate('category');
      const categories = await Category.find({type: categoryTypeEnum.PROJECT,_id:{$ne:project.category._id}});
      return res.render('project-detail', {
        project: project,
        categories,
        title: project.title,
      });
    } catch (err) {
      console.log(err);
      return next(err);
    }
  },

  getCreateProject: async(req, res, next) => {
    try {
      const categories = await Category.find({type: categoryTypeEnum.PROJECT});
      return  res.render('create-project',{
        cates: categories,
        title: "Project create",
      })
     
    } catch(err) {
      console.error(err);
      return next(err);
    }
  },

  createProject: async (req, res, next) => {
    try {
      const { title, content, category, status } = req.body;
      const file = req.file
      let location = file?.location;

        const cat = await Category.findOne({_id: category, type: categoryTypeEnum.PROJECT})
        if(!cat) return  httpMsgs.sendJSON(req,res,{"boolean":false});

        await Project.create({
        title,
        content: content || "content",
        thumbnail:location,
        category: category,
        status,

      });
        return res.redirect('/project')
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  updateProject: async (req, res, next) => {
    try {
      const { slug } = req.params;
      const project = await Project.findOne({ slug: slug});
      if (!project) return res.json(Response.notFound());

      const { title, content, thumbnail, category, status } = req.body;
      console.log(req.body)
      let isChange = false;
      if (title && project.title !== title) {
        project.title = title;
        isChange = true;
      }
      if (content && project.content !== content) {
        project.content = content;
        isChange = true;
      }
      if (thumbnail && project.thumbnail !== thumbnail) {
        project.thumbnail = thumbnail;
        isChange = true;
      }
      if (category && project.category != category) {
        project.category = category;
        isChange = true;
      }
      if (status && project.status != status) {
        project.status = status;
        isChange = true;
      }
      if(isChange) await project.save();

      return httpMsgs.sendJSON(req,res,{'boolean' : true,"ac":project})
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },

  deleteProject: async (req, res, next) => {
    try {
      const { id } = req.params;
      const checkDelete = await Project.findOne({
        _id: id,
        status: { $ne: projectStatusEnum.DELETED },
      });
      if (!checkDelete) return res.json('Project not found');
      const project = await Project.findByIdAndUpdate(
        id,
        { $set: { status: projectStatusEnum.DELETED } },
        { new: true }
      );
      return res.json(Response.success(project));
    } catch (error) {
      console.error(error);
      return next(error);
    }
  },
};
export { ProjectService };
