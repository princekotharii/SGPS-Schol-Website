import { useState, useEffect } from 'react';
import { FaPalette } from 'react-icons/fa';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { id: 'default', name: 'Blue', color: '#2563eb' },
    { id: 'dark', name: 'Dark', color: '#111827' },
    { id: 'green', name: 'Green', color: '#059669' },
    { id: 'purple', name: 'Purple', color: '#7c3aed' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'default';
    setCurrentTheme(savedTheme);
    if (savedTheme !== 'default') {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const changeTheme = (themeId) => {
    setCurrentTheme(themeId);
    if (themeId === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', themeId);
    }
    localStorage.setItem('theme', themeId);
    setIsOpen(false);
  };

  return (
    <div className={styles.themeSwitcher}>
      <button
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change Theme"
        title="Change Theme"
      >
        <FaPalette />
      </button>

      {isOpen && (
        <>
          <div 
            className={styles.backdrop} 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className={styles.themeMenu}>
            <h3>Choose Theme</h3>
            <div className={styles.themeGrid}>
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  className={`${styles.themeOption} ${
                    currentTheme === theme.id ? styles.active : ''
                  }`}
                  onClick={() => changeTheme(theme.id)}
                >
                  <div
                    className={styles.themeColor}
                    style={{ backgroundColor: theme.color }}
                  />
                  <span>{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSwitcher;
