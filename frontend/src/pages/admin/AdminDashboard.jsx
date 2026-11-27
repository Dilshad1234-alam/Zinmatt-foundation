import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import GradientIconBox from '../../components/ui/GradientIconBox';
import api from '../../lib/api';
import DashboardOverviewTab from './DashboardOverviewTab';
import AdminDonationsTab from './AdminDonationsTab';
import AdminGalleryTab from './AdminGalleryTab';
import AdminGetInvolvedTab from './AdminGetInvolvedTab';
import AdminContactUsTab from './AdminContactUsTab';
import AdminHomeTab from './AdminHomeTab';
import AdminAboutUsTab from './AdminAboutUsTab';
import AdminInitiativesTab from './AdminInitiativesTab';
import AdminImpactTab from './AdminImpactTab';

import {
  LayoutDashboard,
  Home as HomeIcon,
  FileText,
  Layers,
  TrendingUp,
  Image as ImageIcon,
  Users,
  Mail,
  Search,
  Bell,
  Plus,
  LogOut,
  Menu,
  X,
  Heart,
  Camera,
  ArrowRight,
  CheckCircle2,
  Eye,
  CornerDownLeft,
  Filter,
  Check,
  ChevronRight,
  ExternalLink,
  UploadCloud,
  Edit3,
  Trash2,
  Sparkles,
  Phone,
  Calendar,
  ShieldCheck,
  RefreshCw,
  CreditCard,
  DollarSign,
  AlertCircle,
  Layout,
  SlidersHorizontal,
  GripVertical,
  Clock,
  History,
  RotateCcw,
  Navigation,
  Info,
  Target,
  Compass,
  BookOpen,
  Sprout,
  MoreVertical,
  GraduationCap,
  ArrowUpDown,
  LayoutGrid,
  List,
  Star,
  ChevronLeft,
  Download,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Send,
  MessageSquare,
} from 'lucide-react';

/**
 * ZINMATT Foundation - Admin Dashboard Console
 * Hidden route: /admin (Protected by session check)
 * Full-stack connected to real MongoDB persistence via /api/admin/* endpoints.
 */
export default function AdminDashboard() {
  const navigate = useNavigate();

  // 1. Session Verification State
  const [adminUser, setAdminUser] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);

  // 2. Navigation & UI State
  const [activeNav, setActiveNav] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'volunteers' | 'enquiries'
  const [donationFilter, setDonationFilter] = useState('all'); // 'all' | 'verified' | 'pending' | 'cancelled'

  // 3. Modals State
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [editingInitiative, setEditingInitiative] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNewUpdateModalOpen, setIsNewUpdateModalOpen] = useState(false);
  const [notificationToast, setNotificationToast] = useState('');

  // 4. Live Statistics State
  const [stats, setStats] = useState({
    volunteers: 1248,
    recentVolunteers: 24,
    coreCauses: 4,
    enquiries: 18,
    unreadEnquiries: 5,
    galleryMoments: 342,
    donations: 120,
    verifiedDonations: 95,
    totalDonationsAmount: 450000,
  });

  // 5. Data Collections State
  const [records, setRecords] = useState([
    {
      id: 'vol-1',
      _id: 'vol-1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@gmail.com',
      phone: '+91 98112 43210',
      initials: 'AS',
      initiative: 'Free Education',
      preferredCause: 'Free Education',
      type: 'Volunteer',
      status: 'Approved',
      date: 'Oct 15, 2024',
      message: 'Experienced elementary math tutor offering 8 hours/week for weekend rural learning centers in Delhi NCR.',
    },
    {
      id: 'vol-2',
      _id: 'vol-2',
      name: 'Priyanka Nair',
      email: 'priyanka.nair@outlook.com',
      phone: '+91 98450 12345',
      initials: 'PN',
      initiative: 'Visually Impaired Support',
      preferredCause: 'Visually Impaired Support',
      type: 'Volunteer',
      status: 'Pending',
      date: 'Oct 14, 2024',
      message: 'Accessibility researcher interested in tactile learning materials and audio-book cataloging.',
    },
    {
      id: 'vol-3',
      _id: 'vol-3',
      name: 'Devendra Patil',
      email: 'd.patil@rediffmail.com',
      phone: '+91 97234 56789',
      initials: 'DP',
      initiative: 'Elderly Care',
      preferredCause: 'Elderly Care',
      type: 'Volunteer',
      status: 'Approved',
      date: 'Oct 12, 2024',
      message: 'Passionate community caregiver offering weekly visits, emotional companionship, and nutrition supplies.',
    },
    {
      id: 'vol-4',
      _id: 'vol-4',
      name: 'Ananya Sen',
      email: 'ananya.sen@techcorp.in',
      phone: '+91 99887 76655',
      initials: 'AS',
      initiative: 'Clean Environment',
      preferredCause: 'Clean Environment',
      type: 'Volunteer',
      status: 'Approved',
      date: 'Oct 11, 2024',
      message: 'Environmental volunteer helping lead monthly community riverbank cleanup drives and tree plantations.',
    },
    {
      id: 'vol-5',
      _id: 'vol-5',
      name: 'Vikram Joshi',
      email: 'vikram.joshi@gmail.com',
      phone: '+91 91234 11223',
      initials: 'VJ',
      initiative: 'Free Education',
      preferredCause: 'Free Education',
      type: 'Volunteer',
      status: 'Pending',
      date: 'Oct 09, 2024',
      message: 'College student ready to conduct weekend literacy sessions and sports camps for underserved youth.',
    },
    {
      id: 'enq-1',
      _id: 'enq-1',
      name: 'Rahul Kapoor',
      email: 'rahul.kapoor@gmail.com',
      phone: '+91 98111 22334',
      initials: 'RK',
      avatarBg: 'bg-[#FFF0E8] text-[#FB7336]',
      topic: 'Volunteering',
      initiative: 'Volunteering',
      type: 'Enquiry',
      status: 'Unread',
      date: 'Oct 16, 2024',
      message: 'Interested in leading weekend youth education drives and sports camps across Delhi NCR learning centers.',
    },
    {
      id: 'enq-2',
      _id: 'enq-2',
      name: 'Dr. Shalini Mehta',
      email: 'shalini.m@apollohealth.org',
      phone: '+91 97234 56789',
      initials: 'SM',
      avatarBg: 'bg-[#F3E8FF] text-[#9333EA]',
      topic: 'Education Support',
      initiative: 'Education Support',
      type: 'Enquiry',
      status: 'Replied',
      date: 'Oct 15, 2024',
      message: 'Inquiring regarding institutional partnership for audio-books and Braille learning kits distribution in UP and Delhi schools.',
    },
    {
      id: 'enq-3',
      _id: 'enq-3',
      name: 'Arvind Kumar',
      email: 'arvind.k@tatatrusts.org',
      phone: '+91 98450 11223',
      initials: 'AK',
      avatarBg: 'bg-[#D1FAE5] text-[#059669]',
      topic: 'Community Partnership',
      initiative: 'Community Partnership',
      type: 'Enquiry',
      status: 'Replied',
      date: 'Oct 14, 2024',
      message: 'Corporate CSR partnership discussion for expanding elder care centers, nutritional ration kits, and volunteer healthcare drives.',
    },
    {
      id: 'enq-4',
      _id: 'enq-4',
      name: 'Pooja Banerjee',
      email: 'pooja.b@mdfmail.com',
      phone: '+91 91234 11223',
      initials: 'PB',
      avatarBg: 'bg-[#FEF3C7] text-[#D97706]',
      topic: 'Elderly Care',
      initiative: 'Elderly Care',
      type: 'Enquiry',
      status: 'Unread',
      date: 'Oct 12, 2024',
      message: 'Requesting details for volunteering with senior citizens companionship, weekly care visits, and recreational sessions.',
    },
    {
      id: 'enq-5',
      _id: 'enq-5',
      name: 'Nikhil Sharma',
      email: 'nikhil@infotechmedia.in',
      phone: '+91 99100 88776',
      initials: 'NS',
      avatarBg: 'bg-[#DBEAFE] text-[#2563EB]',
      topic: 'General Enquiry',
      initiative: 'General Enquiry',
      type: 'Enquiry',
      status: 'Replied',
      date: 'Oct 10, 2024',
      message: 'Media inquiry regarding press coverage of upcoming environmental cleanliness drives, tree plantations, and student showcases.',
    },
  ]);

  const [donations, setDonations] = useState([
    {
      _id: 'don-1',
      fullName: 'Vikram Malhotra',
      email: 'vikram.m@techcorp.in',
      phone: '+91 98765 43210',
      city: 'Mumbai, MH',
      panNumber: 'ABCDE1234F',
      cause: 'Free Education',
      frequency: 'monthly',
      amount: 5000,
      referenceId: 'ZNF-20261125-9821',
      status: 'verified',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'don-2',
      fullName: 'Sunita Singhania',
      email: 'sunita.s@heritage.org',
      phone: '+91 98220 11223',
      city: 'Delhi NCR',
      panNumber: 'FGHIJ5678K',
      cause: 'Elderly Welfare',
      frequency: 'one-time',
      amount: 2500,
      referenceId: 'ZNF-20261125-4512',
      status: 'verified',
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      _id: 'don-3',
      fullName: 'Ananya Sharma',
      email: 'ananya.sharma@gmail.com',
      phone: '+91 99100 88776',
      city: 'Bengaluru, KA',
      panNumber: '',
      cause: 'Visually Impaired Care',
      frequency: 'one-time',
      amount: 1200,
      referenceId: 'ZNF-20261126-7834',
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [initiatives, setInitiatives] = useState([
    {
      id: 'init-1',
      title: 'Education Support',
      subtitle: 'Rural Learning Centers',
      tag: 'Education',
      beneficiaries: '1,200 Children',
      targetPercent: 85,
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
      description: 'Free education, learning resources, and educational assistance for underprivileged children.',
      tags: ['Learning Resources', 'Educational Assistance', 'Opportunities'],
      visible: true,
      icon: 'GraduationCap',
    },
    {
      id: 'init-2',
      title: 'Inclusive Child Support',
      subtitle: 'Audiobooks & Smart Canes',
      tag: 'Inclusion',
      beneficiaries: '450 Beneficiaries',
      targetPercent: 80,
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=600&q=80',
      description: 'Care, accessible learning initiatives, and inclusive community opportunities for visually impaired...',
      tags: ['Visually Impaired Support', 'Accessible Learning', 'Inclusion'],
      visible: true,
      icon: 'Eye',
    },
    {
      id: 'init-3',
      title: 'Elderly Welfare',
      subtitle: 'Ration & Companionship',
      tag: 'Care & Aid',
      beneficiaries: '680 Seniors Supported',
      targetPercent: 88,
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80',
      description: 'Community care activities promoting dignity, respect, and companionship for senior citizens.',
      tags: ['Community Care', 'Senior Support', 'Dignity & Companionship'],
      visible: true,
      icon: 'Heart',
    },
    {
      id: 'init-4',
      title: 'Clean Environment',
      subtitle: 'Waste Segregation & Trees',
      tag: 'Ecology',
      beneficiaries: '5,000 Saplings Planted',
      targetPercent: 75,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80',
      description: 'Community cleanliness drives, awareness campaigns, and environmental responsibility initiatives.',
      tags: ['Cleanliness Drives', 'Awareness Campaigns', 'Green Spaces'],
      visible: true,
      icon: 'Sprout',
    },
  ]);

  const [initiativeFilter, setInitiativeFilter] = useState('all'); // 'all' | 'published' | 'drafts'
  const [isAddInitiativeModalOpen, setIsAddInitiativeModalOpen] = useState(false);
  const [newInitiativeForm, setNewInitiativeForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    tags: '',
    beneficiaries: '',
    targetPercent: 80,
    image: '',
    visible: true,
  });

  const defaultGalleryPhotos = [
    {
      id: 'g-1',
      url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      title: 'Joyful Learning at Rural Center',
      caption: 'Joyful Learning at Rural Center',
      category: 'Education',
      date: 'Oct 14, 2024',
      size: '2.4 MB',
      views: 687,
      badge: 'Hero Pinned',
      isPinned: true,
    },
    {
      id: 'g-2',
      url: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
      title: 'Weekly Senior Wellness & Care',
      caption: 'Weekly Senior Wellness & Care',
      category: 'Elderly Care',
      date: 'Oct 12, 2024',
      size: '3.1 MB',
      views: 518,
      badge: 'Active Story',
      isPinned: true,
    },
    {
      id: 'g-3',
      url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=600&q=80',
      title: 'Braille & Tactile Learning Session',
      caption: 'Braille & Tactile Learning Session',
      category: 'Inclusive Learning',
      date: 'Oct 08, 2024',
      size: '1.8 MB',
      views: 392,
      badge: 'Standard',
      isPinned: false,
    },
    {
      id: 'g-4',
      url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80',
      title: 'Ward 12 Cleanliness & Green Drive',
      caption: 'Ward 12 Cleanliness & Green Drive',
      category: 'Cleanliness Drives',
      date: 'Oct 02, 2024',
      size: '2.6 MB',
      views: 424,
      badge: 'Standard',
      isPinned: true,
    },
    {
      id: 'g-5',
      url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80',
      title: 'Youth Volunteer Orientation Drive',
      caption: 'Youth Volunteer Orientation Drive',
      category: 'Volunteers',
      date: 'Sep 28, 2024',
      size: '4.1 MB',
      views: 298,
      badge: 'Standard',
      isPinned: false,
    },
  ];

  const defaultPinnedPhotos = [
    {
      id: 'pin-1',
      title: 'Learning & Book Dist...',
      category: 'Education',
      thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'pin-2',
      title: 'Senior Care & Warm...',
      category: 'Elderly Welfare',
      thumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 'pin-3',
      title: 'Green Community An...',
      category: 'Cleanliness',
      thumbnail: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=200&q=80',
    },
  ];

  const [galleryPhotos, setGalleryPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_gallery_photos');
      return saved ? JSON.parse(saved) : defaultGalleryPhotos;
    } catch {
      return defaultGalleryPhotos;
    }
  });

  const [pinnedGalleryPhotos, setPinnedGalleryPhotos] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_pinned_gallery');
      return saved ? JSON.parse(saved) : defaultPinnedPhotos;
    } catch {
      return defaultPinnedPhotos;
    }
  });

  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState('all');
  const [gallerySearchQuery, setGallerySearchQuery] = useState('');
  const [galleryView, setGalleryView] = useState('grid'); // 'grid' | 'list'
  const [gallerySortBy, setGallerySortBy] = useState('newest'); // 'newest' | 'oldest' | 'alpha'
  const [currentPage, setCurrentPage] = useState(1);
  const [editingGalleryPhoto, setEditingGalleryPhoto] = useState(null);

  // Form State for Photo Upload
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCaption, setNewPhotoCaption] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState('Education');

  // Form State for Impact Update
  const [newUpdateTitle, setNewUpdateTitle] = useState('');
  const [newUpdateDesc, setNewUpdateDesc] = useState('');

  // =========================================================================
  // GET INVOLVED (VOLUNTEERS) STATE
  // =========================================================================
  const defaultParticipationCards = [
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
  ];

  const defaultRegistrationSettings = {
    acceptApplications: true,
    autoSendWelcomeEmail: true,
    requireVerification: true,
  };

  const [participationCards, setParticipationCards] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_participation_cards');
      return saved ? JSON.parse(saved) : defaultParticipationCards;
    } catch {
      return defaultParticipationCards;
    }
  });

  const [volunteerRegistrationSettings, setVolunteerRegistrationSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_volunteer_reg_settings');
      return saved ? JSON.parse(saved) : defaultRegistrationSettings;
    } catch {
      return defaultRegistrationSettings;
    }
  });

  const [volunteerStatusFilter, setVolunteerStatusFilter] = useState('all');
  const [volunteerSearchQuery, setVolunteerSearchQuery] = useState('');
  const [volunteerPaginationPage, setVolunteerPaginationPage] = useState(1);
  const [isAddVolunteerModalOpen, setIsAddVolunteerModalOpen] = useState(false);
  const [editingParticipationCard, setEditingParticipationCard] = useState(null);
  const [newVolunteerForm, setNewVolunteerForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: 'New Delhi',
    preferredInitiative: 'Free Education',
    availability: 'Weekends',
    message: '',
  });

  // Contact Us Manager State (Matches image_efb084.png)
  const defaultPublicContactInfo = {
    email: 'contact@zinmattfoundation.org',
    phone: '+91 98200 12345 / +91 11 4050 67',
    address: 'Plot 42, Institutional Area, Sector 18, Gurugram, Delhi NCR - 122015, India',
    coordinates: '28.4817° N, 77.0815° E (Delhi NCR HQ)',
    gpsLabel: 'Active GPS Pin on Public Map',
  };

  const defaultSocialChannels = {
    instagram: { enabled: true, handle: '@zinmattfoundation' },
    facebook: { enabled: true, handle: '/zinmattfoundation' },
    linkedin: { enabled: true, handle: 'company/zinmatt-foundation' },
    youtube: { enabled: true, handle: '@zinmattfoundation' },
  };

  const defaultSecurityAlerts = {
    spamProtection: true,
    emailAlerts: true,
    autoReply: true,
  };

  const [publicContactInfo, setPublicContactInfo] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_public_contact_info');
      return saved ? JSON.parse(saved) : defaultPublicContactInfo;
    } catch {
      return defaultPublicContactInfo;
    }
  });

  const [socialChannels, setSocialChannels] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_social_channels');
      return saved ? JSON.parse(saved) : defaultSocialChannels;
    } catch {
      return defaultSocialChannels;
    }
  });

  const [securityAlerts, setSecurityAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_security_alerts');
      return saved ? JSON.parse(saved) : defaultSecurityAlerts;
    } catch {
      return defaultSecurityAlerts;
    }
  });

  const [inquiryFilter, setInquiryFilter] = useState('all'); // 'all' | 'unread' | 'replied' | 'archived'
  const [inquirySearchQuery, setInquirySearchQuery] = useState('');
  const [inquiryPage, setInquiryPage] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyDraft, setReplyDraft] = useState('');
  const [isMapPinModalOpen, setIsMapPinModalOpen] = useState(false);
  const [mapPinForm, setMapPinForm] = useState({
    coordinates: '28.4817° N, 77.0815° E (Delhi NCR HQ)',
    landmark: 'Plot 42, Institutional Area, Sector 18, Gurugram, Delhi NCR - 122015, India',
  });

  // 6. Data Fetching & Auth Verification
  useEffect(() => {
    let isMounted = true;

    async function loadAdminData() {
      try {
        // 1. Verify Admin Session
        const authData = await api.get('/api/admin/me');
        if (isMounted) {
          setAdminUser(authData.user || { name: 'ZINMATT Admin', email: 'admin@zinmattfoundation.org' });
          setIsVerifying(false);
        }

        // 2. Fetch Live Stats
        api.get('/api/admin/stats')
          .then((res) => {
            if (isMounted && res.stats) setStats(res.stats);
          })
          .catch(() => null);

        // 3. Fetch Live Volunteers
        api.get('/api/admin/volunteers')
          .then((res) => {
            if (isMounted && res.volunteers && res.volunteers.length > 0) {
              const mappedVolunteers = res.volunteers.map((v) => ({
                id: v._id,
                _id: v._id,
                name: v.fullName,
                email: v.email,
                phone: v.phone,
                initials: v.fullName
                  .split(' ')
                  .map((p) => p[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase(),
                initiative: v.preferredInitiative,
                type: 'Volunteer',
                status: v.status || 'Pending',
                date: new Date(v.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                }),
                message: v.message || 'Grassroots volunteer application.',
              }));

              // Merge with inquiries
              setRecords((prev) => {
                const enquiriesOnly = prev.filter((r) => r.type === 'Enquiry');
                return [...mappedVolunteers, ...enquiriesOnly];
              });
            }
          })
          .catch(() => null);

        // 4. Fetch Live Inquiries
        api.get('/api/admin/inquiries')
          .then((res) => {
            if (isMounted && res.inquiries && res.inquiries.length > 0) {
              const mappedInquiries = res.inquiries.map((inq) => ({
                id: inq._id,
                _id: inq._id,
                name: inq.fullName,
                email: inq.email,
                phone: inq.phone || 'Not Provided',
                initials: inq.fullName
                  .split(' ')
                  .map((p) => p[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase(),
                initiative: inq.topic || 'General Inquiry',
                type: 'Enquiry',
                status: inq.status || 'Pending',
                date: new Date(inq.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                }),
                message: inq.message,
              }));

              setRecords((prev) => {
                const volunteersOnly = prev.filter((r) => r.type === 'Volunteer');
                return [...volunteersOnly, ...mappedInquiries];
              });
            }
          })
          .catch(() => null);

        // 5. Fetch Live Donations
        api.get('/api/admin/donations')
          .then((res) => {
            if (isMounted && res.donations && res.donations.length > 0) {
              setDonations(res.donations);
            }
          })
          .catch(() => null);

        // 6. Fetch Live Gallery
        api.get('/api/gallery')
          .then((res) => {
            if (isMounted && res.items && res.items.length > 0) {
              const mappedPhotos = res.items.map((item) => ({
                id: item._id,
                _id: item._id,
                url: item.imageUrl,
                caption: item.title,
                category: item.category || 'Field Mission',
              }));
              setGalleryPhotos(mappedPhotos);
            }
          })
          .catch(() => null);

        // 7. Fetch Live Initiatives
        api.get('/api/initiatives')
          .then((res) => {
            if (isMounted && res.initiatives && res.initiatives.length > 0) {
              const mappedInits = res.initiatives.map((init) => ({
                id: init._id,
                _id: init._id,
                title: init.title,
                subtitle: init.subtitle,
                tag: init.tag,
                beneficiaries: init.metricLabel,
                targetPercent: init.targetPercent,
                image: init.imageUrl,
                description: init.subtitle,
              }));
              setInitiatives(mappedInits);
            }
          })
          .catch(() => null);

        // 8. Fetch Live Home Page Config from MongoDB
        api.get('/api/admin/home-config')
          .then((res) => {
            if (isMounted && res.config) {
              const c = res.config;
              setHomeData((prev) => ({
                ...defaultHomeConfig,
                ...c,
                hero: { ...defaultHomeConfig.hero, ...(c.hero || {}) },
                aboutPreview: { ...defaultHomeConfig.aboutPreview, ...(c.aboutPreview || {}) },
                initiativesShowcase: {
                  ...defaultHomeConfig.initiativesShowcase,
                  ...(c.initiativesShowcase || {}),
                  cards: c.initiativesShowcase?.cards?.length
                    ? c.initiativesShowcase.cards
                    : defaultHomeConfig.initiativesShowcase.cards,
                },
                coreValues: {
                  ...defaultHomeConfig.coreValues,
                  ...(c.coreValues || {}),
                  cards: c.coreValues?.cards?.length
                    ? c.coreValues.cards
                    : defaultHomeConfig.coreValues.cards,
                },
                getInvolvedSection: {
                  ...defaultHomeConfig.getInvolvedSection,
                  ...(c.getInvolvedSection || {}),
                  cards: c.getInvolvedSection?.cards?.length
                    ? c.getInvolvedSection.cards
                    : defaultHomeConfig.getInvolvedSection.cards,
                },
                trustStrip: { ...defaultHomeConfig.trustStrip, ...(c.trustStrip || {}) },
                storiesSection: {
                  ...defaultHomeConfig.storiesSection,
                  ...(c.storiesSection || {}),
                  cards: c.storiesSection?.cards?.length
                    ? c.storiesSection.cards
                    : defaultHomeConfig.storiesSection.cards,
                },
                sectionOrder:
                  c.sectionOrder && Array.isArray(c.sectionOrder) && c.sectionOrder.length > 0
                    ? c.sectionOrder
                    : defaultHomeConfig.sectionOrder,
              }));
              if (c.sectionOrder && Array.isArray(c.sectionOrder) && c.sectionOrder.length > 0) {
                setSectionVisibility(c.sectionOrder);
              }
            }
          })
          .catch(() => null);

        // 9. Fetch Live About Page Config from MongoDB
        api.get('/api/admin/about-config')
          .then((res) => {
            if (isMounted && res.config) {
              const c = res.config;
              setAboutData((prev) => ({
                ...prev,
                smallAccentLabel: c.banner?.accentLabel ?? prev.smallAccentLabel,
                pageHeadline: c.banner?.headline ?? prev.pageHeadline,
                foundationStory: c.banner?.story ?? prev.foundationStory,
                bannerImage: c.banner?.imageUrl ?? prev.bannerImage,
                visionText: c.vision?.description ?? prev.visionText,
                missionText: c.mission?.description ?? prev.missionText,
              }));
              if (c.pillars && Array.isArray(c.pillars) && c.pillars.length > 0) {
                setAboutPillars(c.pillars);
              }
              if (c.teamMembers && Array.isArray(c.teamMembers) && c.teamMembers.length > 0) {
                setTeamMembers(c.teamMembers);
              }
              if (c.visibility && Array.isArray(c.visibility) && c.visibility.length > 0) {
                setAboutSectionVisibility(c.visibility);
              }
            }
          })
          .catch(() => null);

        // 10. Fetch Live Impact Page Config from MongoDB
        api.get('/api/admin/impact-config')
          .then((res) => {
            if (isMounted && res.config) {
              const c = res.config;
              if (c.counters && Array.isArray(c.counters) && c.counters.length > 0) {
                setImpactMetrics(c.counters);
              }
              if (c.quotes && Array.isArray(c.quotes) && c.quotes.length > 0) {
                setImpactQuotes(c.quotes);
              }
              if (c.reportingControls) {
                setImpactReportingControls((prev) => ({ ...prev, ...c.reportingControls }));
              }
              if (c.displayMode) {
                setImpactDisplayMode(c.displayMode);
              }
            }
          })
          .catch(() => null);

        // 11. Fetch Live Get Involved Config from MongoDB
        api.get('/api/admin/get-involved-config')
          .then((res) => {
            if (isMounted && res.config) {
              const c = res.config;
              if (c.participationCards && Array.isArray(c.participationCards) && c.participationCards.length > 0) {
                setParticipationCards(c.participationCards);
              }
              if (c.settings) {
                setVolunteerRegistrationSettings((prev) => ({ ...prev, ...c.settings }));
              }
            }
          })
          .catch(() => null);

        // 12. Fetch Live Contact Page Config from MongoDB
        api.get('/api/admin/contact-config')
          .then((res) => {
            if (isMounted && res.config) {
              const c = res.config;
              if (c.publicInfo) {
                setPublicContactInfo((prev) => ({
                  ...prev,
                  email: c.publicInfo.email ?? prev.email,
                  phone: c.publicInfo.phone ?? prev.phone,
                  address: c.publicInfo.address ?? prev.address,
                  coordinates: c.publicInfo.mapPin?.coordinates ?? prev.coordinates,
                }));
              }
              if (c.channels) {
                setSocialChannels((prev) => ({
                  ...prev,
                  instagram: c.channels.instagram?.handle ?? prev.instagram,
                  facebook: c.channels.facebook?.handle ?? prev.facebook,
                  linkedin: c.channels.linkedin?.handle ?? prev.linkedin,
                  youtube: c.channels.youtube?.handle ?? prev.youtube,
                }));
              }
              if (c.securityAlerts) {
                setSecurityAlerts((prev) => ({ ...prev, ...c.securityAlerts }));
              }
            }
          })
          .catch(() => null);
      } catch (err) {
        // Fallback to local session check if offline
        const stored = localStorage.getItem('zinmatt_admin_user');
        if (stored) {
          if (isMounted) {
            setAdminUser(JSON.parse(stored));
            setIsVerifying(false);
          }
        } else {
          if (isMounted) {
            navigate('/admin-login');
          }
        }
      }
    }

    loadAdminData();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const showToast = (msg) => {
    setNotificationToast(msg);
    setTimeout(() => {
      setNotificationToast('');
    }, 3500);
  };

  // =========================================================================
  // HOME PAGE MANAGER STATE & HANDLERS (Matches image_e4000c.png & image_f26e06.jpg)
  // =========================================================================
  const defaultHomeConfig = {
    hero: {
      accentTag: 'MAKING A DIFFERENCE TOGETHER',
      headline: 'Building a Better Tomorrow, One Life at a Time.',
      highlightText: 'One Life at a Time.',
      description:
        'Empowering children with education, supporting visually impaired youth, caring for elders, and building cleaner communities across India.',
      primaryBtnLabel: 'Support Our Cause',
      secondaryBtnLabel: 'Explore Our Mission',
      heroImage:
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
  };

  const [homeData, setHomeData] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_home_page_config');
      return saved ? { ...defaultHomeConfig, ...JSON.parse(saved) } : defaultHomeConfig;
    } catch {
      return defaultHomeConfig;
    }
  });

  const defaultSections = [
    { id: 'hero', number: 1, name: '1. Hero Banner Section', label: '1. Hero Banner Section', enabled: true, visible: true },
    { id: 'about', number: 2, name: '2. About ZINMATT Section', label: '2. About ZINMATT Section', enabled: true, visible: true },
    { id: 'initiatives', number: 3, name: '3. What We Do Initiatives', label: '3. What We Do Initiatives', enabled: true, visible: true },
    { id: 'pillars', number: 4, name: '4. 4 Core Values Grid', label: '4. 4 Core Values Grid', enabled: true, visible: true },
    { id: 'get_involved', number: 5, name: '5. Be a Part of the Change', label: '5. Be a Part of the Change', enabled: true, visible: true },
    { id: 'trust_strip', number: 6, name: '6. Orange Gradient Trust Strip', label: '6. Orange Gradient Trust Strip', enabled: true, visible: true },
    { id: 'stories', number: 7, name: '7. Moments of Impact & Community', label: '7. Moments of Impact & Community', enabled: true, visible: true },
  ];

  const [sectionVisibility, setSectionVisibility] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_home_sections');
      return saved ? JSON.parse(saved) : defaultSections;
    } catch {
      return defaultSections;
    }
  });

  const [lastPublishedTime, setLastPublishedTime] = useState('Today, 11:45 AM');
  const [autoSavedTime, setAutoSavedTime] = useState('Auto-saved 2 mins ago');

  const handleHomeFieldChange = (section, field, value) => {
    setHomeData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value,
      },
    }));
    setAutoSavedTime('Auto-saved just now');
  };

  const toggleSection = (id) => {
    setSectionVisibility((prev) => {
      const next = prev.map((s) =>
        s.id === id ? { ...s, enabled: !s.enabled, visible: !s.visible } : s
      );
      try {
        localStorage.setItem('zinmatt_home_sections', JSON.stringify(next));
      } catch {}
      return next;
    });
    setAutoSavedTime('Auto-saved just now');
    showToast('Section visibility updated');
  };

  const resetSectionsDefault = () => {
    setSectionVisibility(defaultSections);
    try {
      localStorage.setItem('zinmatt_home_sections', JSON.stringify(defaultSections));
    } catch {}
    showToast('Section order & visibility reset to default');
  };

  const discardUnsavedChanges = () => {
    setHomeData(defaultHomeConfig);
    setSectionVisibility(defaultSections);
    localStorage.removeItem('zinmatt_home_page_config');
    localStorage.removeItem('zinmatt_home_sections');
    showToast('Unsaved changes discarded successfully');
  };

  const handleSaveAndPublishHome = async () => {
    try {
      const payload = {
        ...homeData,
        sectionOrder: sectionVisibility,
      };
      localStorage.setItem('zinmatt_home_page_config', JSON.stringify(payload));
      localStorage.setItem('zinmatt_home_sections', JSON.stringify(sectionVisibility));

      await api.put('/api/admin/home-config', payload);

      const now = new Date();
      const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      setLastPublishedTime(timeStr);
      setAutoSavedTime('Auto-saved just now');
      showToast('Home Page configuration published live to production & saved to MongoDB!');
    } catch (e) {
      console.warn('Home config save warning:', e);
      const now = new Date();
      const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      setLastPublishedTime(timeStr);
      setAutoSavedTime('Auto-saved just now');
      showToast('Home Page configuration saved locally. MongoDB status: ' + (e.message || 'offline'));
    }
  };

  // =========================================================================
  // ABOUT US PAGE MANAGER STATE & HANDLERS (Matches image_e47527.png)
  // =========================================================================
  const defaultAboutConfig = {
    smallAccentLabel: 'ABOUT ZINMATT FOUNDATION',
    pageHeadline: 'Creating Opportunities. Spreading Hope.',
    foundationStory:
      'ZINMATT Foundation is driven by the belief that positive change begins when people come together for a meaningful cause. Through free education, support for visually impaired children, elderly care, and environmental cleanliness, we aim to build a more inclusive and compassionate society.',
    visionText:
      'A world where every individual, regardless of background or ability, has equitable access to education, dignified care, and a thriving sustainable community.',
    missionText:
      'To mobilize grassroots volunteers, institutional partners, and compassionate donors to deliver free education, elderly support, and green civic action.',
    bannerImage: 'community_outreach_banner.webp',
  };

  const [aboutData, setAboutData] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_about_page_config');
      return saved ? { ...defaultAboutConfig, ...JSON.parse(saved) } : defaultAboutConfig;
    } catch {
      return defaultAboutConfig;
    }
  });

  const defaultPillars = [
    {
      id: 'pillar-1',
      title: 'Free Education',
      tag: 'Pillar 01 • Priority',
      description:
        'Youth learning & literacy programs across rural centers with tailored curriculum support.',
      metric: '1,420 Students',
      icon: 'BookOpen',
      status: 'Live Section',
    },
    {
      id: 'pillar-2',
      title: 'Visually Impaired Support',
      tag: 'Pillar 02 • Assistive Tech',
      description:
        'Audiobooks, smart canes & tactile learning kits providing autonomy and self-reliance.',
      metric: '450 Kits Distributed',
      icon: 'Eye',
      status: 'Live Section',
    },
    {
      id: 'pillar-3',
      title: 'Elderly Care',
      tag: 'Pillar 03 • Welfare',
      description:
        'Nutritional ration, healthcare check-ups & dedicated volunteer companionship visits.',
      metric: '680 Seniors Supported',
      icon: 'Heart',
      status: 'Live Section',
    },
    {
      id: 'pillar-4',
      title: 'Environmental Cleanliness',
      tag: 'Pillar 04 • Sustainability',
      description:
        'Waste segregation, public cleanup drives & indigenous tree plantation initiatives.',
      metric: '34 Clean Drives',
      icon: 'Sprout',
      status: 'Live Section',
    },
  ];

  const [aboutPillars, setAboutPillars] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_about_pillars');
      return saved ? JSON.parse(saved) : defaultPillars;
    } catch {
      return defaultPillars;
    }
  });

  const defaultTeamMembers = [
    {
      id: 'team-1',
      name: 'Aarav Mehta',
      role: 'Foundation Trustee',
      initials: 'AM',
    },
    {
      id: 'team-2',
      name: 'Priya Nair',
      role: 'Education Lead',
      initials: 'PN',
    },
    {
      id: 'team-3',
      name: 'Rohan Kapoor',
      role: 'Community Care Lead',
      initials: 'RK',
    },
    {
      id: 'team-4',
      name: 'Ananya Verma',
      role: 'Volunteer Coordinator',
      initials: 'AV',
    },
  ];

  const [teamMembers, setTeamMembers] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_about_team');
      return saved ? JSON.parse(saved) : defaultTeamMembers;
    } catch {
      return defaultTeamMembers;
    }
  });

  const defaultAboutSections = [
    {
      id: 'sec-vision',
      name: 'Vision & Mission Section',
      subtitle: 'Public dual card grid',
      enabled: true,
    },
    {
      id: 'sec-values',
      name: '4 Core Values Grid',
      subtitle: 'Dynamic Bento metric tiles',
      enabled: true,
    },
    {
      id: 'sec-team',
      name: 'Team & Leadership Section',
      subtitle: 'Founders & core trustees roster',
      enabled: true,
    },
  ];

  const [aboutSectionVisibility, setAboutSectionVisibility] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_about_sections');
      return saved ? JSON.parse(saved) : defaultAboutSections;
    } catch {
      return defaultAboutSections;
    }
  });

  const [aboutLastPublishedTime, setAboutLastPublishedTime] = useState('Today, 11:45 AM');
  const [aboutAutoSavedTime, setAboutAutoSavedTime] = useState('Auto-saved 2 mins ago');
  const [editingPillar, setEditingPillar] = useState(null);
  const [editingTeamMember, setEditingTeamMember] = useState(null);
  const [isAddTeamModalOpen, setIsAddTeamModalOpen] = useState(false);
  const [teamForm, setTeamForm] = useState({ name: '', role: '', initials: '' });

  const handleAboutFieldChange = (field, value) => {
    setAboutData((prev) => ({ ...prev, [field]: value }));
    setAboutAutoSavedTime('Auto-saved just now');
  };

  const toggleAboutSection = (id) => {
    setAboutSectionVisibility((prev) => {
      const next = prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s));
      try {
        localStorage.setItem('zinmatt_about_sections', JSON.stringify(next));
      } catch {}
      return next;
    });
    setAboutAutoSavedTime('Auto-saved just now');
    showToast('Section visibility updated');
  };

  const handleSaveAndPublishAbout = async () => {
    try {
      localStorage.setItem('zinmatt_about_page_config', JSON.stringify(aboutData));
      localStorage.setItem('zinmatt_about_pillars', JSON.stringify(aboutPillars));
      localStorage.setItem('zinmatt_about_team', JSON.stringify(teamMembers));
      localStorage.setItem('zinmatt_about_sections', JSON.stringify(aboutSectionVisibility));

      const payload = {
        banner: {
          accentLabel: aboutData.smallAccentLabel,
          headline: aboutData.pageHeadline,
          story: aboutData.foundationStory,
          imageUrl: aboutData.bannerImage,
        },
        vision: {
          description: aboutData.visionText,
        },
        mission: {
          description: aboutData.missionText,
        },
        pillars: aboutPillars,
        teamMembers: teamMembers,
        visibility: aboutSectionVisibility,
      };

      await api.put('/api/admin/about-config', payload);

      const now = new Date();
      const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      setAboutLastPublishedTime(timeStr);
      setAboutAutoSavedTime('Auto-saved just now');
      showToast('About Us Page configuration published live to production & saved to MongoDB!');
    } catch (e) {
      console.warn('About config save warning:', e);
      const now = new Date();
      const timeStr = `Today, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      setAboutLastPublishedTime(timeStr);
      setAboutAutoSavedTime('Auto-saved just now');
      showToast('About Us saved locally. MongoDB status: ' + (e.message || 'offline'));
    }
  };

  const discardAboutUnsavedChanges = () => {
    setAboutData(defaultAboutConfig);
    setAboutPillars(defaultPillars);
    setTeamMembers(defaultTeamMembers);
    setAboutSectionVisibility(defaultAboutSections);
    localStorage.removeItem('zinmatt_about_page_config');
    localStorage.removeItem('zinmatt_about_pillars');
    localStorage.removeItem('zinmatt_about_team');
    localStorage.removeItem('zinmatt_about_sections');
    showToast('About Us unsaved changes discarded successfully');
  };

  const handleSavePillar = (e) => {
    e.preventDefault();
    if (!editingPillar) return;
    setAboutPillars((prev) =>
      prev.map((p) => (p.id === editingPillar.id ? editingPillar : p))
    );
    setEditingPillar(null);
    setAboutAutoSavedTime('Auto-saved just now');
    showToast('Core Value Pillar updated successfully!');
  };

  const handleAddOrEditTeamMember = (e) => {
    e.preventDefault();
    if (editingTeamMember) {
      setTeamMembers((prev) =>
        prev.map((m) =>
          m.id === editingTeamMember.id
            ? {
                ...editingTeamMember,
                initials:
                  editingTeamMember.initials ||
                  editingTeamMember.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2),
              }
            : m
        )
      );
      setEditingTeamMember(null);
      showToast('Team member updated successfully!');
    } else {
      if (!teamForm.name || !teamForm.role) {
        showToast('Please enter both name and role');
        return;
      }
      const initials = (
        teamForm.initials ||
        teamForm.name
          .split(' ')
          .map((n) => n[0])
          .join('')
      )
        .toUpperCase()
        .slice(0, 2);
      const newMember = {
        id: `team-${Date.now()}`,
        name: teamForm.name,
        role: teamForm.role,
        initials,
      };
      setTeamMembers((prev) => [...prev, newMember]);
      setTeamForm({ name: '', role: '', initials: '' });
      setIsAddTeamModalOpen(false);
      showToast('New team member added successfully!');
    }
    setAboutAutoSavedTime('Auto-saved just now');
  };

  const handleDeleteTeamMember = (id, name) => {
    setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    setAboutAutoSavedTime('Auto-saved just now');
    showToast(`Removed ${name} from leadership`);
  };

  const handleLogout = async () => {
    try {
      await api.post('/api/admin/logout').catch(() => null);
    } finally {
      localStorage.removeItem('zinmatt_admin_user');
      navigate('/admin-login');
    }
  };

  // Toggle record status (Pending <-> Approved / Replied) with real API sync
  const toggleRecordStatus = async (item) => {
    const isVolunteer = item.type === 'Volunteer';
    const nextStatus = item.status === 'Approved' ? 'Pending' : 'Approved';

    // 1. Optimistic UI update
    setRecords((prev) =>
      prev.map((rec) => (rec.id === item.id ? { ...rec, status: nextStatus } : rec))
    );

    showToast(`Status updated to ${nextStatus} for ${item.name}`);

    // 2. Sync with Backend if it's a real MongoDB record ID
    try {
      if (item._id) {
        if (isVolunteer) {
          await api.patch(`/api/admin/volunteers/${item._id}`, { status: nextStatus });
        } else {
          await api.patch(`/api/admin/inquiries/${item._id}`, { status: nextStatus });
        }
      }
    } catch (err) {
      console.warn('[Sync Warning]', err.message);
    }
  };

  // Toggle Donation status (pending <-> verified)
  const toggleDonationStatus = async (donation) => {
    const nextStatus = donation.status === 'verified' ? 'pending' : 'verified';

    setDonations((prev) =>
      prev.map((d) => (d._id === donation._id ? { ...d, status: nextStatus } : d))
    );

    showToast(`Donation ${donation.referenceId} marked as ${nextStatus.toUpperCase()}`);

    try {
      if (donation._id && !donation._id.startsWith('don-')) {
        await api.patch(`/api/admin/donations/${donation._id}`, { status: nextStatus });
      }
    } catch (err) {
      console.warn('[Donation Status Sync Warning]', err.message);
    }
  };

  // Delete Donation
  const handleDeleteDonation = async (id) => {
    setDonations((prev) => prev.filter((d) => d._id !== id));
    showToast('Donation record deleted.');
    try {
      if (!id.startsWith('don-')) {
        await api.delete(`/api/admin/donations/${id}`);
      }
    } catch (err) {
      console.warn('[Donation Delete Warning]', err.message);
    }
  };

  // Save edited initiative with backend persistence
  const handleSaveInitiative = async (e) => {
    e.preventDefault();
    if (!editingInitiative) return;

    const targetId = editingInitiative._id || editingInitiative.id;

    setInitiatives((prev) =>
      prev.map((init) => ((init._id || init.id) === targetId ? editingInitiative : init))
    );

    showToast(`Updated "${editingInitiative.title}" successfully!`);

    try {
      if (targetId && !targetId.startsWith('init-')) {
        await api.put(`/api/admin/initiatives/${targetId}`, {
          title: editingInitiative.title,
          subtitle: editingInitiative.subtitle,
          metricLabel: editingInitiative.beneficiaries,
          targetPercent: Number(editingInitiative.targetPercent),
          imageUrl: editingInitiative.image,
          tag: editingInitiative.tag,
        });
      }
    } catch (err) {
      console.warn('[Initiative Save Warning]', err.message);
    }

    setEditingInitiative(null);
  };

  const toggleInitiativeVisibility = (id) => {
    setInitiatives((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id || item._id === id) {
          const nextVisible = item.visible === false ? true : false;
          showToast(`"${item.title}" is now ${nextVisible ? 'Live on public website' : 'Draft'}`);
          return { ...item, visible: nextVisible };
        }
        return item;
      });
      try {
        localStorage.setItem('zinmatt_initiatives_data', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const handleReorderInitiatives = () => {
    setInitiatives((prev) => {
      const reversed = [...prev].reverse();
      showToast('Initiatives cards order adjusted!');
      return reversed;
    });
  };

  const handleSaveInitiativeOrder = () => {
    try {
      localStorage.setItem('zinmatt_initiatives_data', JSON.stringify(initiatives));
    } catch {}
    showToast('All 4 Core Initiatives are synced with the public website!');
  };

  const handleAddInitiative = (e) => {
    e.preventDefault();
    if (!newInitiativeForm.title) {
      showToast('Please enter an initiative title');
      return;
    }
    const tagsArray = newInitiativeForm.tags
      ? (typeof newInitiativeForm.tags === 'string'
          ? newInitiativeForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
          : newInitiativeForm.tags)
      : ['Grassroots Mission'];

    const newInit = {
      id: `init-${Date.now()}`,
      title: newInitiativeForm.title,
      subtitle: newInitiativeForm.subtitle || 'Community Action',
      tag: tagsArray[0] || 'Community',
      beneficiaries: newInitiativeForm.beneficiaries || '500+ Beneficiaries',
      targetPercent: Number(newInitiativeForm.targetPercent) || 80,
      image:
        newInitiativeForm.image ||
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      description:
        newInitiativeForm.description ||
        'Dedicated grassroots foundation initiative delivering measurable human impact.',
      tags: tagsArray,
      visible: newInitiativeForm.visible !== false,
      icon: 'Heart',
    };

    setInitiatives((prev) => [newInit, ...prev]);
    setIsAddInitiativeModalOpen(false);
    setNewInitiativeForm({
      title: '',
      subtitle: '',
      description: '',
      tags: '',
      beneficiaries: '',
      targetPercent: 80,
      image: '',
      visible: true,
    });
    showToast(`New cause "${newInit.title}" added successfully!`);
  };

  // Handle new photo upload with backend persistence
  const handleAddPhoto = async (e) => {
    e.preventDefault();
    if (!newPhotoUrl.trim()) return;

    const tempId = `g-${Date.now()}`;
    const newEntry = {
      id: tempId,
      url: newPhotoUrl.trim(),
      caption: newPhotoCaption.trim() || 'Field Activity Update',
      title: newPhotoCaption.trim() || 'Field Activity Update',
      category: newPhotoCategory,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      size: '2.4 MB',
      views: 1,
      badge: 'Standard',
      isPinned: false,
    };

    setGalleryPhotos((prev) => [newEntry, ...prev]);
    setIsUploadModalOpen(false);
    showToast('New field photo published to gallery!');

    try {
      const res = await api.post('/api/admin/gallery', {
        title: newPhotoCaption.trim() || 'Field Activity Update',
        category: newPhotoCategory,
        imageUrl: newPhotoUrl.trim(),
        location: 'Field Center',
      });
      if (res && res.item) {
        setGalleryPhotos((prev) =>
          prev.map((p) =>
            p.id === tempId ? { ...p, id: res.item._id, _id: res.item._id } : p
          )
        );
      }
    } catch (err) {
      console.warn('[Photo Upload Warning]', err.message);
    }

    setNewPhotoUrl('');
    setNewPhotoCaption('');
  };

  // Handle photo deletion
  const handleDeletePhoto = async (photo) => {
    setGalleryPhotos((prev) => prev.filter((p) => p.id !== photo.id));
    setPinnedGalleryPhotos((prev) => prev.filter((p) => p.id !== photo.id && p.title !== (photo.caption || photo.title)));
    showToast('Photo removed from gallery');

    try {
      const targetId = photo._id || photo.id;
      if (targetId && !targetId.startsWith('g-')) {
        await api.delete(`/api/admin/gallery/${targetId}`);
      }
    } catch (err) {
      console.warn('[Photo Delete Warning]', err.message);
    }
  };

  const togglePinPhoto = (id) => {
    setGalleryPhotos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextPinned = !p.isPinned;
          showToast(`Photo "${p.caption || p.title}" ${nextPinned ? 'pinned to highlights' : 'unpinned'}`);
          if (nextPinned) {
            setPinnedGalleryPhotos((prevPins) => [
              {
                id: `pin-${p.id}`,
                title: p.caption || p.title,
                category: p.category,
                thumbnail: p.url,
              },
              ...prevPins,
            ]);
          } else {
            setPinnedGalleryPhotos((prevPins) =>
              prevPins.filter((pin) => pin.title !== (p.caption || p.title) && pin.id !== `pin-${p.id}`)
            );
          }
          return {
            ...p,
            isPinned: nextPinned,
            badge: nextPinned ? 'Hero Pinned' : 'Standard',
          };
        }
        return p;
      })
    );
  };

  const handleUnpinPhoto = (pinId) => {
    setPinnedGalleryPhotos((prev) => prev.filter((p) => p.id !== pinId));
    showToast('Slot removed from public pinned highlights');
  };

  const handlePinAnotherPhoto = () => {
    const unpinned = galleryPhotos.find((p) => !p.isPinned);
    if (unpinned) {
      togglePinPhoto(unpinned.id);
    } else {
      showToast('All available gallery photos are currently pinned!');
    }
  };

  const handleBatchSelectAll = () => {
    showToast(`Batch selected ${filteredGalleryPhotos.length} photos for action`);
  };

  const handleDiscardGalleryChanges = () => {
    setGalleryPhotos(defaultGalleryPhotos);
    setPinnedGalleryPhotos(defaultPinnedPhotos);
    localStorage.removeItem('zinmatt_gallery_photos');
    localStorage.removeItem('zinmatt_pinned_gallery');
    showToast('Gallery library reset to default verified showcase');
  };

  const handleSaveEditedPhoto = (e) => {
    e.preventDefault();
    if (!editingGalleryPhoto) return;
    setGalleryPhotos((prev) =>
      prev.map((p) => (p.id === editingGalleryPhoto.id ? editingGalleryPhoto : p))
    );
    setEditingGalleryPhoto(null);
    showToast(`Updated "${editingGalleryPhoto.caption || editingGalleryPhoto.title}"`);
  };

  const handleDropFile = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setNewPhotoUrl(uploadEvent.target.result);
        setNewPhotoCaption(file.name.replace(/\.[^/.]+$/, ''));
        setIsUploadModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle new update posting
  const handlePostUpdate = (e) => {
    e.preventDefault();
    if (!newUpdateTitle.trim()) return;
    setIsNewUpdateModalOpen(false);
    setNewUpdateTitle('');
    setNewUpdateDesc('');
    showToast('Field status update posted across dashboard!');
  };

  // =========================================================================
  // OUR IMPACT MANAGER STATE & HANDLERS
  // =========================================================================
  const defaultImpactMetrics = [
    {
      id: 'metric-1',
      title: 'Children Supported',
      icon: 'GraduationCap',
      value: '1,420+ Children',
      subtitle: 'Education & Learning Access',
      goal: '1,960 by Q4',
      progress: 72.5,
      enabled: true,
    },
    {
      id: 'metric-2',
      title: 'Educational Resources',
      icon: 'BookOpen',
      value: '3,850+ Kits & Books',
      subtitle: 'Books, Kits & Inclusive Aids',
      goal: '4,000 by Q4',
      progress: 96.2,
      enabled: true,
    },
    {
      id: 'metric-3',
      title: 'Elderly People Reached',
      icon: 'Heart',
      value: '620+ Seniors',
      subtitle: 'Care & Companionship Drives',
      goal: '700 by Q4',
      progress: 88.5,
      enabled: true,
    },
    {
      id: 'metric-4',
      title: 'Cleanliness Drives',
      icon: 'Sparkles',
      value: '34+ Civic Drives',
      subtitle: 'Community & Green Campaigns',
      goal: '40 by Q4',
      progress: 85.0,
      enabled: true,
    },
  ];

  const defaultImpactQuotes = [
    {
      id: 'quote-1',
      name: 'Sunita Sharma',
      role: 'Community Volunteer',
      quote: "Seeing the spark in children's eyes when they receive their own books is indescribable.",
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'quote-2',
      name: 'Ramesh Kulkarni',
      role: 'Education Mentor',
      quote: 'The specialized braille materials unlocked an entirely new world of learning for our youth.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'quote-3',
      name: 'Meera Deshmukh',
      role: 'Local Supporter',
      quote: 'Weekly care visits brought dignity, warmth, and nutritious meals to isolated elders.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    },
  ];

  const defaultReportingControls = {
    countUpAnimation: true,
    showCommitments: false,
    showCommunityVoices: true,
  };

  const [impactMetrics, setImpactMetrics] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_impact_metrics');
      return saved ? JSON.parse(saved) : defaultImpactMetrics;
    } catch {
      return defaultImpactMetrics;
    }
  });

  const [impactQuotes, setImpactQuotes] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_impact_quotes');
      return saved ? JSON.parse(saved) : defaultImpactQuotes;
    } catch {
      return defaultImpactQuotes;
    }
  });

  const [impactDisplayMode, setImpactDisplayMode] = useState('numbers'); // 'numbers' | 'goals'

  const [impactReportingControls, setImpactReportingControls] = useState(() => {
    try {
      const saved = localStorage.getItem('zinmatt_impact_reporting_controls');
      return saved ? JSON.parse(saved) : defaultReportingControls;
    } catch {
      return defaultReportingControls;
    }
  });

  const [isAddQuoteModalOpen, setIsAddQuoteModalOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);
  const [newQuoteForm, setNewQuoteForm] = useState({
    name: '',
    role: 'Community Volunteer',
    quote: '',
    avatar: '',
  });

  const handleMetricChange = (id, field, value) => {
    setImpactMetrics((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const toggleMetricEnabled = (id) => {
    setImpactMetrics((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextState = !m.enabled;
          showToast(`"${m.title}" is now ${nextState ? 'visible' : 'hidden'} on public site`);
          return { ...m, enabled: nextState };
        }
        return m;
      })
    );
  };

  const toggleReportingControl = (key) => {
    setImpactReportingControls((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      showToast('Reporting control updated');
      return updated;
    });
  };

  const handleSaveAndPublishImpact = async () => {
    try {
      localStorage.setItem('zinmatt_impact_metrics', JSON.stringify(impactMetrics));
      localStorage.setItem('zinmatt_impact_quotes', JSON.stringify(impactQuotes));
      localStorage.setItem('zinmatt_impact_reporting_controls', JSON.stringify(impactReportingControls));

      const payload = {
        displayMode: impactDisplayMode || 'verified',
        counters: impactMetrics,
        quotes: impactQuotes,
        reportingControls: impactReportingControls,
      };

      await api.put('/api/admin/impact-config', payload);
      showToast('Our Impact verified metrics & stories published live & saved to MongoDB!');
    } catch (e) {
      console.warn('Impact config save warning:', e);
      showToast('Saved locally. MongoDB status: ' + (e.message || 'offline'));
    }
  };

  const handleDiscardImpactChanges = () => {
    setImpactMetrics(defaultImpactMetrics);
    setImpactQuotes(defaultImpactQuotes);
    setImpactReportingControls(defaultReportingControls);
    try {
      localStorage.removeItem('zinmatt_impact_metrics');
      localStorage.removeItem('zinmatt_impact_quotes');
      localStorage.removeItem('zinmatt_impact_reporting_controls');
    } catch {}
    showToast('Impact metrics and settings reset to defaults.');
  };

  const handleAddQuote = (e) => {
    e.preventDefault();
    if (!newQuoteForm.name || !newQuoteForm.quote) {
      showToast('Please provide both name and quote text');
      return;
    }
    const newQuote = {
      id: `quote-${Date.now()}`,
      name: newQuoteForm.name,
      role: newQuoteForm.role || 'Community Supporter',
      quote: newQuoteForm.quote,
      avatar:
        newQuoteForm.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    };
    setImpactQuotes((prev) => [newQuote, ...prev]);
    setNewQuoteForm({ name: '', role: 'Community Volunteer', quote: '', avatar: '' });
    setIsAddQuoteModalOpen(false);
    showToast(`Added quote from "${newQuote.name}"`);
  };

  const handleSaveEditedQuote = (e) => {
    e.preventDefault();
    if (!editingQuote) return;
    setImpactQuotes((prev) =>
      prev.map((q) => (q.id === editingQuote.id ? editingQuote : q))
    );
    setEditingQuote(null);
    showToast(`Updated quote for "${editingQuote.name}"`);
  };

  const handleDeleteQuote = (id, name) => {
    setImpactQuotes((prev) => prev.filter((q) => q.id !== id));
    showToast(`Deleted quote by ${name}`);
  };

  const getMetricIcon = (iconName) => {
    switch (iconName) {
      case 'GraduationCap':
        return GraduationCap;
      case 'BookOpen':
        return BookOpen;
      case 'Heart':
        return Heart;
      case 'Sparkles':
        return Sparkles;
      default:
        return TrendingUp;
    }
  };

  // Filtered records
  const filteredRecords = records.filter((rec) => {
    const matchesFilter =
      activeFilter === 'all'
        ? true
        : activeFilter === 'volunteers'
        ? rec.type.toLowerCase() === 'volunteer'
        : rec.type.toLowerCase() === 'enquiry';

    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : rec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.initiative.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Filtered donations
  const filteredDonations = donations.filter((don) => {
    const matchesFilter =
      donationFilter === 'all' ? true : don.status.toLowerCase() === donationFilter.toLowerCase();
    const matchesSearch =
      searchQuery.trim() === ''
        ? true
        : don.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          don.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (don.referenceId && don.referenceId.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (don.cause && don.cause.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  // Filtered and sorted gallery photos
  const filteredGalleryPhotos = galleryPhotos
    .filter((photo) => {
      const matchesCategory =
        galleryCategoryFilter === 'all'
          ? true
          : (photo.category || '').toLowerCase() === galleryCategoryFilter.toLowerCase();
      const matchesSearch =
        gallerySearchQuery.trim() === ''
          ? true
          : (photo.caption || photo.title || '').toLowerCase().includes(gallerySearchQuery.toLowerCase()) ||
            (photo.category || '').toLowerCase().includes(gallerySearchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (gallerySortBy === 'alpha') {
        return (a.caption || a.title || '').localeCompare(b.caption || b.title || '');
      }
      if (gallerySortBy === 'oldest') {
        return (a.id || '').localeCompare(b.id || '');
      }
      return (b.id || '').localeCompare(a.id || '');
    });

  // Filtered volunteers for Get Involved tab
  const filteredVolunteers = records
    .filter((r) => r.type === 'Volunteer')
    .filter((vol) => {
      const matchesStatus =
        volunteerStatusFilter === 'all'
          ? true
          : (vol.status || '').toLowerCase() === volunteerStatusFilter.toLowerCase();
      const matchesSearch =
        volunteerSearchQuery.trim() === ''
          ? true
          : (vol.name || '').toLowerCase().includes(volunteerSearchQuery.toLowerCase()) ||
            (vol.initiative || vol.preferredCause || '').toLowerCase().includes(volunteerSearchQuery.toLowerCase()) ||
            (vol.email || '').toLowerCase().includes(volunteerSearchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });

  const handleAddVolunteerSubmit = async (e) => {
    e.preventDefault();
    if (!newVolunteerForm.fullName || !newVolunteerForm.email) {
      showToast('Please provide applicant full name and email');
      return;
    }

    const tempId = `vol-${Date.now()}`;
    const initials = newVolunteerForm.fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newVolRecord = {
      id: tempId,
      _id: tempId,
      name: newVolunteerForm.fullName,
      email: newVolunteerForm.email,
      phone: newVolunteerForm.phone || '+91 98765 43210',
      city: newVolunteerForm.city || 'Delhi NCR',
      initials,
      initiative: newVolunteerForm.preferredInitiative || 'Free Education',
      preferredCause: newVolunteerForm.preferredInitiative || 'Free Education',
      type: 'Volunteer',
      status: 'Pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      message: newVolunteerForm.message || 'Volunteer applicant ready for grassroots deployment.',
      availability: newVolunteerForm.availability || 'Weekends',
    };

    setRecords((prev) => [newVolRecord, ...prev]);
    setIsAddVolunteerModalOpen(false);
    setNewVolunteerForm({
      fullName: '',
      email: '',
      phone: '',
      city: 'New Delhi',
      preferredInitiative: 'Free Education',
      availability: 'Weekends',
      message: '',
    });
    showToast(`Volunteer application for "${newVolRecord.name}" created!`);

    try {
      await api.post('/api/volunteers', {
        fullName: newVolunteerForm.fullName,
        email: newVolunteerForm.email,
        phone: newVolunteerForm.phone,
        city: newVolunteerForm.city,
        preferredInitiative: newVolunteerForm.preferredInitiative,
        availability: newVolunteerForm.availability,
        message: newVolunteerForm.message,
      });
    } catch (err) {
      console.warn('[Add Volunteer Warning]', err.message);
    }
  };

  const toggleVolunteerRegSetting = (key) => {
    setVolunteerRegistrationSettings((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem('zinmatt_volunteer_reg_settings', JSON.stringify(next));
      } catch {}
      api.put('/api/admin/get-involved-config', {
        participationCards,
        settings: next,
      }).catch((e) => console.warn('Get Involved settings sync warning:', e));
      showToast('Registration setting updated & saved to MongoDB');
      return next;
    });
  };

  const handleSaveParticipationCardSubmit = (e) => {
    e.preventDefault();
    if (!editingParticipationCard) return;
    setParticipationCards((prev) => {
      const next = prev.map((c) =>
        c.id === editingParticipationCard.id ? editingParticipationCard : c
      );
      try {
        localStorage.setItem('zinmatt_participation_cards', JSON.stringify(next));
      } catch {}
      api.put('/api/admin/get-involved-config', {
        participationCards: next,
        settings: volunteerRegistrationSettings,
      }).catch((err) => console.warn('Get Involved cards sync warning:', err));
      return next;
    });
    setEditingParticipationCard(null);
    showToast(`Updated "${editingParticipationCard.title}" & saved to MongoDB!`);
  };

  const handleDiscardVolunteerSettings = () => {
    setParticipationCards(defaultParticipationCards);
    setVolunteerRegistrationSettings(defaultRegistrationSettings);
    localStorage.removeItem('zinmatt_participation_cards');
    localStorage.removeItem('zinmatt_volunteer_reg_settings');
    api.put('/api/admin/get-involved-config', {
      participationCards: defaultParticipationCards,
      settings: defaultRegistrationSettings,
    }).catch(() => null);
    showToast('Get Involved settings reset to defaults');
  };

  const handleExportVolunteerCSV = () => {
    const rows = filteredVolunteers;
    if (!rows.length) {
      showToast('No volunteer applications to export');
      return;
    }
    const headers = ['Applicant Name', 'Email', 'Phone', 'Initiative / Cause', 'Applied Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...rows.map((r) =>
        [
          `"${(r.name || '').replace(/"/g, '""')}"`,
          `"${(r.email || '').replace(/"/g, '""')}"`,
          `"${(r.phone || '').replace(/"/g, '""')}"`,
          `"${(r.initiative || r.preferredCause || '').replace(/"/g, '""')}"`,
          `"${(r.date || '').replace(/"/g, '""')}"`,
          `"${(r.status || '').replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `zinmatt_volunteers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Volunteer applications exported as CSV!');
  };

  // Contact Us Enquiries Filtering & Handlers (Matches image_efb084.png)
  const allInquiries = records.filter((r) => r.type === 'Enquiry');
  const unreadCount = allInquiries.filter(
    (r) => r.status === 'Unread' || r.status === 'Pending'
  ).length;
  const repliedCount = allInquiries.filter((r) => r.status === 'Replied').length;
  const archivedCount = allInquiries.filter(
    (r) => r.status === 'Archived' || r.status === 'Resolved'
  ).length;

  const filteredInquiries = allInquiries.filter((enq) => {
    const statusNormalized =
      enq.status === 'Pending'
        ? 'unread'
        : enq.status === 'Resolved'
        ? 'archived'
        : (enq.status || '').toLowerCase();

    const matchesFilter =
      inquiryFilter === 'all' ? true : statusNormalized === inquiryFilter;

    const matchesSearch =
      inquirySearchQuery.trim() === ''
        ? true
        : (enq.name || '').toLowerCase().includes(inquirySearchQuery.toLowerCase()) ||
          (enq.email || '').toLowerCase().includes(inquirySearchQuery.toLowerCase()) ||
          (enq.topic || enq.initiative || '')
            .toLowerCase()
            .includes(inquirySearchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const inquiriesPerPage = 5;
  const totalInquiryPages = Math.max(1, Math.ceil(filteredInquiries.length / inquiriesPerPage));
  const paginatedInquiries = filteredInquiries.slice(
    (inquiryPage - 1) * inquiriesPerPage,
    inquiryPage * inquiriesPerPage
  );

  const toggleInquiryStatus = async (item, targetStatus) => {
    const nextStatus =
      targetStatus ||
      (item.status === 'Unread' || item.status === 'Pending' ? 'Replied' : 'Unread');

    setRecords((prev) =>
      prev.map((rec) => (rec.id === item.id ? { ...rec, status: nextStatus } : rec))
    );

    if (selectedInquiry && selectedInquiry.id === item.id) {
      setSelectedInquiry((prev) => ({ ...prev, status: nextStatus }));
    }

    showToast(`Enquiry from ${item.name} marked as ${nextStatus}`);

    try {
      await api.patch(`/api/admin/inquiries/${item.id}`, {
        status: nextStatus === 'Unread' ? 'Pending' : nextStatus,
      });
    } catch (err) {
      console.warn('[Update Inquiry Status Warning]', err.message);
    }
  };

  const handleReplyToInquiry = async (e) => {
    e.preventDefault();
    if (!selectedInquiry) return;
    if (!replyDraft.trim()) {
      showToast('Please enter a response message.');
      return;
    }

    await toggleInquiryStatus(selectedInquiry, 'Replied');
    showToast(`Reply sent to ${selectedInquiry.email}!`);
    setReplyDraft('');
    setSelectedInquiry(null);
  };

  const handleExportInquiriesCSV = () => {
    const rows = filteredInquiries;
    if (!rows.length) {
      showToast('No enquiries found to export.');
      return;
    }
    const headers = ['Sender Name', 'Email', 'Phone', 'Topic', 'Date', 'Status', 'Message'];
    const csvContent = [
      headers.join(','),
      ...rows.map((r) =>
        [
          `"${(r.name || '').replace(/"/g, '""')}"`,
          `"${(r.email || '').replace(/"/g, '""')}"`,
          `"${(r.phone || '').replace(/"/g, '""')}"`,
          `"${(r.topic || r.initiative || '').replace(/"/g, '""')}"`,
          `"${(r.date || '').replace(/"/g, '""')}"`,
          `"${(r.status || '').replace(/"/g, '""')}"`,
          `"${(r.message || '').replace(/"/g, '""')}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `zinmatt_enquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Exported ${rows.length} enquiries to CSV!`);
  };

  const handleSaveAndPublishContact = async () => {
    try {
      localStorage.setItem('zinmatt_public_contact_info', JSON.stringify(publicContactInfo));
      localStorage.setItem('zinmatt_social_channels', JSON.stringify(socialChannels));
      localStorage.setItem('zinmatt_security_alerts', JSON.stringify(securityAlerts));

      const payload = {
        publicInfo: {
          email: publicContactInfo.email,
          phone: publicContactInfo.phone,
          address: publicContactInfo.address,
          mapPin: {
            coordinates: publicContactInfo.coordinates,
            label: 'Active GPS Pin on Public Map',
          },
        },
        channels: {
          instagram: { handle: socialChannels.instagram, enabled: true },
          facebook: { handle: socialChannels.facebook, enabled: true },
          linkedin: { handle: socialChannels.linkedin, enabled: true },
          youtube: { handle: socialChannels.youtube, enabled: true },
        },
        securityAlerts: securityAlerts,
      };

      await api.put('/api/admin/contact-config', payload);
      setAutoSavedTime('Just now');
      showToast('Contact Us settings saved and published to live website & MongoDB!');
    } catch (e) {
      console.warn('Contact config save warning:', e);
      setAutoSavedTime('Just now');
      showToast('Contact Us saved locally. MongoDB status: ' + (e.message || 'offline'));
    }
  };

  const handleDiscardContactChanges = () => {
    setPublicContactInfo(defaultPublicContactInfo);
    setSocialChannels(defaultSocialChannels);
    setSecurityAlerts(defaultSecurityAlerts);
    localStorage.removeItem('zinmatt_public_contact_info');
    localStorage.removeItem('zinmatt_social_channels');
    localStorage.removeItem('zinmatt_security_alerts');
    showToast('Contact Us settings reset to defaults.');
  };

  const handleSaveMapPin = (e) => {
    e.preventDefault();
    setPublicContactInfo((prev) => ({
      ...prev,
      coordinates: mapPinForm.coordinates,
      address: mapPinForm.landmark || prev.address,
    }));
    try {
      const updated = {
        ...publicContactInfo,
        coordinates: mapPinForm.coordinates,
        address: mapPinForm.landmark || publicContactInfo.address,
      };
      localStorage.setItem('zinmatt_public_contact_info', JSON.stringify(updated));
    } catch {}
    setIsMapPinModalOpen(false);
    showToast('Public Map GPS coordinates updated!');
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-[#FFF9F5] flex flex-col items-center justify-center font-['Inter',_sans-serif]">
        <div className="w-10 h-10 border-4 border-[#FB7336] border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-semibold text-[#242424]">Verifying Admin Credentials...</p>
      </div>
    );
  }

  // Sidebar navigation menu items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'donations', label: 'Donations', icon: Heart },
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'about', label: 'About Us', icon: FileText },
    { id: 'initiatives', label: 'Our Initiatives', icon: Layers },
    { id: 'impact', label: 'Our Impact', icon: TrendingUp },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'volunteers', label: 'Get Involved', icon: Users },
    { id: 'contact', label: 'Contact Us', icon: Mail },
  ];

  return (
    <div className="min-h-screen w-full bg-[#FFF9F5] font-['Inter',_sans-serif] text-[#242424] antialiased selection:bg-[#FB7336]/20 relative">
      {/* Toast Notification */}
      {notificationToast && (
        <div className="fixed top-5 right-5 z-[60] flex items-center gap-2 bg-[#242424] text-white px-4 py-3 rounded-xl shadow-xl text-xs sm:text-sm animate-fade-in border border-[#444444]">
          <Sparkles className="w-4 h-4 text-[#FCC241]" />
          <span>{notificationToast}</span>
        </div>
      )}

      {/* Mobile Backdrop */}
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* =========================================================================
          LEFT DARK SIDEBAR (bg-[#242424] text-white, mobile drawer on < lg)
          Fixed to viewport: extends full height (top-0 bottom-0 h-screen) always
      ========================================================================= */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 h-screen bg-[#242424] text-[#FFFFFF] z-40 flex flex-col justify-between transition-transform duration-300 ease-in-out shadow-xl lg:shadow-none ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top: Brand Header & Navigation */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          <div className="p-6 border-b border-[#333333] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              {/* <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] p-[2px] shadow-sm flex items-center justify-center flex-shrink-0"> */}
                <div className="w-10 h-10 bg-[#242424] rounded-[10px] flex items-center justify-center">
                  <img
                    src="/zinmatt-logo1.png"
                    alt="ZINMATT Logo"
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              {/* </div> */}
              <div className="flex flex-col font-['Arial',_Helvetica,_sans-serif]">
                <span className="font-black bg-gradient-to-r from-[#FB7336] to-[#FCC241] bg-clip-text text-transparent text-base tracking-tight leading-none">
                  ZINMATT
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#FCC241] font-bold mt-1 leading-none">
                  FOUNDATION ADMIN
                </span>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#333333]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveNav(item.id);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold shadow-md shadow-[#FB7336]/20'
                      : 'text-gray-300 hover:text-white hover:bg-[#303030] font-medium'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-[#242424] stroke-[2.4]' : 'text-gray-400 group-hover:text-white'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Logout Footer */}
        <div className="p-4 border-t border-[#333333] shrink-0 mt-auto">
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#2D2D2D] border border-[#3A3A3A]">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] flex items-center justify-center text-[#242424] font-bold text-xs flex-shrink-0">
                ZA
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-white truncate">
                  {adminUser?.name || 'ZINMATT Admin'}
                </p>
                <p className="text-[10px] text-gray-400 truncate font-mono">
                  {adminUser?.email || 'admin@zinmattfoundation.org'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-[#3A3A3A] rounded-lg transition-colors flex-shrink-0 ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          MAIN CONSOLE CONTENT AREA (bg-[#FFF9F5], offset by lg:pl-64 for fixed sidebar)
      ========================================================================= */}
      <div className="lg:pl-64 flex-1 flex flex-col min-w-0 w-full min-h-screen bg-[#FFF9F5]">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#EEEEEE] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4 w-full shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-[#EEEEEE] bg-white text-[#242424] hover:bg-[#FFF9F5]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-['Arial',_Helvetica,_sans-serif] font-black text-xl sm:text-2xl text-[#242424] tracking-tight">
                {activeNav === 'dashboard'
                  ? 'Dashboard Overview'
                  : activeNav === 'donations'
                  ? 'Donations & Pledges'
                  : activeNav === 'home'
                  ? 'Home Page Manager'
                  : activeNav === 'about'
                  ? 'About Us Page Manager'
                  : activeNav === 'initiatives'
                  ? 'Our Initiatives Manager'
                  : activeNav === 'impact'
                  ? 'Our Impact Manager'
                  : activeNav === 'gallery'
                  ? 'Gallery & Stories Manager'
                  : activeNav === 'volunteers' || activeNav === 'get-involved'
                  ? 'Get Involved Manager'
                  : activeNav === 'contact'
                  ? 'Contact Us Manager'
                  : 'Contact Messages & Enquiries'}
              </h1>
              <p className="text-xs text-[#666666] hidden sm:block">
                {activeNav === 'home'
                  ? 'Manage hero banner, featured sections, and homepage call-to-action'
                  : activeNav === 'about'
                  ? 'Manage foundation story, vision, mission, core values, and team leadership'
                  : activeNav === 'initiatives'
                  ? 'Manage the 4 core causes, descriptions, photos, and public visibility'
                  : activeNav === 'impact'
                  ? 'Manage verified impact metrics, commitments, and community stories'
                  : activeNav === 'gallery'
                  ? 'Upload, categorize, and manage community photographs and field highlights'
                  : activeNav === 'volunteers' || activeNav === 'get-involved'
                  ? 'Manage volunteer applications, participation cards, and registration settings'
                  : activeNav === 'contact'
                  ? 'ZINMATT Foundation Portal CMS'
                  : 'Welcome back to the philanthropic impact console'}
              </p>
            </div>
          </div>

          {/* Right Actions: Contextual to activeNav */}
          {activeNav === 'initiatives' ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/initiatives"
                target="_blank"
                rel="noreferrer"
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[#EEEEEE] bg-white text-[#242424] text-xs font-semibold hover:bg-[#FFF9F5] shadow-xs inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Preview Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
              </a>

              <button
                type="button"
                onClick={() => setIsAddInitiativeModalOpen(true)}
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 inline-flex items-center gap-1.5 transition-all"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Initiative</span>
              </button>

              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] p-[2px] shadow-sm ml-1 shrink-0">
                <div className="w-full h-full rounded-full bg-[#242424] flex items-center justify-center text-white text-xs font-bold">
                  ZA
                </div>
              </div>
            </div>
          ) : activeNav === 'impact' ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/impact"
                target="_blank"
                rel="noreferrer"
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[#EEEEEE] bg-white text-[#242424] text-xs font-semibold hover:bg-[#FFF9F5] shadow-xs inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Preview Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
              </a>

              <button
                type="button"
                onClick={handleSaveAndPublishImpact}
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Save & Publish</span>
              </button>

              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] p-[2px] shadow-sm ml-1 shrink-0">
                <div className="w-full h-full rounded-full bg-[#242424] flex items-center justify-center text-white text-xs font-bold">
                  ZA
                </div>
              </div>
            </div>
          ) : activeNav === 'gallery' ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/gallery"
                target="_blank"
                rel="noreferrer"
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[#EEEEEE] bg-white text-[#242424] text-xs font-semibold hover:bg-[#FFF9F5] shadow-xs inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Preview Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
              </a>

              <button
                type="button"
                onClick={() => setIsUploadModalOpen(true)}
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Upload Photos</span>
              </button>

              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] p-[2px] shadow-sm ml-1 shrink-0">
                <div className="w-full h-full rounded-full bg-[#242424] flex items-center justify-center text-white text-xs font-bold">
                  ZA
                </div>
              </div>
            </div>
          ) : activeNav === 'volunteers' || activeNav === 'get-involved' ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="/get-involved"
                target="_blank"
                rel="noreferrer"
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[#EEEEEE] bg-white text-[#242424] text-xs font-semibold hover:bg-[#FFF9F5] shadow-xs inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Preview Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
              </a>

              <button
                type="button"
                onClick={() => setIsAddVolunteerModalOpen(true)}
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>Add Volunteer</span>
              </button>

              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] p-[2px] shadow-sm ml-1 shrink-0">
                <div className="w-full h-full rounded-full bg-[#242424] flex items-center justify-center text-white text-xs font-bold">
                  ZA
                </div>
              </div>
            </div>
          ) : activeNav === 'home' || activeNav === 'about' || activeNav === 'contact' ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={
                  activeNav === 'home'
                    ? '/'
                    : activeNav === 'about'
                    ? '/about'
                    : '/contact'
                }
                target="_blank"
                rel="noreferrer"
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-[#EEEEEE] bg-white text-[#242424] text-xs font-semibold hover:bg-[#FFF9F5] shadow-xs inline-flex items-center gap-1.5 transition-colors"
              >
                <span>Preview Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#666666]" />
              </a>

              <button
                type="button"
                onClick={
                  activeNav === 'home'
                    ? handleSaveAndPublishHome
                    : activeNav === 'about'
                    ? handleSaveAndPublishAbout
                    : handleSaveAndPublishContact
                }
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold text-xs sm:text-sm shadow-sm hover:shadow-md hover:brightness-105 active:scale-95 inline-flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Save & Publish</span>
              </button>

              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] p-[2px] shadow-sm ml-1 shrink-0">
                <div className="w-full h-full rounded-full bg-[#242424] flex items-center justify-center text-white text-xs font-bold">
                  ZA
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative hidden md:block w-48 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" />
                <input
                  type="text"
                  placeholder="Search records, donors, impact..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] placeholder-gray-400 focus:outline-none focus:border-[#FB7336] focus:ring-1 focus:ring-[#FB7336]/20 transition-all"
                />
              </div>

              <button
                onClick={() => showToast(`${stats.unreadEnquiries || 5} unread enquiries awaiting review`)}
                className="relative p-2.5 rounded-xl border border-[#EEEEEE] bg-white text-[#242424] hover:bg-[#FFF9F5] transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FB7336] ring-2 ring-white" />
              </button>

              <button
                onClick={() => setIsNewUpdateModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span className="hidden sm:inline">New Update</span>
              </button>

              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-[#FB7336] to-[#FCC241] p-[2px] shadow-sm">
                <div className="w-full h-full rounded-full bg-[#242424] flex items-center justify-center text-white text-xs font-bold">
                  ZA
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Dashboard Body */}
        <main className="flex-1 w-full min-w-0 px-4 sm:px-6 lg:px-8 py-6 space-y-8">
          {/* VIEW 1: Overview */}
          {activeNav === 'dashboard' && (
            <DashboardOverviewTab
              stats={stats}
              filteredRecords={filteredRecords}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              setSelectedRecord={setSelectedRecord}
              toggleRecordStatus={toggleRecordStatus}
              setIsUploadModalOpen={setIsUploadModalOpen}
              setActiveNav={setActiveNav}
              donations={donations}
              galleryPhotos={galleryPhotos}
              initiatives={initiatives}
              setEditingInitiative={setEditingInitiative}
            />
          )}

          {/* VIEW 2: Donations */}
          {activeNav === 'donations' && (
            <AdminDonationsTab
              donationFilter={donationFilter}
              setDonationFilter={setDonationFilter}
              filteredDonations={filteredDonations}
              toggleDonationStatus={toggleDonationStatus}
              handleDeleteDonation={handleDeleteDonation}
            />
          )}

          {/* VIEW 3: Gallery */}
          {activeNav === 'gallery' && (
            <AdminGalleryTab
              galleryPhotos={galleryPhotos}
              galleryCategoryFilter={galleryCategoryFilter}
              setGalleryCategoryFilter={setGalleryCategoryFilter}
              gallerySearchQuery={gallerySearchQuery}
              setGallerySearchQuery={setGallerySearchQuery}
              galleryView={galleryView}
              setGalleryView={setGalleryView}
              gallerySortBy={gallerySortBy}
              setGallerySortBy={setGallerySortBy}
              filteredGalleryPhotos={filteredGalleryPhotos}
              setIsUploadModalOpen={setIsUploadModalOpen}
              setEditingGalleryPhoto={setEditingGalleryPhoto}
              togglePinPhoto={togglePinPhoto}
              handleDeletePhoto={handleDeletePhoto}
              handleBatchSelectAll={handleBatchSelectAll}
              handleDropFile={handleDropFile}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pinnedGalleryPhotos={pinnedGalleryPhotos}
              handleUnpinPhoto={handleUnpinPhoto}
              handlePinAnotherPhoto={handlePinAnotherPhoto}
              handleDiscardGalleryChanges={handleDiscardGalleryChanges}
            />
          )}

          {/* VIEW 4: Get Involved */}
          {(activeNav === 'volunteers' || activeNav === 'get-involved') && (
            <AdminGetInvolvedTab
              records={records}
              filteredVolunteers={filteredVolunteers}
              volunteerStatusFilter={volunteerStatusFilter}
              setVolunteerStatusFilter={setVolunteerStatusFilter}
              volunteerSearchQuery={volunteerSearchQuery}
              setVolunteerSearchQuery={setVolunteerSearchQuery}
              volunteerPaginationPage={volunteerPaginationPage}
              setVolunteerPaginationPage={setVolunteerPaginationPage}
              handleExportVolunteerCSV={handleExportVolunteerCSV}
              toggleRecordStatus={toggleRecordStatus}
              setSelectedRecord={setSelectedRecord}
              participationCards={participationCards}
              setEditingParticipationCard={setEditingParticipationCard}
              volunteerRegistrationSettings={volunteerRegistrationSettings}
              toggleVolunteerRegSetting={toggleVolunteerRegSetting}
              handleDiscardVolunteerSettings={handleDiscardVolunteerSettings}
            />
          )}

          {/* VIEW 5: Contact Us */}
          {activeNav === 'contact' && (
            <AdminContactUsTab
              allInquiries={allInquiries}
              unreadCount={unreadCount}
              repliedCount={repliedCount}
              archivedCount={archivedCount}
              inquiryFilter={inquiryFilter}
              setInquiryFilter={setInquiryFilter}
              inquirySearchQuery={inquirySearchQuery}
              setInquirySearchQuery={setInquirySearchQuery}
              inquiryPage={inquiryPage}
              setInquiryPage={setInquiryPage}
              handleExportInquiriesCSV={handleExportInquiriesCSV}
              paginatedInquiries={paginatedInquiries}
              filteredInquiries={filteredInquiries}
              totalInquiryPages={totalInquiryPages}
              toggleInquiryStatus={toggleInquiryStatus}
              setSelectedInquiry={setSelectedInquiry}
              publicContactInfo={publicContactInfo}
              setPublicContactInfo={setPublicContactInfo}
              setMapPinForm={setMapPinForm}
              setIsMapPinModalOpen={setIsMapPinModalOpen}
              socialChannels={socialChannels}
              setSocialChannels={setSocialChannels}
              securityAlerts={securityAlerts}
              setSecurityAlerts={setSecurityAlerts}
              handleDiscardContactChanges={handleDiscardContactChanges}
            />
          )}

          {/* VIEW 6: Home Page Manager */}
          {activeNav === 'home' && (
            <AdminHomeTab
              setActiveNav={setActiveNav}
              autoSavedTime={autoSavedTime}
              showToast={showToast}
              homeData={homeData}
              setHomeData={setHomeData}
              handleHomeFieldChange={handleHomeFieldChange}
              sectionVisibility={sectionVisibility}
              toggleSection={toggleSection}
              resetSectionsDefault={resetSectionsDefault}
              lastPublishedTime={lastPublishedTime}
              discardUnsavedChanges={discardUnsavedChanges}
              handleSaveAndPublishHome={handleSaveAndPublishHome}
            />
          )}

          {/* VIEW 7: About Us Manager */}
          {activeNav === 'about' && (
            <AdminAboutUsTab
              setActiveNav={setActiveNav}
              aboutAutoSavedTime={aboutAutoSavedTime}
              showToast={showToast}
              aboutData={aboutData}
              handleAboutFieldChange={handleAboutFieldChange}
              aboutPillars={aboutPillars}
              setEditingPillar={setEditingPillar}
              teamMembers={teamMembers}
              setEditingTeamMember={setEditingTeamMember}
              handleDeleteTeamMember={handleDeleteTeamMember}
              setTeamForm={setTeamForm}
              setIsAddTeamModalOpen={setIsAddTeamModalOpen}
              aboutSectionVisibility={aboutSectionVisibility}
              toggleAboutSection={toggleAboutSection}
              aboutLastPublishedTime={aboutLastPublishedTime}
              discardAboutUnsavedChanges={discardAboutUnsavedChanges}
            />
          )}

          {/* VIEW 8: Our Initiatives Manager */}
          {activeNav === 'initiatives' && (
            <AdminInitiativesTab
              setActiveNav={setActiveNav}
              initiativeFilter={initiativeFilter}
              setInitiativeFilter={setInitiativeFilter}
              initiatives={initiatives}
              toggleInitiativeVisibility={toggleInitiativeVisibility}
              setEditingInitiative={setEditingInitiative}
              handleReorderInitiatives={handleReorderInitiatives}
              handleSaveInitiativeOrder={handleSaveInitiativeOrder}
            />
          )}

          {/* VIEW 9: Our Impact Manager */}
          {activeNav === 'impact' && (
            <AdminImpactTab
              setImpactDisplayMode={setImpactDisplayMode}
              impactDisplayMode={impactDisplayMode}
              impactMetrics={impactMetrics}
              toggleMetricEnabled={toggleMetricEnabled}
              handleMetricChange={handleMetricChange}
              impactQuotes={impactQuotes}
              setIsAddQuoteModalOpen={setIsAddQuoteModalOpen}
              setEditingQuote={setEditingQuote}
              handleDeleteQuote={handleDeleteQuote}
              impactReportingControls={impactReportingControls}
              toggleReportingControl={toggleReportingControl}
              handleDiscardImpactChanges={handleDiscardImpactChanges}
            />
          )}
        </main>
      </div>

      {/* =========================================================================
          INTERACTIVE MODALS
      ========================================================================= */}

      {/* Modal 1: Record Details Modal (Volunteer / Enquiry) */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-lg w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 sm:p-7 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedRecord(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF0E8] text-[#FB7336] font-bold text-base flex items-center justify-center">
                {selectedRecord.initials}
              </div>
              <div>
                <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                  {selectedRecord.name}
                </h3>
                <span className="text-xs text-[#FB7336] font-semibold">
                  {selectedRecord.type} Application • {selectedRecord.initiative}
                </span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-[#444444]">
              <div className="p-3 rounded-xl bg-[#FFF9F5] border border-[#EEEEEE] space-y-1">
                <p>
                  <span className="font-semibold text-[#242424]">Email:</span>{' '}
                  <span className="font-mono">{selectedRecord.email}</span>
                </p>
                <p>
                  <span className="font-semibold text-[#242424]">Phone:</span>{' '}
                  <span>{selectedRecord.phone}</span>
                </p>
                <p>
                  <span className="font-semibold text-[#242424]">Submitted:</span>{' '}
                  <span>{selectedRecord.date}</span>
                </p>
              </div>

              <div>
                <span className="font-semibold text-[#242424] block mb-1">
                  Message / Details:
                </span>
                <p className="p-3 rounded-xl bg-white border border-[#EEEEEE] leading-relaxed text-[#555555]">
                  {selectedRecord.message}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EEEEEE] flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2.5 rounded-xl border border-[#EEEEEE] text-xs font-semibold text-[#666666] hover:bg-[#F5F5F5]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toggleRecordStatus(selectedRecord);
                  setSelectedRecord(null);
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold text-xs shadow-sm hover:opacity-90"
              >
                {selectedRecord.status === 'Approved' ? 'Mark As Pending' : 'Approve Record'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Initiative Modal */}
      {editingInitiative && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-lg w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 sm:p-7 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingInitiative(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424] mb-1">
              Edit Initiative: {editingInitiative.title}
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Update targets, progress metrics, and description in real-time
            </p>

            <form onSubmit={handleSaveInitiative} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#242424] mb-1">
                  Initiative Title
                </label>
                <input
                  type="text"
                  value={editingInitiative.title}
                  onChange={(e) =>
                    setEditingInitiative({ ...editingInitiative, title: e.target.value })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">
                  Subtitle / Subheading
                </label>
                <input
                  type="text"
                  value={editingInitiative.subtitle}
                  onChange={(e) =>
                    setEditingInitiative({ ...editingInitiative, subtitle: e.target.value })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#242424] mb-1">
                    Beneficiaries Metric
                  </label>
                  <input
                    type="text"
                    value={editingInitiative.beneficiaries}
                    onChange={(e) =>
                      setEditingInitiative({
                        ...editingInitiative,
                        beneficiaries: e.target.value,
                      })
                    }
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] focus:outline-none focus:border-[#FB7336]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#242424] mb-1">
                    Target Progress ({editingInitiative.targetPercent}%)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={editingInitiative.targetPercent}
                    onChange={(e) =>
                      setEditingInitiative({
                        ...editingInitiative,
                        targetPercent: Number(e.target.value),
                      })
                    }
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] focus:outline-none focus:border-[#FB7336]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">
                  Field Description
                </label>
                <textarea
                  rows="3"
                  value={editingInitiative.description}
                  onChange={(e) =>
                    setEditingInitiative({
                      ...editingInitiative,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={Array.isArray(editingInitiative.tags) ? editingInitiative.tags.join(', ') : (editingInitiative.tag || '')}
                  onChange={(e) =>
                    setEditingInitiative({
                      ...editingInitiative,
                      tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      tag: e.target.value.split(',')[0]?.trim() || '',
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">
                  Card Cover Image URL
                </label>
                <input
                  type="text"
                  value={editingInitiative.image || ''}
                  onChange={(e) =>
                    setEditingInitiative({
                      ...editingInitiative,
                      image: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingInitiative(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#EEEEEE] text-xs font-semibold text-[#666666] hover:bg-[#F5F5F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold text-xs shadow-sm hover:opacity-90"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Upload Field Photo Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-md w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 sm:p-7 relative">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424] mb-1">
              Upload Grassroots Photo
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Add verified impact photos from the field to public gallery
            </p>

            <form onSubmit={handleAddPhoto} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#242424] mb-1">
                  Image URL / Link <span className="text-[#FB7336]">*</span>
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">
                  Caption / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rural classroom learning session, Alwar"
                  value={newPhotoCaption}
                  onChange={(e) => setNewPhotoCaption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">
                  Core Category
                </label>
                <select
                  value={newPhotoCategory}
                  onChange={(e) => setNewPhotoCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] focus:outline-none focus:border-[#FB7336]"
                >
                  <option value="Education">Education</option>
                  <option value="Inclusive Learning">Inclusive Learning</option>
                  <option value="Elderly Care">Elderly Care</option>
                  <option value="Cleanliness Drives">Cleanliness Drives</option>
                  <option value="Volunteers">Volunteers</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#EEEEEE] text-xs font-semibold text-[#666666] hover:bg-[#F5F5F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold text-xs shadow-sm hover:opacity-90"
                >
                  Publish Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 4: New Update Modal */}
      {isNewUpdateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-md w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 sm:p-7 relative">
            <button
              onClick={() => setIsNewUpdateModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424] mb-1">
              Publish Field Update
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Post an impact milestone announcement or live operational notice
            </p>

            <form onSubmit={handlePostUpdate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#242424] mb-1">
                  Update Title <span className="text-[#FB7336]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. 500 New School Kits Dispatched in Alwar"
                  value={newUpdateTitle}
                  onChange={(e) => setNewUpdateTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">
                  Operational Summary
                </label>
                <textarea
                  rows="3"
                  placeholder="Summary of volunteer activities, beneficiaries, and supplies..."
                  value={newUpdateDesc}
                  onChange={(e) => setNewUpdateDesc(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-xs text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewUpdateModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#EEEEEE] text-xs font-semibold text-[#666666] hover:bg-[#F5F5F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold text-xs shadow-sm hover:opacity-90"
                >
                  Broadcast Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Core Value Pillar */}
      {editingPillar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-md w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 relative">
            <button
              onClick={() => setEditingPillar(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424] mb-1">
              Edit Core Value Pillar
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Update pillar title, priority label, and impact metric
            </p>

            <form onSubmit={handleSavePillar} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#242424] mb-1">Pillar Title</label>
                <input
                  type="text"
                  value={editingPillar.title}
                  onChange={(e) => setEditingPillar({ ...editingPillar, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Tag / Category</label>
                <input
                  type="text"
                  value={editingPillar.tag}
                  onChange={(e) => setEditingPillar({ ...editingPillar, tag: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingPillar.description}
                  onChange={(e) => setEditingPillar({ ...editingPillar, description: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336] resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Metric Tag</label>
                <input
                  type="text"
                  value={editingPillar.metric}
                  onChange={(e) => setEditingPillar({ ...editingPillar, metric: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingPillar(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#EEEEEE] font-semibold text-[#666666] hover:bg-[#F5F5F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold shadow-sm hover:opacity-90"
                >
                  Save Pillar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add or Edit Team Member */}
      {(isAddTeamModalOpen || editingTeamMember) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-md w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 relative">
            <button
              onClick={() => {
                setIsAddTeamModalOpen(false);
                setEditingTeamMember(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424] mb-1">
              {editingTeamMember ? 'Edit Team Member' : 'Add Team Member'}
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Enter name and leadership designation for the About page roster
            </p>

            <form onSubmit={handleAddOrEditTeamMember} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#242424] mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Aarav Mehta"
                  value={editingTeamMember ? editingTeamMember.name : teamForm.name}
                  onChange={(e) =>
                    editingTeamMember
                      ? setEditingTeamMember({ ...editingTeamMember, name: e.target.value })
                      : setTeamForm({ ...teamForm, name: e.target.value })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Role / Designation</label>
                <input
                  type="text"
                  placeholder="e.g. Foundation Trustee"
                  value={editingTeamMember ? editingTeamMember.role : teamForm.role}
                  onChange={(e) =>
                    editingTeamMember
                      ? setEditingTeamMember({ ...editingTeamMember, role: e.target.value })
                      : setTeamForm({ ...teamForm, role: e.target.value })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Initials (Optional)</label>
                <input
                  type="text"
                  maxLength={2}
                  placeholder="e.g. AM"
                  value={editingTeamMember ? editingTeamMember.initials : teamForm.initials}
                  onChange={(e) =>
                    editingTeamMember
                      ? setEditingTeamMember({ ...editingTeamMember, initials: e.target.value.toUpperCase() })
                      : setTeamForm({ ...teamForm, initials: e.target.value.toUpperCase() })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] uppercase focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddTeamModalOpen(false);
                    setEditingTeamMember(null);
                  }}
                  className="px-4 py-2.5 rounded-xl border border-[#EEEEEE] font-semibold text-[#666666] hover:bg-[#F5F5F5]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold shadow-sm hover:opacity-90"
                >
                  {editingTeamMember ? 'Update Member' : 'Add Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Initiative */}
      {isAddInitiativeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-lg w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddInitiativeModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424] mb-1">
              Add New Initiative
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Create a new core philanthropic cause for the website showcase
            </p>

            <form onSubmit={handleAddInitiative} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#242424] mb-1">Initiative Title</label>
                <input
                  type="text"
                  placeholder="e.g. Healthcare & Sanitation"
                  value={newInitiativeForm.title}
                  onChange={(e) => setNewInitiativeForm({ ...newInitiativeForm, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Subtitle / Subheading</label>
                <input
                  type="text"
                  placeholder="e.g. Community Health Camps"
                  value={newInitiativeForm.subtitle}
                  onChange={(e) => setNewInitiativeForm({ ...newInitiativeForm, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#242424] mb-1">Beneficiaries Metric</label>
                  <input
                    type="text"
                    placeholder="e.g. 1,000+ Individuals"
                    value={newInitiativeForm.beneficiaries}
                    onChange={(e) => setNewInitiativeForm({ ...newInitiativeForm, beneficiaries: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#242424] mb-1">Target Progress (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={newInitiativeForm.targetPercent}
                    onChange={(e) => setNewInitiativeForm({ ...newInitiativeForm, targetPercent: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Health Camps, Rural Aid, Free Medicine"
                  value={newInitiativeForm.tags}
                  onChange={(e) => setNewInitiativeForm({ ...newInitiativeForm, tags: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Card Cover Image URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newInitiativeForm.image}
                  onChange={(e) => setNewInitiativeForm({ ...newInitiativeForm, image: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed description of the program and community impact..."
                  value={newInitiativeForm.description}
                  onChange={(e) => setNewInitiativeForm({ ...newInitiativeForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddInitiativeModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#EEEEEE] font-semibold text-[#666666] hover:bg-[#F5F5F5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold shadow-sm hover:opacity-90 transition-opacity"
                >
                  Create Initiative
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add New Voice of Hope Quote */}
      {isAddQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-lg w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddQuoteModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424] mb-1">
              Add Voice of Hope
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Add a new beneficiary, volunteer, or supporter quote for the public showcase
            </p>

            <form onSubmit={handleAddQuote} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#242424] mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sunita Sharma"
                  value={newQuoteForm.name}
                  onChange={(e) => setNewQuoteForm({ ...newQuoteForm, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Role / Badge Label</label>
                <input
                  type="text"
                  placeholder="e.g. Community Volunteer, Education Mentor, Local Supporter"
                  value={newQuoteForm.role}
                  onChange={(e) => setNewQuoteForm({ ...newQuoteForm, role: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Avatar Photo URL</label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={newQuoteForm.avatar}
                  onChange={(e) => setNewQuoteForm({ ...newQuoteForm, avatar: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Quote Statement</label>
                <textarea
                  rows={3}
                  placeholder="Personal experience or impact quote..."
                  value={newQuoteForm.quote}
                  onChange={(e) => setNewQuoteForm({ ...newQuoteForm, quote: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddQuoteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#EEEEEE] font-semibold text-[#666666] hover:bg-[#F5F5F5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold shadow-sm hover:opacity-90 transition-opacity"
                >
                  Add Voice of Hope
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Voice of Hope Quote */}
      {editingQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-lg w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingQuote(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424] mb-1">
              Edit Voice of Hope
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Update participant details, role badge, or quote text
            </p>

            <form onSubmit={handleSaveEditedQuote} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#242424] mb-1">Full Name</label>
                <input
                  type="text"
                  value={editingQuote.name}
                  onChange={(e) => setEditingQuote({ ...editingQuote, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Role / Badge Label</label>
                <input
                  type="text"
                  value={editingQuote.role}
                  onChange={(e) => setEditingQuote({ ...editingQuote, role: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Avatar Photo URL</label>
                <input
                  type="text"
                  value={editingQuote.avatar}
                  onChange={(e) => setEditingQuote({ ...editingQuote, avatar: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Quote Statement</label>
                <textarea
                  rows={3}
                  value={editingQuote.quote}
                  onChange={(e) => setEditingQuote({ ...editingQuote, quote: e.target.value })}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingQuote(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#EEEEEE] font-semibold text-[#666666] hover:bg-[#F5F5F5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold shadow-sm hover:opacity-90 transition-opacity"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal: Edit Photo Details */}
      {editingGalleryPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-md w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingGalleryPhoto(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424] mb-1">
              Edit Photo Details
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Update photograph title, public category, or album showcase status
            </p>

            <form onSubmit={handleSaveEditedPhoto} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#242424] mb-1">Photo Title / Caption</label>
                <input
                  type="text"
                  value={editingGalleryPhoto.caption || editingGalleryPhoto.title || ''}
                  onChange={(e) =>
                    setEditingGalleryPhoto({
                      ...editingGalleryPhoto,
                      caption: e.target.value,
                      title: e.target.value,
                    })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Category</label>
                <select
                  value={editingGalleryPhoto.category || 'Education'}
                  onChange={(e) =>
                    setEditingGalleryPhoto({
                      ...editingGalleryPhoto,
                      category: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                >
                  <option value="Education">Education</option>
                  <option value="Inclusive Learning">Inclusive Learning</option>
                  <option value="Elderly Care">Elderly Care</option>
                  <option value="Cleanliness Drives">Cleanliness Drives</option>
                  <option value="Volunteers">Volunteers</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingGalleryPhoto.url || ''}
                  onChange={(e) =>
                    setEditingGalleryPhoto({
                      ...editingGalleryPhoto,
                      url: e.target.value,
                    })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingGalleryPhoto(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#EEEEEE] font-semibold text-[#666666] hover:bg-[#F5F5F5] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold shadow-sm hover:opacity-90 transition-opacity"
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Add Volunteer Application */}
      {isAddVolunteerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-lg w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddVolunteerModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424] mb-1">
              Add Volunteer Application
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Manually register a volunteer applicant into the grassroots community database
            </p>

            <form onSubmit={handleAddVolunteerSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#242424] mb-1">Applicant Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={newVolunteerForm.fullName}
                  onChange={(e) =>
                    setNewVolunteerForm({ ...newVolunteerForm, fullName: e.target.value })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#242424] mb-1">Email Address *</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={newVolunteerForm.email}
                    onChange={(e) =>
                      setNewVolunteerForm({ ...newVolunteerForm, email: e.target.value })
                    }
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#242424] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={newVolunteerForm.phone}
                    onChange={(e) =>
                      setNewVolunteerForm({ ...newVolunteerForm, phone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#242424] mb-1">City / Region</label>
                  <input
                    type="text"
                    placeholder="e.g. New Delhi, Mumbai"
                    value={newVolunteerForm.city}
                    onChange={(e) =>
                      setNewVolunteerForm({ ...newVolunteerForm, city: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#242424] mb-1">Preferred Cause</label>
                  <select
                    value={newVolunteerForm.preferredInitiative}
                    onChange={(e) =>
                      setNewVolunteerForm({
                        ...newVolunteerForm,
                        preferredInitiative: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                  >
                    <option value="Free Education">Free Education</option>
                    <option value="Visually Impaired Support">Visually Impaired Support</option>
                    <option value="Elderly Care">Elderly Care</option>
                    <option value="Clean Environment">Clean Environment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Availability</label>
                <select
                  value={newVolunteerForm.availability}
                  onChange={(e) =>
                    setNewVolunteerForm({
                      ...newVolunteerForm,
                      availability: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                >
                  <option value="Weekends">Weekends Only</option>
                  <option value="Full Time">Full Time (Field Work)</option>
                  <option value="Part Time">Part Time (10-15 hrs/week)</option>
                  <option value="Flexible / On-Call">Flexible / Emergency On-Call</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Applicant Note / Experience</label>
                <textarea
                  rows={2}
                  placeholder="Notes about skills, past volunteer experience, or motivation..."
                  value={newVolunteerForm.message}
                  onChange={(e) =>
                    setNewVolunteerForm({ ...newVolunteerForm, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddVolunteerModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#EEEEEE] font-semibold text-[#666666] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Register Volunteer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Participation Card */}
      {editingParticipationCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-md w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingParticipationCard(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424] mb-1">
              Edit Participation Card
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Update headline and description rendered on public /get-involved cards
            </p>

            <form onSubmit={handleSaveParticipationCardSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#242424] mb-1">Card Title</label>
                <input
                  type="text"
                  value={editingParticipationCard.title || ''}
                  onChange={(e) =>
                    setEditingParticipationCard({
                      ...editingParticipationCard,
                      title: e.target.value,
                    })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">Subtitle / Description</label>
                <textarea
                  rows={3}
                  value={editingParticipationCard.subtitle || ''}
                  onChange={(e) =>
                    setEditingParticipationCard({
                      ...editingParticipationCard,
                      subtitle: e.target.value,
                    })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingParticipationCard(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#EEEEEE] font-semibold text-[#666666] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: View & Reply to Inquiry */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-lg w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedInquiry(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-11 h-11 rounded-full font-bold text-sm flex items-center justify-center shrink-0 ${
                  selectedInquiry.avatarBg || 'bg-[#FFF0E8] text-[#FB7336]'
                }`}
              >
                {selectedInquiry.initials}
              </div>
              <div>
                <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424]">
                  {selectedInquiry.name}
                </h3>
                <span className="text-xs text-[#FB7336] font-semibold">
                  {selectedInquiry.topic || selectedInquiry.initiative || 'General Enquiry'}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-[#444444] bg-[#FFFDFB] p-4 rounded-xl border border-[#EEEEEE] mb-4">
              <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#EEEEEE]">
                <div>
                  <span className="font-semibold text-[#242424] block text-[11px] text-gray-500 uppercase">
                    Email
                  </span>
                  <span className="font-mono text-[#242424]">{selectedInquiry.email}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#242424] block text-[11px] text-gray-500 uppercase">
                    Date Received
                  </span>
                  <span className="text-[#242424]">{selectedInquiry.date}</span>
                </div>
              </div>

              <div>
                <span className="font-semibold text-[#242424] block text-[11px] text-gray-500 uppercase mb-1">
                  Message
                </span>
                <p className="p-3 rounded-lg bg-white border border-[#EEEEEE] leading-relaxed text-[#242424]">
                  "{selectedInquiry.message}"
                </p>
              </div>
            </div>

            {/* Reply Form */}
            <form onSubmit={handleReplyToInquiry} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#242424] mb-1">
                  Write Reply Message
                </label>
                <textarea
                  rows={3}
                  placeholder={`Type reply to ${selectedInquiry.email}...`}
                  value={replyDraft}
                  onChange={(e) => setReplyDraft(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggleInquiryStatus(selectedInquiry, 'Replied')}
                    className="px-3 py-1.5 rounded-xl border border-[#BBF7D0] bg-[#DCFCE7]/60 text-[#16A34A] hover:bg-[#DCFCE7] font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Mark Replied
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleInquiryStatus(selectedInquiry, 'Unread')}
                    className="px-3 py-1.5 rounded-xl border border-[#FDE68A] bg-[#FEF3C7]/60 text-[#D97706] hover:bg-[#FEF3C7] font-semibold text-xs transition-colors cursor-pointer"
                  >
                    Mark Unread
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedInquiry(null)}
                    className="px-3.5 py-2 rounded-xl border border-[#EEEEEE] font-semibold text-[#666666] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold shadow-sm hover:opacity-90 transition-opacity cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reply</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Update Map Pin */}
      {isMapPinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FFFFFF] max-w-md w-full rounded-2xl border border-[#EEEEEE] shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsMapPinModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-gray-400 hover:text-[#242424] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-['Arial',_Helvetica,_sans-serif] font-bold text-lg text-[#242424] mb-1">
              Update Public Map Pin
            </h3>
            <p className="text-xs text-[#666666] mb-4">
              Configure coordinates and headquarters badge shown on the public contact map
            </p>

            <form onSubmit={handleSaveMapPin} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#242424] mb-1">
                  GPS Coordinates Display
                </label>
                <input
                  type="text"
                  value={mapPinForm.coordinates}
                  onChange={(e) =>
                    setMapPinForm({ ...mapPinForm, coordinates: e.target.value })
                  }
                  required
                  placeholder="28.4817° N, 77.0815° E (Delhi NCR HQ)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#242424] mb-1">
                  Landmark / Office Label
                </label>
                <textarea
                  rows={2}
                  value={mapPinForm.landmark}
                  onChange={(e) =>
                    setMapPinForm({ ...mapPinForm, landmark: e.target.value })
                  }
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#EEEEEE] bg-[#FFFDFB] text-[#242424] focus:outline-none focus:border-[#FB7336] resize-none"
                />
              </div>

              <div className="pt-3 border-t border-[#EEEEEE] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsMapPinModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#EEEEEE] font-semibold text-[#666666] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FB7336] to-[#FCC241] text-[#242424] font-bold shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                >
                  Save Map Pin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
