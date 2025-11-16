import { Link } from 'react-router-dom';
import { FaArrowRight, FaPhone } from 'react-icons/fa';
import Button from '@components/shared/Button';
import styles from './CTASection.module.css';

const CTASection = () => {
  return (
    <section className={styles.cta}>
      <div className={styles.background}>
        <div className={styles.overlay}></div>
      </div>

      <div className="container">
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              Ready to Join Our School Community?
            </h2>
            <p className={styles.description}>
              Take the first step towards your child's bright future. Enroll now
              and experience the difference of quality education with holistic
              development.
            </p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                <span>CBSE Affiliated</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                <span>Experienced Faculty</span>
              </div>
              <div className={styles.feature}>
                <span className={styles.checkIcon}>✓</span>
                <span>Modern Infrastructure</span>
              </div>
            </div>

            <div className={styles.actions}>
              <Link to="/admissions">
                <Button
                  size="large"
                  icon={<FaArrowRight />}
                  iconPosition="right"
                >
                  Apply for Admission
                </Button>
              </Link>

              <Link to="/contact">
                <Button
                  variant="outline"
                  size="large"
                  icon={<FaPhone />}
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600"
                alt="Students studying"
                className={styles.image}
              />
              <div className={styles.floatingBadge}>
                <span className={styles.badgeEmoji}>🎓</span>
                <div>
                  <h4>30+ Years</h4>
                  <p>Of Excellence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;