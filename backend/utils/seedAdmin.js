import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from '../models/User.js'
import connectDB from '../config/db.js'

// Load environment variables
dotenv.config()

// Connect to database
connectDB()

const seedAdmin = async () => {
  try {
    console.log('🌱 Starting admin seed...\n')

    // Check if admin already exists
    const adminExists = await User.findOne({ 
      email: process.env.ADMIN_EMAIL 
    })

    if (adminExists) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('ℹ️  Admin user already exists!')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log(`📧 Email:        ${adminExists.email}`)
      console.log(`👤 Name:         ${adminExists.name}`)
      console.log(`🔑 Role:         ${adminExists.role}`)
      console.log(`🆔 ID:           ${adminExists._id}`)
      console.log(`📅 Created:      ${adminExists.createdAt.toLocaleString()}`)
      console.log(`✅ Active:       ${adminExists.isActive ? 'Yes' : 'No'}`)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('\n💡 Use existing credentials to login!')
      console.log(`📧 Email:    ${process.env.ADMIN_EMAIL}`)
      console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD}`)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
      process.exit(0)
    }

    // Create admin user
    const admin = await User.create({
      name: 'System Administrator',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'chairman',
      phone: '9999999999',
      department: 'Administration',
      designation: 'Chairman',
      isActive: true,
    })

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('✅ Admin User Created Successfully!')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`📧 Email:        ${admin.email}`)
    console.log(`🔑 Password:     ${process.env.ADMIN_PASSWORD}`)
    console.log(`👤 Name:         ${admin.name}`)
    console.log(`🔰 Role:         ${admin.role}`)
    console.log(`📱 Phone:        ${admin.phone}`)
    console.log(`🏢 Department:   ${admin.department}`)
    console.log(`💼 Designation:  ${admin.designation}`)
    console.log(`🆔 ID:           ${admin._id}`)
    console.log(`📅 Created:      ${admin.createdAt.toLocaleString()}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('\n⚠️  IMPORTANT: Please change the password after first login!')
    console.log('\n🚀 You can now start the server with: npm run dev')
    console.log('🔐 Login at: http://localhost:5000/api/auth/login')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    process.exit(0)
  } catch (error) {
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error('❌ Error seeding admin user!')
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.error(`Error: ${error.message}`)
    console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    process.exit(1)
  }
}

// Run the seed function
seedAdmin()