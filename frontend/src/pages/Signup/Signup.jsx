import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import styles from './Signup.module.css';
import {AuthContext} from '../../Context/AuthContext';

const Signup = () => {
  const { signup } = useContext(AuthContext);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();

    try {
     await signup(formData)
    } catch (error) {
      console.error('Login failed:', error);
    }
    
  };

  return (
    <div className={styles.signupContainer}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <InputField 
          placeholder="Name" 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
        />
        <InputField 
          placeholder="Email" 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
        />
        <InputField 
          placeholder="Password" 
          type="password" 
          name="password" 
          value={formData.password} 
          onChange={handleChange} 
        />
        <Button text="Sign Up" />
      </form>
      <div className={styles.switch}>
        Already have an account? <Link to="/">Login</Link>
      </div>
    </div>
  );
};

export default Signup;