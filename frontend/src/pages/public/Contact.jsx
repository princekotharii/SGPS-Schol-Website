import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import PageHeader from '@components/shared/PageHeader';
import Button from '@components/shared/Button';
import { contactAPI } from '@api/endpoints';
import { contactInfo, socialLinks } from '@data/socialLinks';
import { CONTACT_SUBJECTS } from '@utils/constants';
import { validateRequired, validateEmail, validatePhone } from '@utils/validators';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from 'react-icons/fa';
import styles from './Contact.module.css';

const iconMap = {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us - SGPS School';
  }, []);

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Contact' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    const nameError = validateRequired(formData.name, 'Name');
    if (nameError) newErrors.name = nameError;

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    const subjectError = validateRequired(formData.subject, 'Subject');
    if (subjectError) newErrors.subject = subjectError;

    const messageError = validateRequired(formData.message, 'Message');
    if (messageError) newErrors.message = messageError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      await contactAPI.create(formData);
      toast.success('Message sent successfully! We will contact you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.contact}>
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with us for any inquiries or information"
        breadcrumbs={breadcrumbs}
      />

      <div className="container">
        {/* Contact Info Cards */}
        <section className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <FaMapMarkerAlt />
            </div>
            <h3>Address</h3>
            <p>{contactInfo.address}</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <FaPhone />
            </div>
            <h3>Phone</h3>
            <p>
              <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <FaEnvelope />
            </div>
            <h3>Email</h3>
            <p>
              <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <FaClock />
            </div>
            <h3>Working Hours</h3>
            <p>{contactInfo.timings}</p>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className={styles.contactSection}>
          <div className={styles.formWrapper}>
            <h2>Send us a Message</h2>
            <p className={styles.formDescription}>
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? styles.error : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? styles.error : ''}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? styles.error : ''}
                    placeholder="9876543210"
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? styles.error : ''}
                >
                  <option value="">Select a subject</option>
                  {CONTACT_SUBJECTS.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
                {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? styles.error : ''}
                  rows="6"
                  placeholder="Write your message here..."
                ></textarea>
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>

              <Button type="submit" loading={loading} fullWidth size="large">
                Send Message
              </Button>
            </form>
          </div>

          <div className={styles.mapWrapper}>
            <h2>Find Us</h2>
            <div className={styles.map}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2434950788067!2d77.20902931508044!3d28.61394158242805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd371d9e2b6b%3A0xfc82b05e672df506!2sIndia%20Gate!5e0!3m2!1sen!2sin!4v1636112345678!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                allowFullScreen=""
                loading="lazy"
                title="School Location"
              ></iframe>
            </div>

            <div className={styles.socialSection}>
              <h3>Follow Us</h3>
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <a
                      key={social.id}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialIcon}
                      style={{ backgroundColor: social.color }}
                      aria-label={social.name}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;