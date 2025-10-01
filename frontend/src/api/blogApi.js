import { api } from "./axiosHelper";

export const submitBlogData = async (payload) => {
    try {
        const res = await api.post("/blog/request", payload);
        return res.data;
    } catch (err) {
        throw err.response?.data || err.message;
    }
};

export const getBlogData = async () => {
    try {
        const res = await api.get("/blog/getData");
        return res.data;
    }
    catch (err) {
        throw err.response?.data || err.message;
    }
};