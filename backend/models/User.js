

// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const userSchema = new mongoose.Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     minlength: 3
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6
//   },
//   role: {
//     type: String,
//     enum: ['admin', 'hr', 'manager', 'employee'],
//     default: 'employee'
//   },
//   fullName: {
//     type: String,
//     required: true
//   },
//   department: String,
//   position: String,
//   avatar: String,
//   isDemoAccount: {
//     type: Boolean,
//     default: false
//   },
//   isActive: {
//     type: Boolean,
//     default: true
//   },
//   lastLogin: Date,
  
//   // Password reset fields
//   resetPasswordOTP: {
//     type: String,
//     default: null
//   },
//   resetPasswordExpires: {
//     type: Date,
//     default: null
//   },
  
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Hash password before saving
// userSchema.pre('save', async function() {
//   // Only hash the password if it has been modified (or is new)
//   if (!this.isModified('password')) return ;
  
//   try {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
    
//   } catch (error) {
//     return 
//   }
// });

// // Compare password method
// userSchema.methods.comparePassword = async function(candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// // Remove password when converting to JSON
// userSchema.set('toJSON', {
//   transform: function(doc, ret) {
//     delete ret.password;
//     delete ret.resetPasswordOTP;
//     delete ret.__v;
//     return ret;
//   }
// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['admin', 'hr', 'manager', 'employee'],
    default: 'employee'
  },
  fullName: {
    type: String,
    required: true
  },
  department: String,
  position: String,
  avatar: String,
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  
  // Password reset fields
  resetPasswordOTP: {
    type: String,
    default: null
  },
  resetPasswordExpires: {
    type: Date,
    default: null
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Remove password when converting to JSON
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    delete ret.resetPasswordOTP;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('User', userSchema);