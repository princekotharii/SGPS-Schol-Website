import { useEffect } from 'react';
import Hero from '@components/home/Hero';
import Stats from '@components/home/Stats';
import Features from '@components/home/Features';
import CTASection from '@components/home/CTASection';
import styles from './Home.module.css';

const Home = () => {
  useEffect(() => {
    document.title = 'SGPS School - Excellence in Education';
  }, []);

  return (
    <div className={styles.home}>
      <Hero />
      <Stats />
      <Features />
      <CTASection />
    </div>
  );
};

export default Home;