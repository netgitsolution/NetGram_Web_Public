import { ProjectRequest } from '../models/project.model.js';
import { sendProjectMail } from '../config/mailer.config.js';

export const createProject = async (req, res) => {
    try {
        // 1) DB me save
        const project = await ProjectRequest.create(req.body);

        // 2) Email bhejo (try/catch alag)
        try {
            const info = await sendProjectMail(project);
            console.log('Email sent:', info.messageId);
            return res.status(201).json({
                message: 'Project request sent successfully',
                data: project,
            });
        } catch (mailErr) {
            console.error('Failed to send email:', mailErr);
            // DB saved but email failed — respond accordingly
            return res.status(201).json({
                message: 'Project saved but failed to send email. Check server logs.',
                data: project,
                emailError: mailErr.message,
            });
        }

    } catch (error) {
        // validation / DB errors
        return res.status(400).json({ error: error.message });
    }
};

export const getProjects = async (req, res) => {
    try {
        const projects = await ProjectRequest.findAll(); // fetch all projects
        res.status(200).json(projects);
    } catch (err) {
        console.error('Failed to fetch projects', err);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
};