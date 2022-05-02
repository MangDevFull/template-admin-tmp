import {Member} from "../models/members.model.js";
import httpMsgs from "http-msgs";
const MemberService = {
    showData: async (req, res, next) => {
        const members = await Member.find({isDeleted: false})
        return res.render('member', {members: members, title: "Member Accounts Management"})
    },
    viewDetail: async (req, res, next) => {
        try {
            const {username} = req.params
            const mem = await Member.findOne({username: username})
            console.log("mem",mem)
            return res.render('member-detail', {mem: mem, title: "Member Detail"})
        } catch (error) {
            console.error(error)
            return next(error)
        }
    },
    createMember: async (req, res, next) => {
        try {
            const {fullName, position, featuredImage, face,email,dOB,ig,phone} = req.body
            console.log("body",position)
            const members = await Member.create({
                fullName,
                position,
                socialLinks:{
                    facebook:face,
                    instagram: ig
                },
                featuredImage,
                email,
                date:dOB,
                phone:phone,
            })
            return  httpMsgs.sendJSON(req,res,{'boolean' : true,"ac":members})
        } catch (e) {
            console.log(e)
        }
    },
    updateMember: async (req, res, next) => {
        try {
            const {username} = req.params
            const {fullName, position, featuredImage, face,email,dOB,ig,phone} = req.body

            const members = await Member.findOneAndUpdate({username:username},{
               $set:{
                fullName,
                position,
                socialLinks:{
                    facebook:face,
                    instagram: ig
                },
                featuredImage,
                email,
                date:dOB,
                phone:phone,
               }
            },
            {
                new:true,
            }
            )
            return  httpMsgs.sendJSON(req,res,{'boolean' : true,"ac":members})
        } catch (e) {
            console.log(e)
        }
    }
};
export {MemberService}