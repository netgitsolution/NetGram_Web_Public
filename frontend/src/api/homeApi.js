import { api } from "./axiosHelper";

export const submitHomeData = async (payload) => {
    try {
        const res = await api.post("/home/request", payload);
        return res.data;
    } catch (err) {
        throw err.response?.data || err.message;
    }
};

// Agar future me GET use karna ho
export const getHomeData = async () => {
    try {
        const res = await api.get("/home/getData");
        return res.data;
    } catch (err) {
        throw err.response?.data || err.message;
    }
};