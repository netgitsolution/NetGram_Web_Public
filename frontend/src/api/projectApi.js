import axios from 'axios';

export const getProjects = async () => {
    const res = await axios.get('http://localhost:3000/api/projects/list');
    return res.data;
};

export const submitProjectRequest = async (data) => {
    const res = await axios.post('http://localhost:3000/api/projects/request', data);
    return res.data;
};