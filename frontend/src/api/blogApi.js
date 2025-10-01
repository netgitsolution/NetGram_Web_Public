import { api } from "./axiosHelper";

export const submitPortfolioData = async (payload) => {
    try {
        const res = await api.post("/blog/request", payload);
        return res.data;
    } catch (err) {
        throw err.response?.data || err.message;
    }
};

export const getPortfolioData = async () => {
    try {
        const res = await api.get("/blog/getData");
        return res.data;
    }
    catch (err) {
        throw err.response?.data || err.message;
    }
};