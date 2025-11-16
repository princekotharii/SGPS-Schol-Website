import { Link } from 'react-router-dom';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
} from 'react-icons/fa';
import { socialLinks, contactInfo } from '@data/socialLinks';
import { publicNavLinks } from '@data/navLinks';
import styles from './Footer.module.css';

const iconMap = {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = publicNavLinks.slice(0, 5);

  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* About Section */}
          <div className={styles.footerSection}>
            <div className={styles.logoSection}>
              <div className={styles.logoIcon}>SGPS</div>
              <h3>SGPS School</h3>
            </div>
            <p className={styles.description}>
              Nurturing young minds since 1995. We are committed to providing
              quality education and holistic development for every student.
            </p>
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

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <Link to={link.path} className={styles.link}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Important</h4>
            <ul className={styles.linkList}>
              <li>
                <Link to="/admissions" className={styles.link}>
                  Admission Process
                </Link>
              </li>
              <li>
                <Link to="/academics" className={styles.link}>
                  Academic Calendar
                </Link>
              </li>
              <li>
                <Link to="/gallery" className={styles.link}>
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/events" className={styles.link}>
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.link}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.footerSection}>
            <h4 className={styles.sectionTitle}>Contact Us</h4>
            <ul className={styles.contactList}>
              <li>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <span>{contactInfo.address}</span>
              </li>
              <li>
                <FaPhone className={styles.contactIcon} />
                <a href={`tel:${contactInfo.phone}`}>{contactInfo.phone}</a>
              </li>
              <li>
                <FaEnvelope className={styles.contactIcon} />
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </li>
              <li>
                <FaClock className={styles.contactIcon} />
                <span>{contactInfo.timings}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} SGPS School. All rights reserved.
          </p>
          <p className={styles.madeWith}>
            Made with <FaHeart className={styles.heartIcon} /> by SGPS Tech Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
