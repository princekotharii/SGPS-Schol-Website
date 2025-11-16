// Application Constants

// API Base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Image Base URL
export const IMAGE_BASE_URL =
  import.meta.env.VITE_IMAGE_BASE_URL || 'http://localhost:5000/uploads';

// App Name
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'SGPS School';

// Pagination
export const ITEMS_PER_PAGE = 10;
export const MAX_PAGE_BUTTONS = 5;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword'];

// Form Validation
export const PASSWORD_MIN_LENGTH = 6;
export const USERNAME_MIN_LENGTH = 3;
export const PHONE_REGEX = /^[6-9]\d{9}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Date Formats
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATETIME_FORMAT = 'DD/MM/YYYY hh:mm A';
export const TIME_FORMAT = 'hh:mm A';

// Status Options
export const STATUS_OPTIONS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  STUDENT: 'student',
  PARENT: 'parent',
};

// Gallery Categories
export const GALLERY_CATEGORIES = [
  'Events',
  'Sports',
  'Cultural',
  'Academic',
  'Infrastructure',
  'Achievements',
  'Annual Day',
  'Others',
];

// Event Types
export const EVENT_TYPES = [
  'Academic',
  'Sports',
  'Cultural',
  'Holiday',
  'Meeting',
  'Workshop',
  'Seminar',
  'Competition',
  'Others',
];

// Admission Classes
export const ADMISSION_CLASSES = [
  'Nursery',
  'LKG',
  'UKG',
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
  'Class 11',
  'Class 12',
];

// Contact Subjects
export const CONTACT_SUBJECTS = [
  'General Inquiry',
  'Admission Information',
  'Academic Query',
  'Fee Related',
  'Complaint',
  'Suggestion',
  'Others',
];

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Login successful!',
  LOGOUT: 'Logout successful!',
  CREATE: 'Created successfully!',
  UPDATE: 'Updated successfully!',
  DELETE: 'Deleted successfully!',
  SUBMIT: 'Submitted successfully!',
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Invalid email address',
  INVALID_PHONE: 'Invalid phone number',
  INVALID_PASSWORD: `Password must be at least ${PASSWORD_MIN_LENGTH} characters`,
  PASSWORD_MISMATCH: 'Passwords do not match',
  FILE_TOO_LARGE: `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`,
  INVALID_FILE_TYPE: 'Invalid file type',
  SERVER_ERROR: 'Something went wrong. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action',
};

// Loading Messages
export const LOADING_MESSAGES = {
  LOADING: 'Loading...',
  SUBMITTING: 'Submitting...',
  UPLOADING: 'Uploading...',
  PROCESSING: 'Processing...',
  DELETING: 'Deleting...',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
};

export default {
  API_BASE_URL,
  IMAGE_BASE_URL,
  APP_NAME,
  ITEMS_PER_PAGE,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES,
  PASSWORD_MIN_LENGTH,
  PHONE_REGEX,
  EMAIL_REGEX,
  STATUS_OPTIONS,
  USER_ROLES,
  GALLERY_CATEGORIES,
  EVENT_TYPES,
  ADMISSION_CLASSES,
  CONTACT_SUBJECTS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  LOADING_MESSAGES,
  STORAGE_KEYS,
};
