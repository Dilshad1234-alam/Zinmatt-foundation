import mongoose from 'mongoose';

const contactPageConfigSchema = new mongoose.Schema(
  {
    publicInfo: {
      email: { type: String, default: 'contact@zinmattfoundation.org' },
      phone: { type: String, default: '+91 98200 12345 / +91 11 4050 67' },
      address: {
        type: String,
        default: 'Plot 42, Institutional Area, Sector 18, Gurugram, Delhi NCR - 122015, India',
      },
      mapPin: {
        coordinates: { type: String, default: "28.4517° N, 77.0512° E (Delhi NCR HQ)" },
        label: { type: String, default: 'Active GPS Pin on Public Map' },
        lat: { type: Number, default: 28.4517 },
        lng: { type: Number, default: 77.0512 },
        active: { type: Boolean, default: true },
      },
    },

    channels: {
      instagram: {
        handle: { type: String, default: '@zinmattfoundation' },
        enabled: { type: Boolean, default: true },
      },
      facebook: {
        handle: { type: String, default: '/zinmattfoundation' },
        enabled: { type: Boolean, default: true },
      },
      linkedin: {
        handle: { type: String, default: 'company/zinmatt-foundation' },
        enabled: { type: Boolean, default: true },
      },
      youtube: {
        handle: { type: String, default: '@zinmattfoundation' },
        enabled: { type: Boolean, default: true },
      },
    },

    securityAlerts: {
      spamProtection: { type: Boolean, default: true },
      emailAlerts: { type: Boolean, default: true },
      autoAckReply: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

const ContactPageConfig = mongoose.model('ContactPageConfig', contactPageConfigSchema);
export default ContactPageConfig;
