import mongoose from 'mongoose';

const initiativeSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    tag: {
      type: String,
      trim: true,
      default: 'Impact Mission',
    },
    title: {
      type: String,
      required: [true, 'Initiative title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: '',
    },
    metricLabel: {
      type: String,
      trim: true,
      default: '1,000+ Beneficiaries',
    },
    targetPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Initiative', initiativeSchema);
