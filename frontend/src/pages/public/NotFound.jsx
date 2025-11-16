import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '@components/shared/Button';
import { FaHome, FaSearch } from 'react-icons/fa';
import styles from './NotFound.module.css';

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found | SGPS School';
  }, []);

  return (
    <div className={styles.notFound}>
      <div className="container">
        <div className={styles.content}>
          {/* 404 Animation */}
          <div className={styles.errorCode}>
            <span className={styles.number}>4</span>
            <span className={styles.number}>0</span>
            <span className={styles.number}>4</span>
          </div>

          {/* Illustration */}
          <div className={styles.illustration}>
            <svg
              viewBox="0 0 200 200"
              className={styles.svg}
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="80" fill="#e0e7ff" />
              <circle cx="80" cy="90" r="10" fill="#1e40af" />
              <circle cx="120" cy="90" r="10" fill="#1e40af" />
              <path
                d="M70 120 Q100 110 130 120"
                stroke="#1e40af"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Text Content */}
          <div className={styles.textContent}>
            <h1 className={styles.title}>Oops! Page Not Found</h1>
            <p className={styles.description}>
              The page you're looking for seems to have taken a study break. It
              might have been moved, deleted, or maybe it never existed.
            </p>
          </div>

          {/* Action Buttons */}
          <div className={styles.actions}>
            <Link to="/">
              <Button size="large" icon={<FaHome />}>
                Go to Homepage
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="large" icon={<FaSearch />}>
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Quick Links */}
          <div className={styles.quickLinks}>
            <p className={styles.quickLinksTitle}>
              Or try one of these pages:
            </p>
            <div className={styles.links}>
              <Link to="/about">About Us</Link>
              <Link to="/academics">Academics</Link>
              <Link to="/admissions">Admissions</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;