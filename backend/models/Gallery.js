import mongoose from 'mongoose'

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide title'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    category: {
      type: String,
      required: [true, 'Please provide category'],
      enum: {
        values: ['Campus', 'Events', 'Sports', 'Academics', 'Cultural', 'Other'],
        message: '{VALUE} is not a valid category'
      },
    },
    image: {
      url: {
        type: String,
        required: [true, 'Please provide image URL'],
      },
      public_id: {
        type: String,
        required: [true, 'Please provide image public ID'],
      },
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

// Indexes for better query performance
gallerySchema.index({ category: 1, isActive: 1, createdAt: -1 })
gallerySchema.index({ uploadedBy: 1 })

export default mongoose.model('Gallery', gallerySchema)