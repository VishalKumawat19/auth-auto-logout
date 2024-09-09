import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ type,name, placeholder, value, onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};

export default InputField;
