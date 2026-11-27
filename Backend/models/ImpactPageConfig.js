import mongoose from 'mongoose';

const impactPageConfigSchema = new mongoose.Schema(
  {
    displayMode: {
      type: String,
      enum: ['verified', 'commitments', 'numbers', 'goals'],
      default: 'verified',
    },

    counters: [
      {
        id: { type: String },
        title: { type: String },
        label: { type: String },
        value: { type: String },
        subtitle: { type: String },
        goal: { type: String },
        goalLabel: { type: String },
        progress: { type: Number, default: 0 },
        percent: { type: Number, default: 0 },
        icon: { type: String, default: 'TrendingUp' },
        enabled: { type: Boolean, default: true },
        visible: { type: Boolean, default: true },
      },
    ],

    quotes: [
      {
        id: { type: String },
        name: { type: String },
        role: { type: String },
        quote: { type: String },
        avatar: { type: String },
        avatarUrl: { type: String },
      },
    ],

    reportingControls: {
      countUpAnimation: { type: Boolean, default: true },
      showCommitments: { type: Boolean, default: false },
      showCommitmentsInstead: { type: Boolean, default: false },
      showCommunityVoices: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

const ImpactPageConfig = mongoose.model('ImpactPageConfig', impactPageConfigSchema);
export default ImpactPageConfig;
