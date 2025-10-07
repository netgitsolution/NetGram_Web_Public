import React, { useState, useEffect, useRef } from "react";
import Dotted from "../components/Dotted";
import {
    FaBullseye,
    FaHandshake,
    FaRocket,
    FaLock,
    FaUser,
    FaRegEnvelope,
    FaComment,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
    FaLinkedin,
    FaTwitter,
    FaYoutube,
    FaInstagram,
    FaChartLine,
    FaPenNib,
    FaLaptopCode,
    FaPaintBrush,
    FaGraduationCap,
} from "react-icons/fa";
import { sendContactRequest } from "../api/contactApi";
import { getAboutData } from "../api/aboutApi";
import MeetOurTeam from "../components/MeetOurTeam";

const AboutPage = () => {
    const emptyData = {
        id: 1,
        heading: [""],
        sub_heading: "",
        story_heading: "",
        story_description: "",
        mission_heading: "",
        mission_description: "",
        core_values: [{ name: "", text: "" }],
        contact_heading: "",
        contact_sub_heading: "",
        contact_service_role: [{ service: "" }],
        mobile_number: "",
        email: "",
        address: "",
        business_hours: [{ day: "", inTime: "", outTime: "" }],
        social_media: { twitter: "", instagram: "", youtube: "", linkedin: "" },
    };

    // ------------------- STATES -------------------
    const [aboutData, setAboutData] = useState(emptyData);
    const [formData, setFormData] = useState({ name: "", email: "", number: "", message: "" });
    const [selectedService, setSelectedService] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const teamRef = useRef(null);

    // ------------------- FETCH ABOUT DATA -------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAboutData();
                if (res && res.length > 0) {
                    const data = res[0];
                    setAboutData({
                        id: data.id || 1,
                        heading: data.heading?.length ? data.heading : [""],
                        sub_heading: data.sub_heading || "",
                        story_heading: data.story_heading || "",
                        story_description: data.story_description || "",
                        mission_heading: data.mission_heading || "",
                        mission_description: data.mission_description || "",
                        core_values: data.core_values?.length ? data.core_values : [{ name: "", text: "" }],
                        contact_heading: data.contact_heading || "",
                        contact_sub_heading: data.contact_sub_heading || "",
                        contact_service_role: data.contact_service_role?.length ? data.contact_service_role : [{ service: "" }],
                        mobile_number: data.mobile_number || "",
                        email: data.email || "",
                        address: data.address || "",
                        business_hours: data.business_hours?.length ? data.business_hours : [{ day: "", inTime: "", outTime: "" }],
                        social_media: data.social_media || { twitter: "", instagram: "", youtube: "", linkedin: "" },
                    });
                }
            } catch (err) {
                console.error("Error fetching About data:", err);
            }
        };
        fetchData();
    }, []);

    // ------------------- FORM HANDLERS -------------------
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMsg("");
        setErrorMsg("");
        if (!selectedService) {
            setErrorMsg("Please select a service!");
            return;
        }
        const payload = {
            your_name: formData.name,
            your_email: formData.email,
            your_number: formData.number,
            select_service: selectedService.label,
            your_message: formData.message,
        };
        try {
            setLoading(true);
            const res = await sendContactRequest(payload);
            setSuccessMsg(res.message || "Message sent successfully!");
            setFormData({ name: "", email: "", number: "", message: "" });
            setSelectedService(null);
        } catch (err) {
            setErrorMsg(err.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    // ------------------- STATIC VALUES -------------------
    const coreValues = aboutData.core_values.length
        ? aboutData.core_values
        : [
            { icon: <FaBullseye />, title: "Excellence", desc: "Delivering world-class IT solutions with precision." },
            { icon: <FaHandshake />, title: "Partnership", desc: "We collaborate with clients as trusted partners." },
            { icon: <FaRocket />, title: "Innovation", desc: "We innovate with modern technologies to stay ahead." },
            { icon: <FaLock />, title: "Integrity", desc: "Transparency and trust form the core of our work." },
        ];

    const services = aboutData.contact_service_role.length
        ? aboutData.contact_service_role.map((s) => ({ label: s.service }))
        : [
            { label: "Digital Media Marketing" },
            { label: "Script & Content Writing" },
            { label: "Web Development" },
            { label: "Content Creation" },
            { label: "Training Services" },
        ];

    const scrollToContact = () => {
        document.getElementById("contact-section").scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="relative bg-gray-50 min-h-screen overflow-hidden">
            <Dotted />

            {/* Hero Section */}
            <section className="relative py-28 text-white flex justify-center items-center">
                <div className="max-w-7xl mx-auto px-6 w-full flex justify-center relative z-10">
                    <div className="bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl p-12 text-center shadow-lg">
                        <h1 className="text-5xl font-extrabold mb-4">{aboutData.heading[0]}</h1>
                        <p className="text-gray-200 text-xl max-w-3xl mx-auto mb-8">{aboutData.sub_heading}</p>
                        <div className="flex justify-center">
                            <button
                                onClick={scrollToContact}
                                className="px-8 py-4 bg-emerald-500 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-emerald-600 transition"
                            >
                                Contact Us
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story + Mission + Values */}
            <section className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white/10 backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-lg space-y-6">
                    <h2 className="text-3xl font-bold text-gray-100">Our Story</h2>
                    <p className="text-gray-200">{aboutData.story_description}</p>

                    <h2 className="text-3xl font-bold text-gray-100 mt-6">Our Mission</h2>
                    <p className="text-gray-200">{aboutData.mission_description}</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-gray-100 mb-6">Our Core Values</h2>
                    <ul className="space-y-6">
                        {coreValues.map((val, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <div className="text-emerald-400 text-xl mt-1">{val.icon}</div>
                                <div>
                                    <h3 className="font-semibold text-gray-100">{val.name || val.title}</h3>
                                    <p className="text-gray-200">{val.text || val.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <div>
                <MeetOurTeam />
            </div>

            {/* Contact Section */}
            <section id="contact-section" className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">{aboutData.contact_heading}</h1>
                    <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                        {aboutData.contact_sub_heading}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <div className="bg-white/10 backdrop-blur-md border border-white/30 p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-bold mb-4 text-gray-100">Get In Touch</h2>
                        {successMsg && <p className="text-green-400 text-center mb-3">{successMsg}</p>}
                        {errorMsg && <p className="text-red-400 text-center mb-3">{errorMsg}</p>}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="relative">
                                <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your Name"
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 outline-none"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <FaRegEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your Email"
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 outline-none"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div className="relative">
                                <FaPhoneAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                                <input
                                    type="tel"
                                    name="number"
                                    value={formData.number || ""}
                                    onChange={handleChange}
                                    placeholder="Your Phone Number"
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 outline-none"
                                    required
                                />
                            </div>

                            {/* Dropdown */}
                            <div className="relative">
                                <FaComment className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                                <div
                                    className="w-full px-10 py-3 border rounded-lg flex justify-between items-center cursor-pointer hover:bg-white/5 transition bg-transparent text-white"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                >
                                    <div className="flex items-center gap-2">
                                        {selectedService ? selectedService.icon : null}
                                        <span>{selectedService ? selectedService.label : "Select a service"}</span>
                                    </div>
                                    <span>{dropdownOpen ? "▲" : "▼"}</span>
                                </div>
                                {dropdownOpen && (
                                    <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto text-gray-800">
                                        {services.map((service) => (
                                            <li
                                                key={service.label}
                                                className="px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => {
                                                    setSelectedService(service);
                                                    setDropdownOpen(false);
                                                }}
                                            >
                                                {service.icon}
                                                <span>{service.label}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Message */}
                            <div className="relative">
                                <FaComment className="absolute top-2 left-3 text-gray-300" />
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                    rows={5}
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 outline-none"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl shadow-md hover:bg-emerald-600 transition disabled:opacity-50"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Info Section */}
                    <div className="space-y-8">
                        {/* Contact Info */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/30 p-6 sm:p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-6 text-gray-100">{aboutData.contact_heading || "Contact Information"}</h2>
                            <ul className="space-y-4 text-gray-200">
                                <li className="flex items-center gap-3">
                                    <FaPhoneAlt className="text-emerald-400 flex-shrink-0" />
                                    <span className="truncate">{aboutData.mobile_number || "+91 2913160994"}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaEnvelope className="text-emerald-400 flex-shrink-0" />
                                    <span className="truncate">{aboutData.email || "NETGITSOLUTION@gmail.com"}</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <FaMapMarkerAlt className="text-emerald-400 flex-shrink-0" />
                                    <span className="truncate">{aboutData.address || "304, Modi Arcade, Jodhpur, Rajasthan, India"}</span>
                                </li>
                            </ul>
                        </div>

                        {/* Business Hours */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/30 p-6 sm:p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-6 text-gray-100">Business Hours</h2>
                            <ul className="space-y-2 text-gray-200">
                                {aboutData.business_hours.map((bh, idx) => (
                                    <li key={idx}>
                                        {bh.day}: {bh.inTime} - {bh.outTime}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Follow Us */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/30 p-6 sm:p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold mb-6 text-gray-100">Follow Us</h2>
                            <div className="flex gap-6 text-gray-200">
                                <a href={aboutData.social_media.linkedin || "#"} className="hover:text-emerald-400 transition transform hover:scale-110">
                                    <FaLinkedin size={24} />
                                </a>
                                <a href={aboutData.social_media.twitter || "#"} className="hover:text-emerald-400 transition transform hover:scale-110">
                                    <FaTwitter size={24} />
                                </a>
                                <a href={aboutData.social_media.youtube || "#"} className="hover:text-emerald-400 transition transform hover:scale-110">
                                    <FaYoutube size={24} />
                                </a>
                                <a href={aboutData.social_media.instagram || "#"} className="hover:text-emerald-400 transition transform hover:scale-110">
                                    <FaInstagram size={24} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
