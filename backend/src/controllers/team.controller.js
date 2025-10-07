import { Team } from "../models/team.model.js";

//  GET all team data
export const getTeamRequest = async (req, res) => {
    try {
        const team = await Team.findAll();
        res.status(200).json(team);
    } catch (error) {
        res.status(500).json({ message: "Error fetching team data", error });
    }
};

//  POST - Add new team member
export const createTeamRequest = async (req, res) => {
    try {
        const { name, role, linkedin, twitter } = req.body;
        const img = req.file ? req.file.filename : null;

        if (!name || !role) {
            return res.status(400).json({ message: "Name and role are required" });
        }

        const newMember = await Team.create({
            name,
            role,
            img,
            linkedin,
            twitter,
        });

        res.status(201).json({ message: "Team member created successfully", data: newMember });
    } catch (error) {
        res.status(500).json({ message: "Error creating team member", error });
    }
};

//  PUT - Update existing team member
export const updateTeamRequest = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, role, linkedin, twitter } = req.body;
        const img = req.file ? req.file.filename : null;

        const teamMember = await Team.findByPk(id);
        if (!teamMember) {
            return res.status(404).json({ message: "Team member not found" });
        }

        teamMember.name = name ?? teamMember.name;
        teamMember.role = role ?? teamMember.role;
        teamMember.linkedin = linkedin ?? teamMember.linkedin;
        teamMember.twitter = twitter ?? teamMember.twitter;
        if (img) teamMember.img = img;

        await teamMember.save();
        res.status(200).json({ message: "Team member updated successfully", data: teamMember });
    } catch (error) {
        res.status(500).json({ message: "Error updating team member", error });
    }
};

//  DELETE - Remove team member
export const deleteTeamRequest = async (req, res) => {
    try {
        const { id } = req.params;

        const teamMember = await Team.findByPk(id);
        if (!teamMember) {
            return res.status(404).json({ message: "Team member not found" });
        }

        await teamMember.destroy();
        res.status(200).json({ message: "Team member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting team member", error });
    }
};