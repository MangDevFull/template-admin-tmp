import vars from '../vars.js'
import util from 'util'
import multer from 'multer'
import multerS3 from 'multer-s3'
import path from 'path'
import { nanoid } from 'nanoid'
import s3 from '../s3.js'
const maxSize = 2 * 1024 * 1024

const allowedGalleryTypes = ['image/jpeg', 'image/png']

const galleryFilter = (req, file, cb) => {
  if (!allowedGalleryTypes.includes(file.mimetype)) {
    return cb(new Error('Invalid file type! Only images is allowed!'))
  }

  return cb(null, true)
}

const storage = multerS3({
  acl: 'public-read',
  s3,
  bucket: vars.s3Bucket,
  key: (req, file, cb) => {
    cb(
      null,
      `data/images/products/${nanoid()}${path.extname(file.originalname)}`,
    )
  },
})



const uploadImage = multer({
  fileFilter: galleryFilter,
  storage: storage,
  limits: { fileSize: maxSize },
}).single('image')

const uploadImageMiddleware = util.promisify(uploadImage)

export { uploadImageMiddleware }
