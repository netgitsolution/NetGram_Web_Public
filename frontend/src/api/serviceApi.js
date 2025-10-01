import { api } from "./axiosHelper";

export const submitServiceData = async (payload) => {
    try {
        const res = await api.post("/services/request", payload);
        return res.data;
    }
    catch (err) {
        throw err.response?.data || err.message;
    }
};

export const getServiceData = async () => {
    try {
        const res = await api.get("/services/getData");
        return res.data;
    } catch (err) {
        throw err.response?.data || err.message;
    }
};