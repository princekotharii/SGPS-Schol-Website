import {
  FaGraduationCap,
  FaLaptop,
  FaUsers,
  FaFlask,
  FaRunning,
  FaBus,
} from 'react-icons/fa';
import { features } from '@data/features';
import styles from './Features.module.css';

const iconMap = {
  FaGraduationCap,
  FaLaptop,
  FaUsers,
  FaFlask,
  FaRunning,
  FaBus,
};

const Features = () => {
  return (
    <section className={styles.features}>
      <div className="container">
        {/* Section Header */}
        <div className={styles.header}>
          <span className={styles.badge}>Why Choose Us</span>
          <h2 className={styles.title}>
            Excellence in Every <span className={styles.highlight}>Aspect</span>
          </h2>
          <p className={styles.subtitle}>
            Discover what makes SGPS School the perfect choice for your child's
            educational journey and holistic development.
          </p>
        </div>

        {/* Features Grid */}
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={feature.id}
                className={styles.featureCard}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={styles.iconWrapper}
                  style={{ background: `${feature.color}15` }}
                >
                  <Icon style={{ color: feature.color }} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
                <div
                  className={styles.decorationLine}
                  style={{ background: feature.color }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
