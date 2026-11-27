import express from 'express';
import Donation from '../models/Donation.js';
import Volunteer from '../models/Volunteer.js';
import Inquiry from '../models/Inquiry.js';
import GalleryItem from '../models/GalleryItem.js';
import Initiative from '../models/Initiative.js';
import HomePageConfig from '../models/HomePageConfig.js';
import AboutPageConfig from '../models/AboutPageConfig.js';
import ImpactPageConfig from '../models/ImpactPageConfig.js';
import GetInvolvedConfig from '../models/GetInvolvedConfig.js';
import ContactPageConfig from '../models/ContactPageConfig.js';

const router = express.Router();

/**
 * Helper to generate unique reference ID in format ZNF-YYYYMMDD-XXXX
 */
const generateReferenceId = () => {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomDigits = Math.floor(1000 + Math.random() * 9000);
  return `ZNF-${dateStr}-${randomDigits}`;
};

// ============================================================================
// PUBLIC DONATIONS
// ============================================================================

/**
 * POST /api/donations
 * Accepts donor pledge, saves record with ZNF reference ID, returns receipt data
 */
router.post('/donations', async (req, res) => {
  try {
    const { fullName, email, phone, city, cityState, panNumber, cause, frequency, amount } = req.body;

    if (!fullName || !email || !phone || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, phone number, and donation amount are required.',
      });
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount < 1) {
      return res.status(400).json({
        success: false,
        message: 'Donation amount must be at least ₹1.',
      });
    }

    // Generate unique reference ID
    let referenceId = generateReferenceId();
    let collisionCheck = await Donation.findOne({ referenceId });
    while (collisionCheck) {
      referenceId = generateReferenceId();
      collisionCheck = await Donation.findOne({ referenceId });
    }

    const donation = await Donation.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city: (city || cityState || '').trim(),
      panNumber: (panNumber || '').trim().toUpperCase(),
      cause: cause || 'General Fund',
      frequency: frequency === 'monthly' ? 'monthly' : 'one-time',
      amount: numAmount,
      referenceId,
      status: 'pending',
    });

    return res.status(201).json({
      success: true,
      message: 'Donation registered successfully.',
      receipt: {
        id: donation._id,
        referenceId: donation.referenceId,
        fullName: donation.fullName,
        email: donation.email,
        phone: donation.phone,
        cause: donation.cause,
        frequency: donation.frequency,
        amount: donation.amount,
        panNumber: donation.panNumber,
        status: donation.status,
        createdAt: donation.createdAt,
      },
    });
  } catch (error) {
    console.error('[Public Donation Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to record donation.',
    });
  }
});

// ============================================================================
// PUBLIC VOLUNTEER REGISTRATION
// ============================================================================

/**
 * POST /api/volunteers
 */
router.post('/volunteers', async (req, res) => {
  try {
    const { fullName, email, phone, city, preferredInitiative, initiative, availability, message } =
      req.body;

    const chosenInitiative = preferredInitiative || initiative;

    if (!fullName || !email || !phone || !chosenInitiative) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, phone, and preferred initiative are required.',
      });
    }

    const volunteer = await Volunteer.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      city: (city || '').trim(),
      preferredInitiative: chosenInitiative.trim(),
      availability: (availability || 'Flexible / Weekends').trim(),
      message: (message || '').trim(),
      status: 'Pending',
    });

    return res.status(201).json({
      success: true,
      message: 'Volunteer application submitted successfully. Our team will review your application shortly.',
      volunteer,
    });
  } catch (error) {
    console.error('[Public Volunteer Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit volunteer application.',
    });
  }
});

// ============================================================================
// PUBLIC INQUIRIES
// ============================================================================

/**
 * POST /api/inquiries
 */
router.post('/inquiries', async (req, res) => {
  try {
    const { fullName, email, phone, topic, message } = req.body;

    if (!fullName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Full name, email, and inquiry message are required.',
      });
    }

    const inquiry = await Inquiry.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      topic: (topic || 'General Inquiry').trim(),
      message: message.trim(),
      status: 'Pending',
    });

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. Our team will contact you shortly.',
      inquiry,
    });
  } catch (error) {
    console.error('[Public Inquiry Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit inquiry.',
    });
  }
});

// ============================================================================
// PUBLIC GALLERY ITEMS
// ============================================================================

/**
 * GET /api/gallery
 */
router.get('/gallery', async (req, res) => {
  try {
    const items = await GalleryItem.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: items.length, items });
  } catch (error) {
    console.error('[Public Gallery Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch gallery items.',
    });
  }
});

// ============================================================================
// PUBLIC INITIATIVES
// ============================================================================

/**
 * GET /api/initiatives
 */
router.get('/initiatives', async (req, res) => {
  try {
    const initiatives = await Initiative.find().sort({ createdAt: 1 });
    return res.status(200).json({ success: true, count: initiatives.length, initiatives });
  } catch (error) {
    console.error('[Public Initiatives Error]', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch initiatives.',
    });
  }
});

// ============================================================================
// PUBLIC PAGE CONFIGURATION ENDPOINTS (Persisted in MongoDB)
// ============================================================================

/**
 * GET /api/home-config
 */
router.get('/home-config', async (req, res) => {
  try {
    let config = await HomePageConfig.findOne();
    if (!config) {
      config = await HomePageConfig.create({});
    }
    return res.status(200).json({ success: true, config });
  } catch (error) {
    console.error('[Public Home Config Error]', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/about-config
 */
router.get('/about-config', async (req, res) => {
  try {
    let config = await AboutPageConfig.findOne();
    if (!config) {
      config = await AboutPageConfig.create({});
    }
    return res.status(200).json({ success: true, config });
  } catch (error) {
    console.error('[Public About Config Error]', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/impact-config
 */
router.get('/impact-config', async (req, res) => {
  try {
    let config = await ImpactPageConfig.findOne();
    if (!config) {
      config = await ImpactPageConfig.create({});
    }
    return res.status(200).json({ success: true, config });
  } catch (error) {
    console.error('[Public Impact Config Error]', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/get-involved-config
 */
router.get('/get-involved-config', async (req, res) => {
  try {
    let config = await GetInvolvedConfig.findOne();
    if (!config) {
      config = await GetInvolvedConfig.create({});
    }
    return res.status(200).json({ success: true, config });
  } catch (error) {
    console.error('[Public Get Involved Config Error]', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/contact-config
 */
router.get('/contact-config', async (req, res) => {
  try {
    let config = await ContactPageConfig.findOne();
    if (!config) {
      config = await ContactPageConfig.create({});
    }
    return res.status(200).json({ success: true, config });
  } catch (error) {
    console.error('[Public Contact Config Error]', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
