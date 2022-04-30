import mongoose from 'mongoose';
import {mediaTypeEnum} from '../enums/mediaType.enum.js';

const { Schema } = mongoose;

const mediaSchema = new Schema({
  title: {
    type: String,
  },
  path: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: Object.values(mediaTypeEnum),
    default: mediaTypeEnum.IMAGE,
  },
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      delete ret.id;
    },
  },
});

const Media =  mongoose.model('Media', mediaSchema);

export {
  mediaSchema,
  Media
};