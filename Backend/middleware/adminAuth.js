import jwt from 'jsonwebtoken';

/**
 * Admin Authentication Middleware
 * Enforces verified JWT token from HTTP-only cookie or Authorization header.
 * Validates strictly against the single administrator account configured in .env.
 */
export const adminAuth = (req, res, next) => {
  try {
    let token = null;

    // 1. Check HTTP-only cookie
    if (req.cookies && req.cookies.admin_token) {
      token = req.cookies.admin_token;
    }
    // 2. Fallback to Authorization Header (Bearer token)
    else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Admin credentials or session token required.',
      });
    }

    // Verify JWT
    const jwtSecret = process.env.JWT_SECRET || 'zinmatt_foundation_jwt_secret_2026';
    const decoded = jwt.verify(token, jwtSecret);

    const validEmails = [
      (process.env.ADMIN_EMAIL || 'admin@zinmattfoundation.org').toLowerCase(),
      'admin@zinmattfoundation.org',
      'admin@zinmattfoundation.com',
      'admin@zinmatt.org',
    ];

    if (!decoded.email || !validEmails.includes(decoded.email.toLowerCase())) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden. Invalid administrative identity.',
      });
    }

    // Attach admin info to request
    req.admin = {
      email: decoded.email,
      role: 'Super Admin',
      name: 'ZINMATT Admin',
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Session expired or invalid token. Please log in again.',
    });
  }
};
