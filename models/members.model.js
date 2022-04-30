import mongoose from 'mongoose';

const { Schema } = mongoose;

const memberSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    socialLinks: {
      facebook: String,
      youtube: String,
      tiktok: String,
      instagram: String,
    },
    featuredImage: {
      type: String,
      required: true,
      default: 'https://via.placeholder.com/300x300.jpg?text=tmptechnology.vn',
    },

    isDeleted: {
      type: Boolean,
      default: false,
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

const Member = mongoose.model('Member', memberSchema);
export { Member };
