import {
    requestResetToken,
    requestResetTokenSuccess,
    requestResetTokenFailure,
    resetPassword,
    resetPasswordSuccess,
    resetPasswordFailure,
} from "../redux/forgotPasswordSlice";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

console.log("consoling something about reset pass",API_BASE_URL);

export const requestResetTokenAsync = (payload) => async (dispatch) => {
    dispatch(requestResetToken());
    try {
        // Ensure the payload matches the API's expected format
        const formattedPayload = {
            email: payload.email,
            security_question: payload.question, // Correct key
            security_answer: payload.answer, // Correct key
        };

        const response = await axios.post(`${API_BASE_URL}/z/forgot-password`, formattedPayload);
        dispatch(requestResetTokenSuccess(response.data.reset_token));
    } catch (error) {
        dispatch(requestResetTokenFailure(error.response?.data || "An error occurred"));
    }
};

export const resetPasswordAsync = (payload) => async (dispatch) => {
    dispatch(resetPassword());
    try {
        const formattedPaylod = {
            token: payload.token,
            password: payload.newPassword
          }
        await axios.post(`${API_BASE_URL}/z/reset-password`, formattedPaylod);
        dispatch(resetPasswordSuccess());
    } catch (error) {
        dispatch(resetPasswordFailure(error.response.data));
    }
};