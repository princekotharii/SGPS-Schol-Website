import { useEffect } from 'react';
import PageHeader from '@components/shared/PageHeader';
import Card from '@components/shared/Card';
import { leadership } from '@data/leadership';
import { programs } from '@data/programs';
import {
  FaChild,
  FaBookReader,
  FaBook,
  FaGraduationCap,
  FaUserGraduate,
} from 'react-icons/fa';
import styles from './About.module.css';

const iconMap = {
  FaChild,
  FaBookReader,
  FaBook,
  FaGraduationCap,
  FaUserGraduate,
};

const About = () => {
  useEffect(() => {
    document.title = 'About Us - SGPS School';
  }, []);

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'About Us' },
  ];

  return (
    <div className={styles.about}>
      <PageHeader
        title="About SGPS School"
        subtitle="Building Character, Creating Leaders, Inspiring Excellence"
        breadcrumbs={breadcrumbs}
      />

      <div className="container">
        {/* Vision & Mission */}
        <section className={styles.section}>
          <div className={styles.visionMission}>
            <div className={styles.visionCard}>
              <div className={styles.cardIcon}>🎯</div>
              <h2>Our Vision</h2>
              <p>
                To be a world-class educational institution that nurtures young
                minds, fosters creativity, and develops responsible global
                citizens who contribute positively to society.
              </p>
            </div>

            <div className={styles.missionCard}>
              <div className={styles.cardIcon}>🚀</div>
              <h2>Our Mission</h2>
              <p>
                To provide holistic education that combines academic excellence
                with character development, empowering students with knowledge,
                skills, and values for lifelong success.
              </p>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className={styles.section}>
          <div className={styles.contentGrid}>
            <div className={styles.textContent}>
              <h2 className={styles.sectionTitle}>Welcome to SGPS School</h2>
              <p>
                Established in 1995, SGPS School has been a beacon of quality
                education for over three decades. We are a CBSE affiliated
                institution committed to providing world-class education that
                prepares students for the challenges of tomorrow.
              </p>
              <p>
                Our campus spans across 10 acres of lush green environment,
                providing a perfect blend of modern infrastructure and natural
                surroundings. With state-of-the-art facilities, experienced
                faculty, and a student-centric approach, we ensure every child
                receives personalized attention and care.
              </p>
              <p>
                At SGPS, we believe in holistic development. Our curriculum goes
                beyond textbooks to include sports, arts, music, dance, and
                various co-curricular activities that help students discover
                their talents and passions.
              </p>
            </div>

            <div className={styles.imageContent}>
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600"
                alt="School building"
                className={styles.aboutImage}
              />
              <div className={styles.statsOverlay}>
                <div className={styles.statItem}>
                  <h3>30+</h3>
                  <p>Years of Excellence</p>
                </div>
                <div className={styles.statItem}>
                  <h3>2500+</h3>
                  <p>Happy Students</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programs */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Programs</h2>
            <p className={styles.sectionSubtitle}>
              Comprehensive education from Pre-Primary to Senior Secondary
            </p>
          </div>

          <div className={styles.programsGrid}>
            {programs.map((program) => {
              const Icon = iconMap[program.icon];
              return (
                <div key={program.id} className={styles.programCard}>
                  <div
                    className={styles.programIcon}
                    style={{ background: `${program.color}15` }}
                  >
                    <Icon style={{ color: program.color }} />
                  </div>
                  <h3>{program.title}</h3>
                  <p className={styles.classes}>{program.classes}</p>
                  <p className={styles.description}>{program.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Leadership */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Leadership Team</h2>
            <p className={styles.sectionSubtitle}>
              Experienced educators dedicated to student success
            </p>
          </div>

          <div className={styles.leadershipGrid}>
            {leadership.map((leader) => (
              <Card key={leader.id} className={styles.leaderCard}>
                <div className={styles.leaderImage}>
                  <img
                    src={leader.image}
                    alt={leader.name}
                    onError={(e) => {
                      e.target.src = 'https://ui-avatars.com/api/?name=' + 
                        leader.name.replace(' ', '+') + '&size=300&background=2563eb&color=fff';
                    }}
                  />
                </div>
                <div className={styles.leaderInfo}>
                  <h3>{leader.name}</h3>
                  <p className={styles.position}>{leader.position}</p>
                  <p className={styles.qualification}>{leader.qualification}</p>
                  <p className={styles.experience}>
                    Experience: {leader.experience}
                  </p>
                  <p className={styles.bio}>{leader.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Core Values</h2>
          </div>

          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>💡</span>
              <h3>Excellence</h3>
              <p>Striving for the highest standards in everything we do</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🤝</span>
              <h3>Integrity</h3>
              <p>Building trust through honesty and ethical behavior</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>❤️</span>
              <h3>Compassion</h3>
              <p>Caring for others and showing empathy in all interactions</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🌟</span>
              <h3>Innovation</h3>
              <p>Embracing creativity and new ideas for continuous growth</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>⚖️</span>
              <h3>Respect</h3>
              <p>Valuing diversity and treating everyone with dignity</p>
            </div>
            <div className={styles.valueCard}>
              <span className={styles.valueIcon}>🎯</span>
              <h3>Responsibility</h3>
              <p>Taking ownership of our actions and commitments</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;