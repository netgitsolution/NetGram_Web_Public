import { api } from "./axiosHelper";

export const sendContactRequest = async (data) => {
    try {
        const res = await api.post("/contact/us", data);
        return res.data;
    } catch (err) {
        throw err.response?.data || err.message;
    }
};