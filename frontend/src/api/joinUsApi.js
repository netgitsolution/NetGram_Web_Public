import { api } from "./axiosHelper";

export const submitJoinUsData = async (payload) => {
    try {
        const res = await api.post("/joinUs/request", payload);
        return res.data;
    } catch (err) {
        throw err.response?.data || err.message;
    }
};

export const getJoinUsData = async () => {
    try {
        const res = await api.get("/joinUs/getData");
        return res.data;
    } catch (err) {
        throw err.response?.data || err.message;
    }
};