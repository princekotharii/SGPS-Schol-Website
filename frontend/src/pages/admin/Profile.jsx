import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '@context/AuthContext';
import Button from '@components/shared/Button';
import { authAPI } from '@api/endpoints';
import { validateRequired, validateEmail, validatePassword } from '@utils/validators';
import { FaUser, FaEnvelope, FaLock, FaSave } from 'react-icons/fa';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    username: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Profile - Admin Panel';
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        username: user.username || '',
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateProfile = () => {
    const newErrors = {};

    const nameError = validateRequired(profileData.name, 'Name');
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(profileData.email);
    if (emailError) newErrors.email = emailError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    const currentError = validateRequired(passwordData.currentPassword, 'Current Password');
    if (currentError) newErrors.currentPassword = currentError;

    const newError = validatePassword(passwordData.newPassword);
    if (newError) newErrors.newPassword = newError;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    if (!validateProfile()) return;

    setSubmitting(true);

    try {
      const response = await authAPI.updateProfile(profileData);
      updateUser(response.data.user);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!validatePasswordForm()) return;

    setSubmitting(true);

    try {
      await authAPI.updateProfile({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      toast.success('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <h1>Profile Settings</h1>
        <p>Manage your account information and security</p>
      </div>

      <div className={styles.content}>
        {/* Profile Information */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaUser className={styles.sectionIcon} />
            <h2>Profile Information</h2>
          </div>

          <form onSubmit={handleProfileSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={profileData.username}
                disabled
                className={styles.disabled}
              />
              <small>Username cannot be changed</small>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                className={errors.name ? styles.error : ''}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <span className={styles.errorText}>{errors.name}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                className={errors.email ? styles.error : ''}
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>

            <Button
              type="submit"
              loading={submitting}
              icon={<FaSave />}
            >
              Save Changes
            </Button>
          </form>
        </div>

        {/* Change Password */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <FaLock className={styles.sectionIcon} />
            <h2>Change Password</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="currentPassword">Current Password *</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className={errors.currentPassword ? styles.error : ''}
                placeholder="Enter current password"
              />
              {errors.currentPassword && (
                <span className={styles.errorText}>{errors.currentPassword}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="newPassword">New Password *</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className={errors.newPassword ? styles.error : ''}
                placeholder="Enter new password"
              />
              {errors.newPassword && (
                <span className={styles.errorText}>{errors.newPassword}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirmPassword">Confirm New Password *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className={errors.confirmPassword ? styles.error : ''}
                placeholder="Confirm new password"
              />
              {errors.confirmPassword && (
                <span className={styles.errorText}>{errors.confirmPassword}</span>
              )}
            </div>

            <Button
              type="submit"
              loading={submitting}
              icon={<FaLock />}
            >
              Change Password
            </Button>
          </form>
        </div>

        {/* Account Info */}
        <div className={styles.infoCard}>
          <h3>Account Information</h3>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <label>Role:</label>
              <span className={styles.roleBadge}>
                {user?.role || 'Admin'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <label>Status:</label>
              <span className={styles.statusBadge}>
                {user?.status || 'Active'}
              </span>
            </div>
            <div className={styles.infoItem}>
              <label>Member Since:</label>
              <span>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;