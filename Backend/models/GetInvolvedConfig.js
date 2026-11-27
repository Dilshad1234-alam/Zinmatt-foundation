import mongoose from 'mongoose';

const getInvolvedConfigSchema = new mongoose.Schema(
  {
    participationCards: [
      {
        id: { type: String },
        title: { type: String },
        subtitle: { type: String },
        icon: { type: String, default: 'Users' },
      },
    ],

    settings: {
      acceptApplications: { type: Boolean, default: true },
      autoSendWelcomeEmail: { type: Boolean, default: true },
      autoWelcomeEmail: { type: Boolean, default: true },
      requireVerification: { type: Boolean, default: true },
      requireIdVerification: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

const GetInvolvedConfig = mongoose.model('GetInvolvedConfig', getInvolvedConfigSchema);
export default GetInvolvedConfig;
