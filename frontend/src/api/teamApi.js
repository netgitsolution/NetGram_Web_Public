import { api } from "./axiosHelper";

export const submitTeamData = async (teamArray) => {
    const results = [];

    for (const member of teamArray) {
        const formData = new FormData();
        if (member.id) formData.append("id", member.id);
        formData.append("name", member.name);
        formData.append("role", member.role);
        formData.append("linkedin", member.linkedin);
        formData.append("twitter", member.twitter);

        // if file exists, append the actual file
        if (member.file) {
            formData.append("img", member.file);
        } else if (member.img) {
            // if only base64, send it as a string
            formData.append("img", member.img);
        }

        let res;
        if (member.id && member.id.toString().length < 10) {
            // existing member → update
            res = await api.put(`/team/update/${member.id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        } else {
            // new member → create
            res = await api.post(`/team/create`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
        }

        results.push(res.data);
    }

    return { message: "Team saved!", data: results };
};