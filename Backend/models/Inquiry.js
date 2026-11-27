import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
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
      trim: true,
      default: '',
    },
    topic: {
      type: String,
      required: [true, 'Inquiry topic is required'],
      trim: true,
      default: 'General Inquiry',
    },
    message: {
      type: String,
      required: [true, 'Inquiry message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Replied', 'Resolved'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

inquirySchema.index({ email: 1 });
inquirySchema.index({ status: 1 });
inquirySchema.index({ createdAt: -1 });

export default mongoose.model('Inquiry', inquirySchema);
