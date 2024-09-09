import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header/Header.jsx';
import styles from './Home.module.css';
import {AuthContext} from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
 
 

  return isAuthenticated && (
    <div className={styles.homeContainer}>
      <Header title={`Welcome to the home page`} />
    </div>
  )

}
export default Home;
