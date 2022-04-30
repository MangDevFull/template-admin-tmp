import { ContactMessage } from '../models/contactMessage.model.js';
import { Member } from '../models/members.model.js';

const MemberService = {
  showData: async (req, res, next) => {
    try {
      const contacts = await ContactMessage.find({}).sort({ createdAt: -1 });

      return res.render('about', {
        contactMessages: contacts,
        title: 'Danh sách ...',
      });
    } catch(err) { 
      console.error(err);
      return next(err);
    }
  },
  createMessage: async (req, res, next) => {
    try {
      const { name, email, subject, message } = req.body;

      const contactMsg = await ContactMessage.create({
        name, email, subject, message
      });

      // return res.json(Response.success(null, 'Ok'))
      console.log('success');
      return res.redirect('/')
    } catch (err) {
      console.error(err);
      return next(err);
    }
  },
};
export { MemberService };
