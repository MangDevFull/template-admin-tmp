import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const contactMessageSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    subject: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamp: true }
);

contactMessageSchema.plugin(mongoosePaginate);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export { ContactMessage };
