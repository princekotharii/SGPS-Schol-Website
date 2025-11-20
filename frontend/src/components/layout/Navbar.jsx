import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { publicNavLinks } from '@data/navLinks';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className="container">
        <div className={styles.navContent}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <div className={styles.logoIcon}>DPS</div>
            <div className={styles.logoText}>
              <span className={styles.schoolName}>DPS </span>
              <span className={styles.tagline}>Excellence in Education</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className={styles.navLinks}>
            {publicNavLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.path}
                  className={`${styles.navLink} ${
                    location.pathname === link.path ? styles.active : ''
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side - Login Button */}
          <div className={styles.rightSection}>
            <Link to="/login" className={styles.loginButton}>
              <FaUserCircle />
              <span>Login</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={styles.menuToggle}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
          <ul className={styles.mobileNavLinks}>
            {publicNavLinks.map((link) => (
              <li key={link.id}>
                <Link
                  to={link.path}
                  className={`${styles.mobileNavLink} ${
                    location.pathname === link.path ? styles.active : ''
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/login" className={styles.mobileLoginButton}>
                <FaUserCircle />
                <span>Admin Login</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
