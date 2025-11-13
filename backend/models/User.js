import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      trim: true,
      maxlength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: {
        values: ['chairman', 'principal', 'teacher', 'staff', 'admin'],
        message: '{VALUE} is not a valid role'
      },
      default: 'staff',
    },
    phone: {
      type: String,
      match: [/^[0-9]{10}$/, 'Please provide valid 10-digit phone number'],
    },
    avatar: {
      url: {
        type: String,
        default: 'https://res.cloudinary.com/demo/image/upload/avatar.png'
      },
      public_id: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    department: {
      type: String,
      trim: true,
      maxlength: [50, 'Department cannot be more than 50 characters']
    },
    designation: {
      type: String,
      trim: true,
      maxlength: [50, 'Designation cannot be more than 50 characters']
    },
    lastLogin: {
      type: Date,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
)

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

// Remove password from JSON response
userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  delete user.resetPasswordToken
  delete user.resetPasswordExpire
  return user
}

// Create index for email
userSchema.index({ email: 1 })

export default mongoose.model('User', userSchema)