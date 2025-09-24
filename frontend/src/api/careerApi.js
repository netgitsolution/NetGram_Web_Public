import { api } from "./axiosHelper"; // named import

export const submitCareerForm = async (formData) => {
    try {
        const res = await api.post("/career/submit", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    } catch (err) {
        throw err.response?.data || err.message;
    }
};

export const getCareerList = async () => {
    try {
        const res = await api.get("/career");
        return res.data;
    } catch (err) {
        throw err.response?.data || err.message;
    }
};