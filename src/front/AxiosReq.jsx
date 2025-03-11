import axios from 'axios';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5YjZkNmE3OC01YzhjLTRhNzYtOTkzNS00YjAyNzcxMDZjYjciLCJqdGkiOiJhMTJhZmRhNDVmMDI3ZjI4NmZlYmUxMzY2ODI1OTc0M2FiNzRjYjQ1ODUyMDRjNzlhMDBiZWIyYTY5ODA2N2RhYzMyYjM2YmQxNjgzNTRhMiIsImlhdCI6MTcwOTYzNDcyNy4zODc2OTEsIm5iZiI6MTcwOTYzNDcyNy4zODc2OTQsImV4cCI6MTc0MTE3MDcyNy4xOTAyMzIsInN1YiI6IjEiLCJzY29wZXMiOltdfQ.mJCs6M4GnscO1XdnV-jz5mg3iZeFz_AhGGmCnvJ3l7xZpGDeNmDgMs05pabJKjaJ9FLHYHmCQGW2fT0094EHX3PuwW5M5JhP0oOPkCntXIgWSwfq8Dpy6eWCnICe6R4nZqwumD_4FdMUWihRQsYFxrsOkLXFE4oW-yJc_6VFLBI0L82l3Gmhxd7rbRyaFN7mRP2MbSLKyIPcYvK0WbgEmFxdJhepQr9M_QS1mQcCqO1rMwKd8g64Fxr79ML9cY14Zi96orPQE-LYGi0hMx1ax5dlBfpcreSLSDMC28b7B4FEiq_Xdq3XrwKNT7ti07KJvQpqkMmokxeDESuaW28EMbewPxEqtEh5HaMl7ZDwj0HwGSpg7ROPAh6JqtMgF6qAYRdPVblnVuU3UGziEQu9zo7HaisNwboxlBJQxgBnvdngvopQydiEhUZ5zqOYStzR0ouTxe2NKebI9DAMYMR6KjlR9qcM3YD_R9u6bhGca_Lr6kznfuBd8Nwp358sFsCjcr1Xw1LjCYdjQVXJsUnKXxQYgr3pJ-WqP_iv9Kzpq-BICd4_3sa_ZxHOn4z1UMMFa6zdWuS-74cBj-6g_UqbZuR3R1rUAYoQ3rTiiCs4T7HFtjUPCIDPP21bfHDHwxtg9s4JFe6VHI8TGP4Kc1bKrhxOM6nUmEztoo-OHe-Yq3w';
const BASE_URL = 'https://dummyjson.com/';
async function AxiosReq(endpoint, data = null, method = "GET", navigation = () => { }) {

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
                "Content-Type": "application/json, multipart/form-data",
                Authorization: `Bearer ${token}`
            }
        })
        //  console.log(response)
        if (response.status === 200 || response.status === 201) {
            return { success: true, message: 'success', data: response.data, status:response.status };
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