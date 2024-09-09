import { useNavigate } from 'react-router-dom';
import {loginUser, logoutUser, signupUser, verifyUser} from '../services/authServices'
import { createContext, useEffect, useState } from 'react';
import Spinner from '../components/Spinner/Spinner';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await verifyUser();
        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate('/')
        }
      } catch (error) {
        setIsAuthenticated(false);
        navigate('/')
      } finally {
        setLoading(false); 
      }
    };
    verify();
  }, []);

  if (loading) {
    return <Spinner />; 
  }

  const login = async (credentials) => {
  
     
        try {
            const response = await loginUser(credentials);
            console.log(response);
            if (response.status == 200) {
              setIsAuthenticated(true)
              navigate("/home");
              setTimeout(() => {
                autoLogout();
              }, 118000);
            }
          } catch (error) {
            console.log("failed to login", error);
            alert(error.response.data.msg)
          }
  }

  const signup = async (userData) => {
  
     
    try {
        const response = await signupUser(userData);
        console.log(response);
        if (response.status == 201) {
          setIsAuthenticated(true)
          navigate("/home");
          setTimeout(() => {
            autoLogout();
          }, 118000);
        }
      } catch (error) {
        console.log("failed to signup", error);
        alert(error.response.data.msg)
      }
}

  const logout = async () => {
    try {
        const response = await logoutUser()
        if(response.status==200){
        setIsAuthenticated(false);
        navigate('/');
        }  
    } catch (error) {
        console.log(error)
    }
  };

  const autoLogout = async () => {
    try {
      const response = await logoutUser();
      console.log(response);
      if (response.status == 200) {
        setIsAuthenticated(false)
        navigate("/");
        alert("session timed out");
      }
    } catch (error) {
      console.log(error);
      alert('server error');
    }
  };


  return (
    <AuthContext.Provider value={{ isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
