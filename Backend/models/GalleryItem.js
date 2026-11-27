import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Photo title is required'],
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      default: 'Community',
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: 'Field Activity Center',
    },
  },
  {
    timestamps: true,
  }
);

galleryItemSchema.index({ category: 1 });
galleryItemSchema.index({ createdAt: -1 });

export default mongoose.model('GalleryItem', galleryItemSchema);
