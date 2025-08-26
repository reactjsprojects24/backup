import axios from "axios";
import { loginSuccess, loginFailure } from "../redux/authSlice";
import {registerStart , registerSuccess , registerFailure } from "../redux/registrationSlice";
import { API } from "./apiConfig";
import { encryptText } from "../features/credintialsEncryption/credentialsEncryption"


// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// const API_BASE_URL = "http://192.168.1.32:8010"; // Update with your actual API base URL
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% API %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",API.LOGIN);
export const handleLogin = async (dispatch, email, password, rememberMe, navigate) => {

  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%% API %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%",API.LOGIN);
  
  try {
    const payload = {
      "username": email,
      "password": password,
    };

    console.log("Login Payload:", payload);

    // First API call: Get Access Token
    // const response = await axios.post(`${API_BASE_URL}/z/li`, payload);
    const response = await axios.post(API.LOGIN, payload);

    if (response.status === 200 && response.data.access_token) {
      const accessToken = response.data.access_token;

      // Second API call: Get User Role (only if access token is available)
      const userResponse = await axios.post(API.VERIFY, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const isAdmin = userResponse.data.is_superuser;

      // Dispatch Redux action
      dispatch(loginSuccess({
        token: accessToken,
        email,
        password,
        isSuperUser: isAdmin,
        remember: rememberMe,
      }));

      // Redirect based on user role
      navigate(isAdmin ? "/Admin" : "/dashboard");
    } else {
      throw new Error("Authentication failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    dispatch(loginFailure("Invalid username/password or User token is missing. Please try again."));
  }
};





export const handleRegistration = (formData) => async (dispatch) => {
    dispatch(registerStart());

    try {
        // Ensure the payload structure matches the expected API format
        const payload = {
            email: formData.email,
            password: formData.password,
            fullname: formData.fullname,
            organization: formData.organization,
            designation: formData.designation,
            confirm_password: formData.confirm_password,
            security_question: formData.security_question,
            security_answer: formData.security_answer
        };

        console.log("Payload being sent:", payload); // Debugging

        const response = await axios.post(
            API.REGISTER,
            JSON.stringify(payload),
            {
                headers: { "Content-Type": "application/json" },
            }
        );

        console.log("Registration Success:", response.data); // Debugging
        dispatch(registerSuccess(response.data));

    } catch (error) {
        console.error("Registration Error:", error.response?.data || error.message);

        dispatch(registerFailure(
            error.response?.data?.message || "Registration failed. Please try again."
        ));
    }
};



