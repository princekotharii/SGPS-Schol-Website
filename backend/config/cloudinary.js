import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

// Use Multer's memory storage and upload directly to Cloudinary
const storage = multer.memoryStorage()

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
}

// Create multer upload instances
export const uploadGallery = multer({ 
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
})

export const uploadEvent = multer({ 
  storage: storage,
  limits: { 
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: fileFilter
})

export const uploadProfile = multer({ 
  storage: storage,
  limits: { 
    fileSize: 2 * 1024 * 1024 // 2MB
  },
  fileFilter: fileFilter
})

// Upload buffer to Cloudinary
export const uploadToCloudinary = async (buffer, folder, transformation = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        transformation: transformation,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
          })
        }
      }
    )
    uploadStream.end(buffer)
  })
}

// Delete image from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId)
    console.log(`🗑️  Deleted from Cloudinary: ${publicId}`)
    return result
  } catch (error) {
    console.error('❌ Error deleting from Cloudinary:', error)
    throw error
  }
}

export default cloudinary