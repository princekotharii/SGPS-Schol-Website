import { Link, useLocation } from 'react-router-dom';
import {
  FaTachometerAlt,
  FaImages,
  FaCalendar,
  FaUserGraduate,
  FaEnvelope,
  FaUsers,
  FaUser,
  FaSignOutAlt,
} from 'react-icons/fa';
import { adminNavLinks } from '@data/navLinks';
import styles from './Sidebar.module.css';

const iconMap = {
  FaTachometerAlt,
  FaImages,
  FaCalendar,
  FaUserGraduate,
  FaEnvelope,
  FaUsers,
  FaUser,
};

const Sidebar = ({ isOpen, onClose, onLogout }) => {
  const location = useLocation();

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && <div className={styles.backdrop} onClick={onClose}></div>}

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>SGPS</div>
          <div className={styles.logoText}>
            <span className={styles.schoolName}>SGPS School</span>
            <span className={styles.adminText}>Admin Panel</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {adminNavLinks.map((link) => {
              const Icon = iconMap[link.icon];
              return (
                <li key={link.id}>
                  <Link
                    to={link.path}
                    className={`${styles.navLink} ${
                      location.pathname === link.path ? styles.active : ''
                    }`}
                    onClick={onClose}
                  >
                    <Icon className={styles.navIcon} />
                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <button className={styles.logoutButton} onClick={onLogout}>
          <FaSignOutAlt className={styles.navIcon} />
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
