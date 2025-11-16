import { useEffect } from 'react';
import PageHeader from '@components/shared/PageHeader';
import Card from '@components/shared/Card';
import { facilities } from '@data/facilities';
import {
  FaBookOpen,
  FaFlask,
  FaLaptop,
  FaFutbol,
  FaTheaterMasks,
  FaPalette,
  FaMusic,
  FaFirstAid,
  FaUtensils,
  FaBus,
  FaChalkboardTeacher,
  FaSwimmingPool,
} from 'react-icons/fa';
import styles from './Facilities.module.css';

const iconMap = {
  FaBookOpen,
  FaFlask,
  FaLaptop,
  FaFutbol,
  FaTheaterMasks,
  FaPalette,
  FaMusic,
  FaFirstAid,
  FaUtensils,
  FaBus,
  FaChalkboardTeacher,
  FaSwimmingPool,
};

const Facilities = () => {
  useEffect(() => {
    document.title = 'Facilities - SGPS School';
  }, []);

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Facilities' },
  ];

  return (
    <div className={styles.facilities}>
      <PageHeader
        title="World-Class Facilities"
        subtitle="State-of-the-art infrastructure for holistic development"
        breadcrumbs={breadcrumbs}
      />

      <div className="container">
        {/* Introduction */}
        <section className={styles.introSection}>
          <div className={styles.introContent}>
            <h2>Infrastructure That Inspires Learning</h2>
            <p>
              At SGPS School, we believe that a conducive learning environment
              plays a vital role in a child's development. Our campus is equipped
              with modern facilities designed to provide the best educational
              experience.
            </p>
            <p>
              From well-equipped laboratories to spacious playgrounds, from
              digital classrooms to comprehensive library resources, we ensure
              every student has access to world-class facilities.
            </p>
          </div>
        </section>

        {/* Facilities Grid */}
        <section className={styles.facilitiesSection}>
          <div className={styles.facilitiesGrid}>
            {facilities.map((facility, index) => {
              const Icon = iconMap[facility.icon];
              return (
                <Card
                  key={facility.id}
                  className={styles.facilityCard}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>
                      <Icon />
                    </div>
                    <h3>{facility.title}</h3>
                  </div>
                  <p className={styles.description}>{facility.description}</p>
                  <div className={styles.facilityImage}>
                    <img
                      src={facility.image}
                      alt={facility.title}
                      onError={(e) => {
                        e.target.src =
                          'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600';
                      }}
                    />
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Additional Features */}
        <section className={styles.featuresSection}>
          <h2 className={styles.sectionTitle}>Additional Features</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureBox}>
              <span className={styles.featureIcon}>🔒</span>
              <h3>Safe & Secure</h3>
              <p>CCTV surveillance and trained security personnel</p>
            </div>

            <div className={styles.featureBox}>
              <span className={styles.featureIcon}>🌳</span>
              <h3>Green Campus</h3>
              <p>Eco-friendly environment with lush green surroundings</p>
            </div>

            <div className={styles.featureBox}>
              <span className={styles.featureIcon}>💡</span>
              <h3>Power Backup</h3>
              <p>Uninterrupted power supply with generator backup</p>
            </div>

            <div className={styles.featureBox}>
              <span className={styles.featureIcon}>💧</span>
              <h3>Water Purification</h3>
              <p>RO purified drinking water for students and staff</p>
            </div>

            <div className={styles.featureBox}>
              <span className={styles.featureIcon}>🚻</span>
              <h3>Clean Restrooms</h3>
              <p>Well-maintained and hygienic toilet facilities</p>
            </div>

            <div className={styles.featureBox}>
              <span className={styles.featureIcon}>📡</span>
              <h3>High-Speed WiFi</h3>
              <p>Internet connectivity throughout the campus</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Facilities;