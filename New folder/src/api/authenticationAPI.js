import axios from 'axios';

import handleApiError from '../utils/apiErrorHandler';

const API_BASE_URL = 'http://localhost:8000';

const authenticationApi = {

    login : async(username,password) =>{
        console.log("login api----- username,password ----",username,password);
        try{
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`,{
                username,
                password
            });
            if (response.status === 200 && response.data.access_token) {
                const accessToken = response.data.access_token;
            }
            
            return response.data ;

        }catch(error){
            handleApiError(error ,"failed to login ")
        }
    },

    register : async(formData) =>{
       
        try{
            const payload = {
                email : formData.email,
                fullname : formData.fullname,
                organization : formData.organization,
                designation : formData.designation,
                password : formData.password,
                confirm_password : formData.confirm_password,
                security_question : formData.security_question,
                security_answer : formData.security_answer
            };
            console.log("payload in register api" ,payload);

            const response = await axios.post(`${API_BASE_URL}/api/auth/register`,
            JSON.stringify(payload),
            {
                headers: { "Content-Type": "application/json" },
            });

            console.log(" registration success--",response.data);
            return response.data;
        }catch(error){
            handleApiError(error ,"failed to register ");
            return null;
        }
    },

    forget : async (email,security_question,security_answer)=>{
        console.log("forgot api------email,security_question,security_answer-----",email,security_question,security_answer);
        try{
            const response = await axios.post(`${API_BASE_URL}/api/auth/forgot-password`,{
                email,
                security_question,
                security_answer

            });
            return response.data;

        }catch(error){
            handleApiError(error ,"failed to reset  ")
        }
    },

    resetPassword : async (token,password) => {
        console.log("reset password api ",token,password);

        try{
            const response = await axios.post(`${API_BASE_URL}/api/auth/reset-password`,{
                token,
                password
            });            
            return response.data ;

        }catch(error){
            handleApiError(error ,"failed to login ");
        }
        
    },

    currentUser : async (access_token) =>{
        console.log("current user access token ", access_token);

        try{
            const response = await axios.post(`${API_BASE_URL}/api/auth/verify `, {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
            });
            return response.data;
        }catch(error){
            handleApiError(error ," failed to get current user ");
        }
    },

    deleteUser : async (refresh_token) => {
        console.log("delete user api ",refresh_token);

        try{
            const response = await axios.post(`${API_BASE_URL}/api/auth/delete`,{
                refresh_token
            });
            return response.data
        }catch(error){
            handleApiError(error ," failed to delete current user ");

        }
    },

    logout : async (access_token) =>{
        console.log(" user access token to logout", access_token);

        try{
            const response = await axios.post(`${API_BASE_URL}/api/auth/logout `, {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                },
            });
            return response.data;
        }catch(error){
            handleApiError(error ," failed to get  logout ");
        }
    },

};


export default authenticationApi;