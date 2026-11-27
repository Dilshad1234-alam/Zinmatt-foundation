import mongoose from 'mongoose';
import Initiative from '../models/Initiative.js';
import GalleryItem from '../models/GalleryItem.js';
import HomePageConfig from '../models/HomePageConfig.js';
import AboutPageConfig from '../models/AboutPageConfig.js';
import ImpactPageConfig from '../models/ImpactPageConfig.js';
import GetInvolvedConfig from '../models/GetInvolvedConfig.js';
import ContactPageConfig from '../models/ContactPageConfig.js';

export const connectDB = async () => {
  const mongoUri =
    process.env.MONGO_URI ||
    'mongodb+srv://dmd68699_db_user:dilshad9523@cluster0.yxpgsw3.mongodb.net/zinmatt-foundation';

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });
    console.log(`[Database] MongoDB Connected: ${conn.connection.host} | DB: ${conn.connection.name}`);

    // Seed default datasets on startup if collections are empty
    await seedDefaultInitiatives();
    await seedDefaultGallery();
    await seedDefaultHomePageConfig();
    await seedDefaultAboutPageConfig();
    await seedDefaultImpactPageConfig();
    await seedDefaultGetInvolvedConfig();
    await seedDefaultContactPageConfig();
  } catch (error) {
    console.warn(`[Database Warning] Could not connect to MongoDB at ${mongoUri}`);
    console.warn(`[Database Warning] ${error.message}`);
    console.warn('[Database Notice] The API server will continue running. Ensure MongoDB service or Atlas connection is active.');
  }
};

const seedDefaultInitiatives = async () => {
  try {
    const count = await Initiative.countDocuments();
    if (count === 0) {
      const defaults = [
        {
          slug: 'free-education',
          tag: 'Education',
          title: 'Free Education',
          subtitle: 'Rural Learning Centers',
          metricLabel: '1,200 Children',
          targetPercent: 85,
          imageUrl:
            'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
        },
        {
          slug: 'visually-impaired-care',
          tag: 'Inclusion',
          title: 'Visually Impaired Care',
          subtitle: 'Audiobooks & Smart Canes',
          metricLabel: '450 Beneficiaries',
          targetPercent: 80,
          imageUrl:
            'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80',
        },
        {
          slug: 'elderly-welfare',
          tag: 'Care & Aid',
          title: 'Elderly Welfare',
          subtitle: 'Ration & Companionship',
          metricLabel: '680 Seniors Supported',
          targetPercent: 88,
          imageUrl:
            'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80',
        },
        {
          slug: 'clean-environment',
          tag: 'Ecology',
          title: 'Clean Environment',
          subtitle: 'Waste Segregation & Trees',
          metricLabel: '5,000 Saplings Planted',
          targetPercent: 75,
          imageUrl:
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
        },
      ];

      await Initiative.insertMany(defaults);
      console.log('[Database] Seeded 4 default core initiatives.');
    }
  } catch (err) {
    console.error('[Database Seed Error - Initiatives]', err.message);
  }
};

const seedDefaultGallery = async () => {
  try {
    const count = await GalleryItem.countDocuments();
    if (count === 0) {
      const defaults = [
        {
          title: 'Classroom Learning Session',
          category: 'Education',
          description: 'Foundational literacy classes across grassroots centers in Alwar.',
          imageUrl:
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
          location: 'Alwar Learning Center',
        },
        {
          title: 'Senior Citizen Care Drive',
          category: 'Elderly Care',
          description: 'Nutritional meal packages and healthcare visits in Delhi NCR.',
          imageUrl:
            'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
          location: 'Delhi NCR Field Camps',
        },
        {
          title: 'Neighborhood Greening & Cleanup',
          category: 'Cleanliness',
          description: 'Civic waste transformation and community parks sapling plantation.',
          imageUrl:
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
          location: 'Yamuna Riverbank Sector',
        },
        {
          title: 'Tactile Braille & Audio Kit Distribution',
          category: 'Inclusive Learning',
          description: 'Specialized audiobooks and obstacle-sensing smart canes distribution.',
          imageUrl:
            'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80',
          location: 'Lucknow Center',
        },
      ];

      await GalleryItem.insertMany(defaults);
      console.log('[Database] Seeded initial gallery items.');
    }
  } catch (err) {
    console.error('[Database Seed Error - Gallery]', err.message);
  }
};

const seedDefaultHomePageConfig = async () => {
  try {
    const count = await HomePageConfig.countDocuments();
    if (count === 0) {
      await HomePageConfig.create({
        hero: {
          accentTag: 'MAKING A DIFFERENCE TOGETHER',
          headline: 'Building a Better Tomorrow, One Life at a Time.',
          highlightText: 'One Life at a Time.',
          description:
            'Empowering children with education, supporting visually impaired youth, caring for elders, and building cleaner communities across India.',
          subheadline:
            'Empowering children with education, supporting visually impaired youth, caring for elders, and building cleaner communities across India.',
          primaryBtnLabel: 'Support Our Cause',
          secondaryBtnLabel: 'Explore Our Mission',
          heroImage:
            'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=2000&q=85',
          imageUrl:
            'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=2000&q=85',
          supportersTitle: '+2,500 Supporters & Volunteers',
          supportersSubtitle: 'Standing with our grassroots mission',
          trustBadges: ['80G Compliant', 'Transparent Reporting', 'Community-First'],
        },
        aboutPreview: {
          accentTag: 'ABOUT ZINMATT FOUNDATION',
          heading: 'Creating Opportunities. Spreading Hope. Building a Better Society.',
          paragraph1:
            'ZINMATT Foundation was born out of a relentless belief that sustainable change begins at the grassroots level. By working directly with underserved communities, we dismantle barriers to free education for out-of-school children, deliver specialized tactile learning tools and audio libraries for visually impaired youth, restore dignity to neglected elders through doorstep healthcare, and lead civic cleanliness drives for thriving neighborhoods.',
          paragraph2:
            'Every initiative is built on radical financial transparency, community empowerment, and direct field action ensuring measurable, lasting transformation for thousands of families across India.',
          ctaLabel: 'Learn More About Us',
          phoneLabel: 'Call Us:',
          phoneNumber: '+91 (011) 4567-8900',
          operationsBadge: 'Direct Grassroots Field Operations • 12+ States',
          archImages: [
            'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80',
          ],
        },
        initiativesShowcase: {
          pillTag: 'OUR INITIATIVES',
          heading: 'What We Do',
          subheading:
            'Four core pillars of hope, scaled for measurable impact across underserved communities in India.',
          cards: [
            {
              id: 'init-1',
              badge: 'Active Program',
              title: 'Education Support',
              bullets: [
                'Learning material & textbook distribution',
                'Remedial after-school tutoring hubs',
                'Digital literacy & tablet classrooms',
              ],
              imageUrl:
                'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'Learn More',
              link: '/initiatives',
            },
            {
              id: 'init-2',
              badge: 'Specialized Care',
              title: 'Inclusive Child Support',
              bullets: [
                'Tactile & Braille curriculum toolkits',
                'Assistive audio device distribution',
                'Specialized mobility & confidence mentoring',
              ],
              imageUrl:
                'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'Learn More',
              link: '/initiatives',
            },
            {
              id: 'init-3',
              badge: 'Compassion Drive',
              title: 'Elderly Welfare',
              bullets: [
                'Monthly ration & dietary essentials',
                'Routine geriatric health screenings',
                'Doorstep emotional companionship visits',
              ],
              imageUrl:
                'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'Learn More',
              link: '/initiatives',
            },
            {
              id: 'init-4',
              badge: 'Civic Action',
              title: 'Clean Environment',
              bullets: [
                'Neighborhood waste clean-up drives',
                'Waste segregation & recycling workshops',
                'Urban indigenous sapling planting',
              ],
              imageUrl:
                'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'Learn More',
              link: '/initiatives',
            },
          ],
          photoStrip: [
            'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80',
            'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80',
          ],
        },
        coreValues: {
          sectionTag: 'CORE COMMITMENTS',
          heading: 'Our Core Values',
          subheading:
            'Four meaningful commitments. One vision of an equitable and compassionate society.',
          cards: [
            {
              id: 'education',
              title: 'Free Education for Children',
              description:
                'Every child deserves access to foundational education. We provide uniforms, school bags, tuition support, and digital tablets to break cycles of poverty.',
              linkLabel: 'Learn commitment',
              icon: 'GraduationCap',
              link: '/initiatives',
            },
            {
              id: 'visually_impaired',
              title: 'Supporting Visually Impaired',
              description:
                'Visual impairment must never cap a child’s dreams. We distribute customized tactile kits, Braille readers, and audio materials for independent learning.',
              linkLabel: 'Learn commitment',
              icon: 'Eye',
              link: '/initiatives',
            },
            {
              id: 'elderly',
              title: 'Elderly Care & Dignity',
              description:
                'Restoring dignity to neglected seniors through doorstep medical screenings, subsidized medications, healthy rations, and affectionate companionship.',
              linkLabel: 'Learn commitment',
              icon: 'HeartHandshake',
              link: '/initiatives',
            },
            {
              id: 'environment',
              title: 'Environmental Cleanliness',
              description:
                'Clean public spaces create healthier futures. We mobilize citizen cleanups, community waste segregation, and tree plantations across neighborhoods.',
              linkLabel: 'Learn commitment',
              icon: 'Sparkles',
              link: '/initiatives',
            },
          ],
        },
        getInvolvedSection: {
          pillTag: 'GET INVOLVED',
          heading: 'Be a Part of the Change.',
          subheading:
            'From volunteering your time to making a direct gift of education, there are so many ways to empower our community and leave an imprint on real lives.',
          cards: [
            {
              id: 'help-1',
              title: 'Volunteer With Us',
              description:
                'Contribute your time, skills, and energy to make a direct on-ground impact in classrooms, clinics, and cleanups.',
              imageUrl:
                'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'LEARN MORE',
              icon: 'Users',
              link: '/get-involved',
            },
            {
              id: 'help-2',
              title: 'Sponsor a Child',
              description:
                'Fund tuition, learning kits, school bags, and digital tablets to keep vulnerable children in formal schooling.',
              imageUrl:
                'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'LEARN MORE',
              icon: 'GraduationCap',
              link: '/get-involved',
            },
            {
              id: 'help-3',
              title: 'Support Our Causes',
              description:
                'Sponsor monthly elder medicines, Braille kits for visually impaired youth, or clean environment drives.',
              imageUrl:
                'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'LEARN MORE',
              icon: 'Heart',
              link: '/get-involved',
            },
            {
              id: 'help-4',
              title: 'CSR & Partnerships',
              description:
                'Collaborate with us for compliant corporate CSR grants, employee giving drives, and community projects.',
              imageUrl:
                'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'LEARN MORE',
              icon: 'Award',
              link: '/contact',
            },
            {
              id: 'help-5',
              title: 'Spread Awareness',
              description:
                'Amplify the voices of visually impaired children and isolated elders by sharing field stories across your network.',
              imageUrl:
                'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'LEARN MORE',
              icon: 'Share2',
              link: '/contact',
            },
          ],
        },
        trustStrip: {
          headline: 'Every Contribution Can Change a Life Today.',
          subheadline:
            'Your generous donation directly funds free schooling and digital kits for underprivileged children, assistive Braille materials for visually impaired youth, nutritious daily meals and medical care for isolated elders, and cleaner green communities across India.',
          buttonText: 'Start Donate',
          trustStripHighlights: [
            '80G Tax Exemption Available',
            '100% Direct Grassroots Impact',
            'Transparent Audited Reporting',
          ],
        },
        storiesSection: {
          pillTag: 'STORIES & COMMUNITY',
          heading: 'Moments of Impact & Community',
          subheading:
            'Glimpses from the field across education, child care, elderly support, and cleanup drives.',
          filterCategories: ['All', 'Education', 'Inclusive Learning', 'Elderly Care', 'Cleanliness'],
          cards: [
            {
              id: 'story-1',
              tag: 'Education Support',
              category: 'Education',
              title: 'First-Generation Med-Spur Readiness',
              description:
                'Empowering first-generation rural students with foundational literacy, digital tablets, and certified instructors.',
              imageUrl:
                'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'View Story',
            },
            {
              id: 'story-2',
              tag: 'Specialized Aid',
              category: 'Inclusive Learning',
              title: 'Innovating Through Touch & Sound',
              description:
                'Specialized tactile learning and Braille reading kits introduced to visually impaired students across our Delhi centers.',
              imageUrl:
                'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'View Story',
            },
            {
              id: 'story-3',
              tag: 'Elderly Welfare',
              category: 'Elderly Care',
              title: 'Affectionate Friendship & Nutrition',
              description:
                'Weekly dietary baskets, routine health monitoring, and heartfelt companionship delivered to vulnerable senior citizens.',
              imageUrl:
                'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'View Story',
            },
            {
              id: 'story-4',
              tag: 'Environment Drive',
              category: 'Cleanliness',
              title: 'Riverbank Cleanliness Drive',
              description:
                'Mobilizing over 200 community volunteers to clean and protect local river ecosystems and plant native trees.',
              imageUrl:
                'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'View Story',
            },
            {
              id: 'story-5',
              tag: 'Digital Learning',
              category: 'Education',
              title: 'Milestone Classroom Graduation',
              description:
                'Celebrating foundational academic milestones and scholarship distributions for dedicated evening study students.',
              imageUrl:
                'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
              linkLabel: 'View Story',
            },
          ],
        },
        ctaHeadline: 'Every Contribution Can Change a Life Today.',
        ctaButtonText: 'Start Donate',
        sectionOrder: [
          { id: 'hero', number: 1, name: '1. Hero Banner Section', label: '1. Hero Banner Section', enabled: true, visible: true },
          { id: 'about', number: 2, name: '2. About ZINMATT Section', label: '2. About ZINMATT Section', enabled: true, visible: true },
          { id: 'initiatives', number: 3, name: '3. What We Do Initiatives', label: '3. What We Do Initiatives', enabled: true, visible: true },
          { id: 'pillars', number: 4, name: '4. 4 Core Values Grid', label: '4. 4 Core Values Grid', enabled: true, visible: true },
          { id: 'get_involved', number: 5, name: '5. Be a Part of the Change', label: '5. Be a Part of the Change', enabled: true, visible: true },
          { id: 'trust_strip', number: 6, name: '6. Orange Gradient Trust Strip', label: '6. Orange Gradient Trust Strip', enabled: true, visible: true },
          { id: 'stories', number: 7, name: '7. Moments of Impact & Community', label: '7. Moments of Impact & Community', enabled: true, visible: true },
        ],
      });
      console.log('[Database] Seeded default Home Page configuration.');
    }
  } catch (err) {
    console.error('[Database Seed Error - HomePageConfig]', err.message);
  }
};

const seedDefaultAboutPageConfig = async () => {
  try {
    const count = await AboutPageConfig.countDocuments();
    if (count === 0) {
      await AboutPageConfig.create({
        banner: {
          accentLabel: 'ABOUT ZINMATT FOUNDATION',
          headline: 'Creating Opportunities. Spreading Hope.',
          story:
            'ZINMATT Foundation is driven by the belief that positive change begins when people come together for a meaningful cause. Through free education, support for visually impaired children, elderly care, and environmental cleanliness, we aim to build a more inclusive and compassionate society.',
          imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80',
        },
        vision: {
          title: 'Our Vision',
          subtitle: 'Target horizon & human aspiration',
          description:
            'A world where every individual, regardless of background or ability, has equitable access to education, dignified care, and a thriving, sustainable community.',
        },
        mission: {
          title: 'Our Mission',
          subtitle: 'Operational action & resource delivery',
          description:
            'To mobilize grassroots volunteers, institutional partners, and compassionate donors to deliver free education, elderly support, and green civic action.',
        },
        pillars: [
          {
            id: 'p-1',
            icon: 'BookOpen',
            title: 'Free Education',
            tag: 'Pillar 01 • Priority',
            description:
              'Youth learning & literacy programs across rural centers with tailored curriculum support.',
            metric: '1,420 Students',
            status: 'Live Section',
          },
          {
            id: 'p-2',
            icon: 'Eye',
            title: 'Visually Impaired Support',
            tag: 'Pillar 02 • Assistive Tech',
            description:
              'Audiobooks, smart canes & tactile learning kits providing autonomy and self-reliance.',
            metric: '680 Kits Distributed',
            status: 'Live Section',
          },
          {
            id: 'p-3',
            icon: 'Heart',
            title: 'Elderly Care',
            tag: 'Pillar 03 • Welfare',
            description:
              'Nutritional ration, healthcare check-ups & dedicated volunteer companionship visits.',
            metric: '620 Seniors Supported',
            status: 'Live Section',
          },
          {
            id: 'p-4',
            icon: 'Sprout',
            title: 'Environmental Cleanliness',
            tag: 'Pillar 04 • Sustainability',
            description:
              'Waste segregation, public cleanup drives & indigenous tree plantation initiatives.',
            metric: '34 Clean Drives',
            status: 'Live Section',
          },
        ],
        storyboard: [
          {
            id: 'sb-1',
            title: 'Joyful Learning Center',
            location: 'Primary Education Hub • Karnataka',
            imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80',
          },
          {
            id: 'sb-2',
            title: 'Community Support Camp',
            location: 'Elder Care & Nutrition • Weekly Drive',
            imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80',
          },
        ],
        teamMembers: [
          { id: 'tm-1', name: 'Aarav Mehta', role: 'Foundation Trustee', initials: 'AM', avatarInitials: 'AM' },
          { id: 'tm-2', name: 'Priya Nair', role: 'Education Lead', initials: 'PN', avatarInitials: 'PN' },
          { id: 'tm-3', name: 'Rohan Kapoor', role: 'Community Care', initials: 'RK', avatarInitials: 'RK' },
          { id: 'tm-4', name: 'Ananya Verma', role: 'Volunteer Coordinator', initials: 'AV', avatarInitials: 'AV' },
        ],
        visibility: [
          { id: 'vision_mission', name: 'Vision & Mission Section', subtitle: 'Public dual card grid', enabled: true },
          { id: 'core_values', name: '4 Core Values Grid', subtitle: 'Dynamic Bento metric tiles', enabled: true },
          { id: 'team_leadership', name: 'Team & Leadership Section', subtitle: 'Founders & core trustees roster', enabled: true },
        ],
      });
      console.log('[Database] Seeded default About Page configuration.');
    }
  } catch (err) {
    console.error('[Database Seed Error - AboutPageConfig]', err.message);
  }
};

const seedDefaultImpactPageConfig = async () => {
  try {
    const count = await ImpactPageConfig.countDocuments();
    if (count === 0) {
      await ImpactPageConfig.create({
        displayMode: 'verified',
        counters: [
          {
            id: 'c-1',
            title: 'Children Supported',
            label: 'Children Supported',
            value: '1,420+ Children',
            subtitle: 'Education & Learning Access',
            goal: '1,800 by Q4',
            goalLabel: 'Goal: 1,800 by Q4',
            progress: 78,
            percent: 78.8,
            icon: 'GraduationCap',
            enabled: true,
            visible: true,
          },
          {
            id: 'c-2',
            title: 'Educational Resources',
            label: 'Educational Resources',
            value: '3,850+ Kits & Books',
            subtitle: 'Books, Kits & Inclusive Aids',
            goal: '4,000 by Q4',
            goalLabel: 'Goal: 4,000 by Q4',
            progress: 96,
            percent: 96.2,
            icon: 'BookOpen',
            enabled: true,
            visible: true,
          },
          {
            id: 'c-3',
            title: 'Elderly People Reached',
            label: 'Elderly People Reached',
            value: '620+ Seniors',
            subtitle: 'Care & Companionship Drives',
            goal: '700 by Q4',
            goalLabel: 'Goal: 700 by Q4',
            progress: 88,
            percent: 88.5,
            icon: 'Heart',
            enabled: true,
            visible: true,
          },
          {
            id: 'c-4',
            title: 'Cleanliness Drives',
            label: 'Cleanliness Drives',
            value: '34+ Civic Drives',
            subtitle: 'Community & Green Campaigns',
            goal: '40 by Q4',
            goalLabel: 'Goal: 40 by Q4',
            progress: 85,
            percent: 85.0,
            icon: 'Sparkles',
            enabled: true,
            visible: true,
          },
        ],
        quotes: [
          {
            id: 'q-1',
            name: 'Sunita Sharma',
            role: 'Community Volunteer',
            quote: "Seeing the spark in children's eyes when they learn to read is unforgettable.",
            avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80',
            avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80',
          },
          {
            id: 'q-2',
            name: 'Ramesh Kulkarni',
            role: 'Education Mentor',
            quote: 'The specialized braille materials unlocked an entire world of self-reliance for these kids.',
            avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&q=80',
            avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&q=80',
          },
          {
            id: 'q-3',
            name: 'Meera Deshmukh',
            role: 'Local Supporter',
            quote: 'Weekly care visits brought dignity, warmth, and reliable healthcare to our elders.',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80',
            avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80',
          },
        ],
        reportingControls: {
          countUpAnimation: true,
          showCommitments: false,
          showCommitmentsInstead: false,
          showCommunityVoices: true,
        },
      });
      console.log('[Database] Seeded default Impact Page configuration.');
    }
  } catch (err) {
    console.error('[Database Seed Error - ImpactPageConfig]', err.message);
  }
};

const seedDefaultGetInvolvedConfig = async () => {
  try {
    const count = await GetInvolvedConfig.countDocuments();
    if (count === 0) {
      await GetInvolvedConfig.create({
        participationCards: [
          {
            id: 'card-1',
            title: 'Volunteer With Us',
            subtitle: 'Contribute your time, skills, and empathy directly on-ground',
            icon: 'Users',
          },
          {
            id: 'card-2',
            title: 'Support Our Initiatives',
            subtitle: 'Participate in resource distribution and community cleanliness drives',
            icon: 'Heart',
          },
          {
            id: 'card-3',
            title: 'Spread Awareness',
            subtitle: 'Help amplify humanitarian stories and invite changemakers to our cause',
            icon: 'Sparkles',
          },
        ],
        settings: {
          acceptApplications: true,
          autoSendWelcomeEmail: true,
          autoWelcomeEmail: true,
          requireVerification: true,
          requireIdVerification: true,
        },
      });
      console.log('[Database] Seeded default Get Involved configuration.');
    }
  } catch (err) {
    console.error('[Database Seed Error - GetInvolvedConfig]', err.message);
  }
};

const seedDefaultContactPageConfig = async () => {
  try {
    const count = await ContactPageConfig.countDocuments();
    if (count === 0) {
      await ContactPageConfig.create({
        publicInfo: {
          email: 'contact@zinmattfoundation.org',
          phone: '+91 98200 12345 / +91 11 4050 67',
          address: 'Plot 42, Institutional Area, Sector 18, Gurugram, Delhi NCR - 122015, India',
          mapPin: {
            coordinates: '28.4517° N, 77.0512° E (Delhi NCR HQ)',
            label: 'Active GPS Pin on Public Map',
            lat: 28.4517,
            lng: 77.0512,
            active: true,
          },
        },
        channels: {
          instagram: { handle: '@zinmattfoundation', enabled: true },
          facebook: { handle: '/zinmattfoundation', enabled: true },
          linkedin: { handle: 'company/zinmatt-foundation', enabled: true },
          youtube: { handle: '@zinmattfoundation', enabled: true },
        },
        securityAlerts: {
          spamProtection: true,
          emailAlerts: true,
          autoAckReply: true,
        },
      });
      console.log('[Database] Seeded default Contact Page configuration.');
    }
  } catch (err) {
    console.error('[Database Seed Error - ContactPageConfig]', err.message);
  }
};
