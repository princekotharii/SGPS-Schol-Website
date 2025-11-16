import {
  PASSWORD_MIN_LENGTH,
  USERNAME_MIN_LENGTH,
  EMAIL_REGEX,
  PHONE_REGEX,
  MAX_FILE_SIZE,
  ALLOWED_IMAGE_TYPES,
} from './constants';

// Validate required field
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} is required`;
  }
  return '';
};

// Validate email
export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  if (!EMAIL_REGEX.test(email)) {
    return 'Please enter a valid email address';
  }
  return '';
};

// Validate phone number
export const validatePhone = (phone) => {
  if (!phone) {
    return 'Phone number is required';
  }
  if (!PHONE_REGEX.test(phone)) {
    return 'Please enter a valid 10-digit phone number';
  }
  return '';
};

// Validate password
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`;
  }
  return '';
};

// Validate confirm password
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  return '';
};

// Validate username
export const validateUsername = (username) => {
  if (!username) {
    return 'Username is required';
  }
  if (username.length < USERNAME_MIN_LENGTH) {
    return `Username must be at least ${USERNAME_MIN_LENGTH} characters long`;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username can only contain letters, numbers, and underscores';
  }
  return '';
};

// Validate age
export const validateAge = (age, minAge = 3, maxAge = 100) => {
  if (!age) {
    return 'Age is required';
  }
  const ageNum = parseInt(age);
  if (isNaN(ageNum)) {
    return 'Please enter a valid age';
  }
  if (ageNum < minAge || ageNum > maxAge) {
    return `Age must be between ${minAge} and ${maxAge}`;
  }
  return '';
};

// Validate date
export const validateDate = (date) => {
  if (!date) {
    return 'Date is required';
  }
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) {
    return 'Please enter a valid date';
  }
  return '';
};

// Validate future date
export const validateFutureDate = (date) => {
  const error = validateDate(date);
  if (error) return error;

  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (dateObj < today) {
    return 'Date must be in the future';
  }
  return '';
};

// Validate past date
export const validatePastDate = (date) => {
  const error = validateDate(date);
  if (error) return error;

  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (dateObj > today) {
    return 'Date must be in the past';
  }
  return '';
};

// Validate file
export const validateFile = (file) => {
  if (!file) {
    return 'Please select a file';
  }
  if (file.size > MAX_FILE_SIZE) {
    return `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB`;
  }
  return '';
};

// Validate image file
export const validateImage = (file) => {
  const error = validateFile(file);
  if (error) return error;

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Please select a valid image file (JPG, PNG, or WebP)';
  }
  return '';
};

// Validate URL
export const validateURL = (url) => {
  if (!url) {
    return 'URL is required';
  }
  try {
    new URL(url);
    return '';
  } catch {
    return 'Please enter a valid URL';
  }
};

// Validate number
export const validateNumber = (value, min, max) => {
  if (!value) {
    return 'This field is required';
  }
  const num = parseFloat(value);
  if (isNaN(num)) {
    return 'Please enter a valid number';
  }
  if (min !== undefined && num < min) {
    return `Value must be at least ${min}`;
  }
  if (max !== undefined && num > max) {
    return `Value must be at most ${max}`;
  }
  return '';
};

// Validate min length
export const validateMinLength = (value, minLength, fieldName = 'This field') => {
  if (!value) {
    return `${fieldName} is required`;
  }
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long`;
  }
  return '';
};

// Validate max length
export const validateMaxLength = (value, maxLength, fieldName = 'This field') => {
  if (value && value.length > maxLength) {
    return `${fieldName} must not exceed ${maxLength} characters`;
  }
  return '';
};

// Validate form
export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationRules).forEach((fieldName) => {
    const rules = validationRules[fieldName];
    const value = formData[fieldName];

    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        errors[fieldName] = error;
        isValid = false;
        break;
      }
    }
  });

  return { isValid, errors };
};

export default {
  validateRequired,
  validateEmail,
  validatePhone,
  validatePassword,
  validateConfirmPassword,
  validateUsername,
  validateAge,
  validateDate,
  validateFutureDate,
  validatePastDate,
  validateFile,
  validateImage,
  validateURL,
  validateNumber,
  validateMinLength,
  validateMaxLength,
  validateForm,
};
