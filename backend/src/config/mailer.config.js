import nodemailer from 'nodemailer';

const EmailUser = process.env.EMAIL_USER;
const EmailPass = process.env.EMAIL_PASS;
const AdminEmail = process.env.ADMIN_EMAIL;

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EmailUser,
        pass: EmailPass,
    },
});

// Verify transporter once at startup
transporter.verify((error, success) => {
    if (error) console.error("Mailer verification failed:", error);
    else console.log("Mailer ready:", success);
});

// ==================== Project Mail ====================
export const sendProjectMail = async (project) => {
    const htmlBody = `
    <h2>New Project Request</h2>
    <p><strong>Name:</strong> ${project.full_name}</p>
    <p><strong>Email:</strong> ${project.email}</p>
    <p><strong>Phone:</strong> ${project.phone_number || 'N/A'}</p>
    <p><strong>Project Type:</strong> ${project.project_type}</p>
    <p><strong>Details:</strong><br/>${(project.project_details || '').replace(/\n/g, '<br/>')}</p>
    <hr/>
    <p>Received at: ${new Date().toISOString()}</p>
  `;

    const mailOptions = {
        from: `"Website" <${EmailUser}>`,
        to: AdminEmail,
        subject: `New Project Request — ${project.full_name}`,
        replyTo: project.email,
        text: `New project request from ${project.full_name} (${project.email})
Phone: ${project.phone_number || 'N/A'}
Type: ${project.project_type}

Details:
${project.project_details || ''}`,
        html: htmlBody,
    };

    return transporter.sendMail(mailOptions);
};

// ==================== Contact Mail ====================
export const sendContactMail = async (contact) => {
    const htmlBody = `
    <h2>New Contact Request</h2>
    <p><strong>Name:</strong> ${contact.your_name}</p>
    <p><strong>Email:</strong> ${contact.your_email}</p>
    <p><strong>Phone:</strong> ${contact.your_number || 'N/A'}</p>
    <p><strong>Service:</strong> ${contact.select_service}</p>
    <p><strong>Message:</strong><br/>${(contact.your_message || '').replace(/\n/g, '<br/>')}</p>
    <hr/>
    <p>Received at: ${new Date().toISOString()}</p>
  `;

    const mailOptions = {
        from: `"Website Contact" <${EmailUser}>`,
        to: AdminEmail,
        subject: `New Contact Request — ${contact.your_name}`,
        replyTo: contact.your_email,
        text: `New contact request from ${contact.your_name} (${contact.your_email})
Phone: ${contact.your_number || 'N/A'}
Service: ${contact.select_service}

Message:
${contact.your_message || ''}`,
        html: htmlBody,
    };

    return transporter.sendMail(mailOptions);
};

// ==================== Career Mail ====================
export const sendCareerMail = async (career) => {
    const htmlBody = `
    <h2>New Career Application</h2>
    <p><strong>Name:</strong> ${career.your_name}</p>
    <p><strong>Email:</strong> ${career.your_email}</p>
    <p><strong>Phone:</strong> ${career.your_number || 'N/A'}</p>
    <p><strong>Applied Role:</strong> ${career.select_role}</p>
    <p><strong>Join As:</strong> ${career.join_as}</p>
    <p><strong>Message:</strong><br/>${(career.your_message || "").replace(/\n/g, "<br/>")}</p>
    <hr/>
    <p>Received at: ${new Date().toISOString()}</p>
  `;

    const mailOptions = {
        from: `"Website Careers" <${EmailUser}>`,
        to: AdminEmail,
        subject: `New Career Application — ${career.your_name}`,
        replyTo: career.your_email,
        text: `New career application from ${career.your_name} (${career.your_email})
Phone: ${career.your_number || 'N/A'}
Applied Role: ${career.select_role}
Join As: ${career.join_as}
Message: ${career.your_message || ""}
CV Path: ${career.file || "No file uploaded"}`,
        html: htmlBody,
        attachments: career.file ? [{ path: career.file }] : [],
    };

    return transporter.sendMail(mailOptions);
};