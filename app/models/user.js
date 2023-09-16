import mongoose, { Schema, models, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: [true, 'Username must be unique'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: [true, 'email must be unique'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  role: {
    type: String,
    default: 'user',
  },
});

const User = models.User || mongoose.model('User', userSchema);

export default User;
