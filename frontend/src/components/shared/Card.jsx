import React from 'react';
import styles from './Card.module.css';

const Card = ({
  children,
  title,
  subtitle,
  image,
  footer,
  hoverable = false,
  className = '',
  ...props
}) => {
  const cardClasses = [
    styles.card,
    hoverable && styles.hoverable,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={cardClasses} {...props}>
      {image && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={title || 'Card image'} className={styles.image} />
        </div>
      )}
      
      <div className={styles.content}>
        {(title || subtitle) && (
          <div className={styles.header}>
            {title && <h3 className={styles.title}>{title}</h3>}
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
        )}
        
        <div className={styles.body}>{children}</div>
      </div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  );
};

export default Card;
