import axios from 'axios';
import { useSelector } from 'react-redux';

// const BASE_URL = 'https://dummyjson.com/';
// const BASE_URL = 'http://bajarang_enterprice.test/api/';
const BASE_URL = import.meta.env.VITE_API_URL;
async function AxiosReq(endpoint, data = null, method = "GET", navigation = () => { }, token = "") {
    // const requestData = data && typeof data === "object" ? JSON.stringify(data) : "{}";

    try {
        let response = await axios({
            url: `${BASE_URL}${endpoint}`,
            //  url: process.env.APi_BASE_URL+endpoint,
            method: method.toUpperCase(),
            timeout: 8000,
            data: data,
            headers: {
                //  'Content-Type': 'application/json',
                // "Content-Type": "multipart/form-data",
                "Content-Type": "application/json, multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        })
        //  console.log(response)
        if (response.status === 200 || response.status === 201) {
            // console.log("API Response:", response);
            return { success: response.data.success, message: response.data.message, data: response.data.data, status:response.status };
        } else {
            console.error(`Unexpected response: ${response.status}`, response);
            // throw new Error(`Server Error: ${response.status}`);
            // Return error message instead of crashing the app
            return { success: false, message: `Unexpected response: ${response.status}`, status:response.status };
        }

    }
    catch (error) {
        console.error("API Error:", error.response?.data || error.message);

        // Handle specific HTTP errors
        if (error.response) {
            if (error.response.status === 401) {
                console.warn("Unauthorized! Redirecting to login...");
                navigation("/login");
            } else if (error.response.status === 404) {
                console.error("API endpoint not found:", endpoint);
            }else if (error.response.status === 400) {
                return { success: false, message: error.response?.data?.message || error.message, status:error.response.status };
            } else {
                console.error(`API returned error ${error.response.status}:`, error.response.data);
            }
            return { success: false, message: error.message, status:error.response.status };
        } else if (error.code === "ECONNABORTED") {
            console.error("Request timeout - Server is taking too long to respond.");
        } else {
            console.error("Network error - Please check your internet connection.");
        }

        // Return error message instead of crashing the app
        return { success: false, message: error.message, status:400};
    }
}
export default AxiosReq