import { api } from "./axiosHelper";

export const getTeamData = async () => {
  const res = await api.get("/team"); // adjust the endpoint as needed
  return res.data;
};

// DELETE a team member
export const deleteTeamMember = async (id) => {
  const res = await api.delete(`/team/delete/${id}`);
  return res.data;
};