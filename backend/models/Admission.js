import mongoose from 'mongoose'

const admissionSchema = new mongoose.Schema(
  {
    // Student Information
    studentName: {
      type: String,
      required: [true, 'Please provide student name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please provide date of birth'],
    },
    gender: {
      type: String,
      required: [true, 'Please provide gender'],
      enum: {
        values: ['Male', 'Female', 'Other'],
        message: '{VALUE} is not a valid gender'
      },
    },
    class: {
      type: String,
      required: [true, 'Please provide class applying for'],
      trim: true,
    },
    previousSchool: {
      type: String,
      trim: true,
      maxlength: [150, 'School name cannot be more than 150 characters']
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },

    // Parent Information
    fatherName: {
      type: String,
      required: [true, 'Please provide father name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    fatherOccupation: {
      type: String,
      trim: true,
    },
    motherName: {
      type: String,
      required: [true, 'Please provide mother name'],
      trim: true,
      maxlength: [100, 'Name cannot be more than 100 characters']
    },
    motherOccupation: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number'],
      match: [/^[0-9]{10}$/, 'Please provide valid 10-digit phone number'],
    },
    alternatePhone: {
      type: String,
      match: [/^[0-9]{10}$/, 'Please provide valid 10-digit phone number'],
    },
    address: {
      type: String,
      required: [true, 'Please provide address'],
      maxlength: [300, 'Address cannot be more than 300 characters']
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      match: [/^[0-9]{6}$/, 'Please provide valid 6-digit pincode'],
    },

    // Application Status
    status: {
      type: String,
      enum: {
        values: ['pending', 'under-review', 'approved', 'rejected', 'waitlisted'],
        message: '{VALUE} is not a valid status'
      },
      default: 'pending',
    },
    applicationNumber: {
      type: String,
      unique: true,
    },
    remarks: {
      type: String,
      maxlength: [500, 'Remarks cannot be more than 500 characters']
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewedAt: {
      type: Date,
    },
    admissionDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
)

// Generate application number before saving
admissionSchema.pre('save', async function(next) {
  if (!this.applicationNumber) {
    const year = new Date().getFullYear()
    const count = await this.constructor.countDocuments()
    this.applicationNumber = `SGPS${year}${String(count + 1).padStart(4, '0')}`
  }
  next()
})

// Indexes
admissionSchema.index({ status: 1, createdAt: -1 })
admissionSchema.index({ applicationNumber: 1 })
admissionSchema.index({ email: 1, phone: 1 })

export default mongoose.model('Admission', admissionSchema)