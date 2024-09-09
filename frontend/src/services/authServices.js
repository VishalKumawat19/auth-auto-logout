import axios from './axiosInstance';


export const signupUser = (userData) =>{
    try {
        const response = axios.post('/register',userData)
        return response
    } catch (error) {
        return error
    }
}

export const loginUser = (userData) =>{
    try {
        const response = axios.post('/login',userData)
        return response
    } catch (error) {
        return error
    }
}

export const logoutUser = async () =>{
    try {
        const response = await axios.post('/logout');
        return response;

       
    } catch (error) {
        console.log(error)
    }
}

export const verifyUser = async () =>{
    try {
        const response = await axios.get('/verify');
        return response;
       
    } catch (error) {
        return error
    }
}



