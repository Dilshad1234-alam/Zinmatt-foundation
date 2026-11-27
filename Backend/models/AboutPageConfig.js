import mongoose from 'mongoose';

const aboutPageConfigSchema = new mongoose.Schema(
  {
    banner: {
      accentLabel: { type: String, default: 'ABOUT ZINMATT FOUNDATION' },
      headline: { type: String, default: 'Creating Opportunities. Spreading Hope.' },
      story: {
        type: String,
        default:
          'ZINMATT Foundation is driven by the belief that positive change begins when people come together for a meaningful cause. Through free education, support for visually impaired children, elderly care, and environmental cleanliness, we aim to build a more inclusive and compassionate society.',
      },
      imageUrl: {
        type: String,
        default:
          'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80',
      },
    },

    vision: {
      title: { type: String, default: 'Our Vision' },
      subtitle: { type: String, default: 'Target horizon & human aspiration' },
      description: {
        type: String,
        default:
          'A world where every individual, regardless of background or ability, has equitable access to education, dignified care, and a thriving, sustainable community.',
      },
    },

    mission: {
      title: { type: String, default: 'Our Mission' },
      subtitle: { type: String, default: 'Operational action & resource delivery' },
      description: {
        type: String,
        default:
          'To mobilize grassroots volunteers, institutional partners, and compassionate donors to deliver free education, elderly support, and green civic action.',
      },
    },

    pillars: [
      {
        id: { type: String },
        icon: { type: String },
        title: { type: String },
        tag: { type: String },
        description: { type: String },
        metric: { type: String },
        status: { type: String, default: 'Live Section' },
      },
    ],

    storyboard: [
      {
        id: { type: String },
        title: { type: String },
        location: { type: String },
        imageUrl: { type: String },
      },
    ],

    teamMembers: [
      {
        id: { type: String },
        name: { type: String },
        role: { type: String },
        initials: { type: String },
        avatarInitials: { type: String },
      },
    ],

    visibility: {
      type: mongoose.Schema.Types.Mixed,
      default: [
        { id: 'vision_mission', name: 'Vision & Mission Section', subtitle: 'Public dual card grid', enabled: true },
        { id: 'core_values', name: '4 Core Values Grid', subtitle: 'Dynamic Bento metric tiles', enabled: true },
        { id: 'team_leadership', name: 'Team & Leadership Section', subtitle: 'Founders & core trustees roster', enabled: true },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const AboutPageConfig = mongoose.model('AboutPageConfig', aboutPageConfigSchema);
export default AboutPageConfig;
