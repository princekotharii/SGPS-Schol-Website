import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '@context/AuthContext';
import {
  FaImages,
  FaCalendar,
  FaUserGraduate,
  FaEnvelope,
  FaUsers,
  FaChartLine,
} from 'react-icons/fa';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalGallery: 24,
    totalEvents: 12,
    totalAdmissions: 156,
    totalContacts: 43,
    totalUsers: 8,
  });

  useEffect(() => {
    document.title = 'Dashboard - Admin Panel';
  }, []);

  const statCards = [
    {
      id: 1,
      title: 'Gallery Images',
      count: stats.totalGallery,
      icon: FaImages,
      color: '#2563eb',
      link: '/admin/gallery',
    },
    {
      id: 2,
      title: 'Events',
      count: stats.totalEvents,
      icon: FaCalendar,
      color: '#f59e0b',
      link: '/admin/events',
    },
    {
      id: 3,
      title: 'Admissions',
      count: stats.totalAdmissions,
      icon: FaUserGraduate,
      color: '#10b981',
      link: '/admin/admissions',
    },
    {
      id: 4,
      title: 'Contact Messages',
      count: stats.totalContacts,
      icon: FaEnvelope,
      color: '#8b5cf6',
      link: '/admin/contact',
    },
    {
      id: 5,
      title: 'Total Users',
      count: stats.totalUsers,
      icon: FaUsers,
      color: '#ec4899',
      link: '/admin/users',
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {user?.name || 'Admin'}!</p>
        </div>
        <div className={styles.dateTime}>
          <p>{new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className={styles.statCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.statHeader}>
                <div
                  className={styles.iconWrapper}
                  style={{ background: `${stat.color}15` }}
                >
                  <Icon style={{ color: stat.color }} />
                </div>
                <FaChartLine className={styles.trendIcon} />
              </div>
              <div className={styles.statBody}>
                <h3 className={styles.statCount}>{stat.count}</h3>
                <p className={styles.statTitle}>{stat.title}</p>
              </div>
              <a href={stat.link} className={styles.statLink}>
                View Details →
              </a>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionsGrid}>
          <a href="/admin/gallery" className={styles.actionCard}>
            <FaImages />
            <span>Manage Gallery</span>
          </a>
          <a href="/admin/events" className={styles.actionCard}>
            <FaCalendar />
            <span>Add Event</span>
          </a>
          <a href="/admin/admissions" className={styles.actionCard}>
            <FaUserGraduate />
            <span>View Admissions</span>
          </a>
          <a href="/admin/contact" className={styles.actionCard}>
            <FaEnvelope />
            <span>Contact Messages</span>
          </a>
        </div>
      </div>

      {/* Placeholder Info */}
      <div className={styles.infoBox}>
        <h3>📌 Note</h3>
        <p>
          This is a placeholder dashboard. The actual admin functionality
          (Gallery Management, Event Management, Admissions, Contact Messages,
          User Management) will be implemented in the next phase.
        </p>
        <p>
          All data shown here is dummy data for demonstration purposes.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;