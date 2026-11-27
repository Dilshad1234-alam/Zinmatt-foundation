import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      default: '',
    },
    preferredInitiative: {
      type: String,
      required: [true, 'Preferred initiative is required'],
      trim: true,
    },
    availability: {
      type: String,
      trim: true,
      default: 'Flexible / Weekends',
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Archived'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

volunteerSchema.index({ email: 1 });
volunteerSchema.index({ status: 1 });
volunteerSchema.index({ createdAt: -1 });

export default mongoose.model('Volunteer', volunteerSchema);
