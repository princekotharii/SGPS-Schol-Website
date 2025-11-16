import { Link } from 'react-router-dom';
import { FaArrowRight, FaPlay } from 'react-icons/fa';
import Button from '@components/shared/Button';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <div className={styles.overlay}></div>
      </div>

      <div className="container">
        <div className={styles.heroContent}>
          {/* Left Content */}
          <div className={styles.textContent}>
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              Established Since 1995
            </div>

            <h1 className={styles.title}>
              Empowering Young Minds for a{' '}
              <span className={styles.highlight}>Brighter Future</span>
            </h1>

            <p className={styles.description}>
              Join Shivalik Ganges Public School, where excellence meets innovation. We nurture
              creativity, build character, and inspire lifelong learning in a
              safe and supportive environment.
            </p>

            <div className={styles.stats}>
              <div className={styles.statItem}>
                <h3>2500+</h3>
                <p>Students</p>
              </div>
              <div className={styles.statItem}>
                <h3>150+</h3>
                <p>Teachers</p>
              </div>
              <div className={styles.statItem}>
                <h3>30+</h3>
                <p>Years</p>
              </div>
            </div>

            <div className={styles.actions}>
              <Link to="/admissions">
                <Button size="large" icon={<FaArrowRight />} iconPosition="right">
                  Apply for Admission
                </Button>
              </Link>

              <Link to="/about">
                <Button variant="outline" size="large" icon={<FaPlay />}>
                  Watch Video
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className={styles.imageContent}>
            <div className={styles.imageWrapper}>
              <img
                src="https://scontent.fdel27-5.fna.fbcdn.net/v/t39.30808-6/581556076_1295389995937707_6798146462719465160_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=JXHg5pXIB48Q7kNvwEwOfFG&_nc_oc=AdkwzFgg-gSF2Ke5JEE2Dqi8DePJ8Cy1Uv51DK7YIO8iYCmdiTVJDUZjvZ4OLwe7RZIjNscUQEisM9GNBXQFbZuS&_nc_zt=23&_nc_ht=scontent.fdel27-5.fna&_nc_gid=OrYW4TTsmq_pbEWVUAa6xw&oh=00_AfjW9NNsl-W4_35SnPoQQSIOpgsTwGTTdb2KXcCMwo_sEA&oe=691F6CD2"
                alt="Happy students"
                className={styles.heroImage}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800';
                }}
              />
              <div className={styles.imageDecoration1}></div>
              <div className={styles.imageDecoration2}></div>
            </div>

            {/* Floating Cards */}
            <div className={styles.floatingCard} style={{ top: '10%', right: '0' }}>
              <div className={styles.cardIcon}>🎓</div>
              <div>
                <h4>Quality Education</h4>
                <p>CBSE Affiliated</p>
              </div>
            </div>

            <div className={styles.floatingCard} style={{ bottom: '15%', left: '-10%' }}>
              <div className={styles.cardIcon}>🏆</div>
              <div>
                <h4>500+ Awards</h4>
                <p>Academic Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Wave */}
      <div className={styles.wave}>
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="var(--background)"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
