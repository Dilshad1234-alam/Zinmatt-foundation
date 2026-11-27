import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
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
    panNumber: {
      type: String,
      trim: true,
      uppercase: true,
      default: '',
    },
    cause: {
      type: String,
      required: true,
      trim: true,
      default: 'General Fund',
    },
    frequency: {
      type: String,
      enum: ['one-time', 'monthly'],
      default: 'one-time',
    },
    amount: {
      type: Number,
      required: [true, 'Donation amount is required'],
      min: [1, 'Donation amount must be greater than zero'],
    },
    referenceId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster lookups
donationSchema.index({ email: 1 });
donationSchema.index({ createdAt: -1 });

export default mongoose.model('Donation', donationSchema);
