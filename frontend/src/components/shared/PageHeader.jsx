import React from 'react';
import styles from './PageHeader.module.css';

const PageHeader = ({
  title,
  subtitle,
  breadcrumbs = [],
  actions,
  backgroundImage,
}) => {
  return (
    <div
      className={styles.header}
      style={
        backgroundImage
          ? { backgroundImage: `url(${backgroundImage})` }
          : undefined
      }
    >
      <div className={styles.overlay}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.textContent}>
              {breadcrumbs.length > 0 && (
                <nav className={styles.breadcrumbs}>
                  {breadcrumbs.map((crumb, index) => (
                    <span key={index}>
                      {crumb.link ? (
                        <a href={crumb.link}>{crumb.label}</a>
                      ) : (
                        <span>{crumb.label}</span>
                      )}
                      {index < breadcrumbs.length - 1 && (
                        <span className={styles.separator}>/</span>
                      )}
                    </span>
                  ))}
                </nav>
              )}

              <h1 className={styles.title}>{title}</h1>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>

            {actions && <div className={styles.actions}>{actions}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
