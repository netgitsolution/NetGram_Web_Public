import { ContactRequest } from '../models/contact.model.js';
import { sendContactMail } from '../config/mailer.config.js';

export const createContact = async (req, res) => {
    try {
        // 1) Save in DB
        const contact = await ContactRequest.create(req.body);

        // 2) Send mail
        try {
            const info = await sendContactMail(contact);
            console.log('Contact email sent:', info.messageId);

            return res.status(201).json({
                message: 'Sent successfully',
                data: contact,
            });
        } catch (mailErr) {
            console.error('Failed to send contact email:', mailErr);

            return res.status(201).json({
                message: 'Contact request saved but failed to send email',
                data: contact,
                emailError: mailErr.message,
            });
        }

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};