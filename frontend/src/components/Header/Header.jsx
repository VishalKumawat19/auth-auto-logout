import React from 'react';
import styles from './Header.module.css';

const Header = ({ title }) => {
  return <h1 className={styles.header}>{title}</h1>;
};

export default Header;
