import { FaUserGraduate, FaChalkboardTeacher, FaTrophy, FaBook } from 'react-icons/fa';
import { schoolStats } from '@data/stats';
import styles from './Stats.module.css';

const iconMap = {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaTrophy,
  FaBook,
};

const Stats = () => {
  return (
    <section className={styles.stats}>
      <div className="container">
        <div className={styles.statsGrid}>
          {schoolStats.map((stat) => {
            const Icon = iconMap[stat.icon];
            return (
              <div key={stat.id} className={styles.statCard}>
                <div
                  className={styles.iconWrapper}
                  style={{ background: `${stat.color}20` }}
                >
                  <Icon style={{ color: stat.color }} />
                </div>
                <h3 className={styles.count}>{stat.count}</h3>
                <p className={styles.label}>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
