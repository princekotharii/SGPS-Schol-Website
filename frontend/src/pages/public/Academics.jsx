import { useEffect } from 'react';
import PageHeader from '@components/shared/PageHeader';
import Card from '@components/shared/Card';
import { programs } from '@data/programs';
import { subjects } from '@data/subjects';
import {
  FaChild,
  FaBookReader,
  FaBook,
  FaGraduationCap,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaFlask,
} from 'react-icons/fa';
import styles from './Academics.module.css';

const iconMap = {
  FaChild,
  FaBookReader,
  FaBook,
  FaGraduationCap,
  FaUserGraduate,
};

const Academics = () => {
  useEffect(() => {
    document.title = 'Academics - SGPS School';
  }, []);

  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Academics' },
  ];

  return (
    <div className={styles.academics}>
      <PageHeader
        title="Academic Programs"
        subtitle="Comprehensive curriculum designed for holistic development"
        breadcrumbs={breadcrumbs}
      />

      <div className="container">
        {/* Programs Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Programs</h2>
            <p className={styles.sectionSubtitle}>
              From Pre-Primary to Senior Secondary - Excellence at Every Level
            </p>
          </div>

          <div className={styles.programsGrid}>
            {programs.map((program) => {
              const Icon = iconMap[program.icon];
              return (
                <div
                  key={program.id}
                  className={styles.programCard}
                  style={{ borderTop: `4px solid ${program.color}` }}
                >
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

        {/* Curriculum Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Curriculum Overview</h2>
            <p className={styles.sectionSubtitle}>
              CBSE affiliated curriculum with focus on conceptual learning
            </p>
          </div>

          <div className={styles.curriculumGrid}>
            <Card className={styles.curriculumCard}>
              <div className={styles.cardHeader}>
                <FaBookReader className={styles.cardIcon} />
                <h3>Primary Level</h3>
              </div>
              <ul className={styles.subjectList}>
                {subjects.primary.map((subject, index) => (
                  <li key={index}>
                    <span className={styles.bullet}>•</span>
                    {subject}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className={styles.curriculumCard}>
              <div className={styles.cardHeader}>
                <FaBook className={styles.cardIcon} />
                <h3>Middle School</h3>
              </div>
              <ul className={styles.subjectList}>
                {subjects.middle.map((subject, index) => (
                  <li key={index}>
                    <span className={styles.bullet}>•</span>
                    {subject}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className={styles.curriculumCard}>
              <div className={styles.cardHeader}>
                <FaGraduationCap className={styles.cardIcon} />
                <h3>Secondary</h3>
              </div>
              <ul className={styles.subjectList}>
                {subjects.secondary.map((subject, index) => (
                  <li key={index}>
                    <span className={styles.bullet}>•</span>
                    {subject}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Senior Secondary Streams */}
          <div className={styles.streamsSection}>
            <h3 className={styles.streamsTitle}>
              Senior Secondary Streams (Class 11-12)
            </h3>
            <div className={styles.streamsGrid}>
              <Card className={styles.streamCard}>
                <div className={styles.streamHeader}>
                  <FaFlask className={styles.streamIcon} />
                  <h4>Science Stream</h4>
                </div>
                <ul className={styles.subjectList}>
                  {subjects.seniorSecondary.science.map((subject, index) => (
                    <li key={index}>
                      <span className={styles.bullet}>•</span>
                      {subject}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className={styles.streamCard}>
                <div className={styles.streamHeader}>
                  <FaLaptopCode className={styles.streamIcon} />
                  <h4>Commerce Stream</h4>
                </div>
                <ul className={styles.subjectList}>
                  {subjects.seniorSecondary.commerce.map((subject, index) => (
                    <li key={index}>
                      <span className={styles.bullet}>•</span>
                      {subject}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className={styles.streamCard}>
                <div className={styles.streamHeader}>
                  <FaChalkboardTeacher className={styles.streamIcon} />
                  <h4>Arts Stream</h4>
                </div>
                <ul className={styles.subjectList}>
                  {subjects.seniorSecondary.arts.map((subject, index) => (
                    <li key={index}>
                      <span className={styles.bullet}>•</span>
                      {subject}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Teaching Methodology */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Teaching Methodology</h2>
          </div>

          <div className={styles.methodologyGrid}>
            <div className={styles.methodCard}>
              <div className={styles.methodNumber}>01</div>
              <h3>Interactive Learning</h3>
              <p>
                Smart classrooms with audio-visual aids for engaging and
                interactive learning experiences.
              </p>
            </div>

            <div className={styles.methodCard}>
              <div className={styles.methodNumber}>02</div>
              <h3>Practical Approach</h3>
              <p>
                Hands-on learning through well-equipped laboratories and
                project-based assignments.
              </p>
            </div>

            <div className={styles.methodCard}>
              <div className={styles.methodNumber}>03</div>
              <h3>Continuous Assessment</h3>
              <p>
                Regular tests, assignments, and evaluations to track student
                progress effectively.
              </p>
            </div>

            <div className={styles.methodCard}>
              <div className={styles.methodNumber}>04</div>
              <h3>Individual Attention</h3>
              <p>
                Small class sizes ensuring personalized guidance and mentoring
                for every student.
              </p>
            </div>
          </div>
        </section>

        {/* Co-Curricular Activities */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Co-Curricular Activities</h2>
            <p className={styles.sectionSubtitle}>
              Beyond textbooks - developing well-rounded individuals
            </p>
          </div>

          <div className={styles.activitiesGrid}>
            <div className={styles.activityCard}>
              <span className={styles.activityIcon}>🎨</span>
              <h3>Arts & Crafts</h3>
              <p>Painting, Drawing, Sculpture, and Creative Arts</p>
            </div>

            <div className={styles.activityCard}>
              <span className={styles.activityIcon}>🎵</span>
              <h3>Music & Dance</h3>
              <p>Vocal, Instrumental, Classical, and Contemporary Dance</p>
            </div>

            <div className={styles.activityCard}>
              <span className={styles.activityIcon}>⚽</span>
              <h3>Sports</h3>
              <p>Cricket, Football, Basketball, Athletics, and more</p>
            </div>

            <div className={styles.activityCard}>
              <span className={styles.activityIcon}>🎭</span>
              <h3>Drama & Theatre</h3>
              <p>Acting, Stage Performance, and Public Speaking</p>
            </div>

            <div className={styles.activityCard}>
              <span className={styles.activityIcon}>🔬</span>
              <h3>Science Club</h3>
              <p>Experiments, Projects, and Scientific Research</p>
            </div>

            <div className={styles.activityCard}>
              <span className={styles.activityIcon}>💻</span>
              <h3>Coding Club</h3>
              <p>Programming, Robotics, and Technology Innovation</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Academics;