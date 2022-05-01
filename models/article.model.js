import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import slugify from 'slugify';
import mongoosePaginate from 'mongoose-paginate-v2';
import { articleStatusEnum } from '../enums/articleStatus.enum.js';

const { Schema } = mongoose;

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subTitle: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
      default: 'https://via.placeholder.com/300x300.jpg?text=tmptechnology.vn',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    content: {
      type: String,
    },
    source: {
      type: String,
    },
    tags: 
      [{type: Schema.Types.ObjectId,
        ref: 'Tag',}]
    ,
    slug: {
      type: String,
      default() {
        if (this.name) {
          return `${slugify(this.title)}-${nanoid(6)}`;
        }
      },
    },
    status: {
      type: Number,
      enum: Object.values(articleStatusEnum),
      default: articleStatusEnum.PUBLISHED,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.id;
      },
    },
  }
);

articleSchema.plugin(mongoosePaginate);

const Article = mongoose.model('article', articleSchema);
export { Article };
