import mongoose from 'mongoose';

const homePageConfigSchema = new mongoose.Schema(
  {
    // Section 1: Hero Banner (image_f26e06.jpg)
    hero: {
      accentTag: { type: String, default: 'MAKING A DIFFERENCE TOGETHER' },
      headline: { type: String, default: 'Building a Better Tomorrow, One Life at a Time.' },
      highlightText: { type: String, default: 'One Life at a Time.' },
      description: {
        type: String,
        default:
          'Empowering children with education, supporting visually impaired youth, caring for elders, and building cleaner communities across India.',
      },
      subheadline: { type: String }, // Backward compatibility alias
      primaryBtnLabel: { type: String, default: 'Support Our Cause' },
      secondaryBtnLabel: { type: String, default: 'Explore Our Mission' },
      heroImage: {
        type: String,
        default:
          'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=2000&q=85',
      },
      imageUrl: { type: String }, // Backward compatibility alias
      supportersTitle: { type: String, default: '+2,500 Supporters & Volunteers' },
      supportersSubtitle: { type: String, default: 'Standing with our grassroots mission' },
      trustBadges: {
        type: [String],
        default: ['80G Compliant', 'Transparent Reporting', 'Community-First'],
      },
    },

    // Section 2: About ZINMATT Preview (image_f26e21.jpg)
    aboutPreview: {
      accentTag: { type: String, default: 'ABOUT ZINMATT FOUNDATION' },
      heading: {
        type: String,
        default: 'Creating Opportunities. Spreading Hope. Building a Better Society.',
      },
      paragraph1: {
        type: String,
        default:
          'ZINMATT Foundation was born out of a relentless belief that sustainable change begins at the grassroots level. By working directly with underserved communities, we dismantle barriers to free education for out-of-school children, deliver specialized tactile learning tools and audio libraries for visually impaired youth, restore dignity to neglected elders through doorstep healthcare, and lead civic cleanliness drives for thriving neighborhoods.',
      },
      descriptionParagraph1: { type: String }, // Backward compatibility alias
      paragraph2: {
        type: String,
        default:
          'Every initiative is built on radical financial transparency, community empowerment, and direct field action ensuring measurable, lasting transformation for thousands of families across India.',
      },
      descriptionParagraph2: { type: String }, // Backward compatibility alias
      ctaLabel: { type: String, default: 'Learn More About Us' },
      phoneLabel: { type: String, default: 'Call Us:' },
      phoneNumber: { type: String, default: '+91 (011) 4567-8900' },
      operationsBadge: {
        type: String,
        default: 'Direct Grassroots Field Operations • 12+ States',
      },
      archImages: {
        type: [String],
        default: [
          'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80',
        ],
      },
    },

    // Section 3: What We Do / Initiatives Showcase (image_f26e25.jpg)
    initiativesShowcase: {
      pillTag: { type: String, default: 'OUR INITIATIVES' },
      heading: { type: String, default: 'What We Do' },
      subheading: {
        type: String,
        default:
          'Four core pillars of hope, scaled for measurable impact across underserved communities in India.',
      },
      cards: [
        {
          id: { type: String },
          badge: { type: String, default: 'Active Program' },
          title: { type: String, default: 'Education Support' },
          bullets: [{ type: String }],
          imageUrl: { type: String },
          image: { type: String }, // Backward compatibility alias
          linkLabel: { type: String, default: 'Learn More' },
          link: { type: String, default: '/initiatives' },
        },
      ],
      photoStrip: {
        type: [String],
        default: [
          'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80',
        ],
      },
    },

    // Section 4: 4 Core Values / Commitments Grid (image_f26e3f.jpg top)
    coreValues: {
      sectionTag: { type: String, default: 'CORE COMMITMENTS' },
      heading: { type: String, default: 'Our Core Values' },
      subheading: {
        type: String,
        default:
          'Four meaningful commitments. One vision of an equitable and compassionate society.',
      },
      cards: [
        {
          id: { type: String },
          title: { type: String },
          description: { type: String },
          linkLabel: { type: String, default: 'Learn commitment' },
          icon: { type: String, default: 'GraduationCap' },
          link: { type: String, default: '/initiatives' },
        },
      ],
      items: [
        // Backward compatibility
        {
          id: { type: String },
          title: { type: String },
          description: { type: String },
          linkLabel: { type: String },
          icon: { type: String },
          active: { type: Boolean, default: true },
        },
      ],
    },

    // Section 5: Be a Part of the Change / Get Involved Strip (image_f26e3f.jpg bottom)
    getInvolvedSection: {
      pillTag: { type: String, default: 'GET INVOLVED' },
      heading: { type: String, default: 'Be a Part of the Change.' },
      subheading: {
        type: String,
        default:
          'From volunteering your time to making a direct gift of education, there are so many ways to empower our community and leave an imprint on real lives.',
      },
      cards: [
        {
          id: { type: String },
          title: { type: String },
          description: { type: String },
          imageUrl: { type: String },
          image: { type: String }, // Backward compatibility alias
          linkLabel: { type: String, default: 'LEARN MORE' },
          link: { type: String, default: '/get-involved' },
          icon: { type: String, default: 'Users' },
        },
      ],
    },

    // Section 6: Orange Gradient Trust Strip (image_f26e5b.jpg top)
    trustStrip: {
      headline: {
        type: String,
        default: 'Every Contribution Can Change a Life Today.',
      },
      subheadline: {
        type: String,
        default:
          'Your generous donation directly funds free schooling and digital kits for underprivileged children, assistive Braille materials for visually impaired youth, nutritious daily meals and medical care for isolated elders, and cleaner green communities across India.',
      },
      buttonText: { type: String, default: 'Start Donate' },
      trustStripHighlights: {
        type: [String],
        default: [
          '80G Tax Exemption Available',
          '100% Direct Grassroots Impact',
          'Transparent Audited Reporting',
        ],
      },
    },

    // Section 7: Moments of Impact & Community (image_f26e5b.jpg bottom)
    storiesSection: {
      pillTag: { type: String, default: 'STORIES & COMMUNITY' },
      heading: { type: String, default: 'Moments of Impact & Community' },
      subheading: {
        type: String,
        default:
          'Glimpses from the field across education, child care, elderly support, and cleanup drives.',
      },
      filterCategories: {
        type: [String],
        default: ['All', 'Education', 'Inclusive Learning', 'Elderly Care', 'Cleanliness'],
      },
      cards: [
        {
          id: { type: String },
          tag: { type: String },
          category: { type: String },
          title: { type: String },
          description: { type: String },
          imageUrl: { type: String },
          image: { type: String }, // Backward compatibility alias
          linkLabel: { type: String, default: 'View Story' },
        },
      ],
    },

    // Global CTA aliases
    ctaHeadline: { type: String, default: 'Every Contribution Can Change a Life Today.' },
    ctaButtonText: { type: String, default: 'Start Donate' },

    // Section Order & Visibility
    sectionOrder: [
      {
        id: { type: String },
        label: { type: String },
        name: { type: String },
        number: { type: Number },
        visible: { type: Boolean, default: true },
        enabled: { type: Boolean, default: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const HomePageConfig = mongoose.model('HomePageConfig', homePageConfigSchema);
export default HomePageConfig;
