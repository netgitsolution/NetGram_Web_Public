import React, { useState, useEffect } from "react";
import { FaUser, FaRegEnvelope, FaComment, FaPhone } from "react-icons/fa";
import {
    FaLaptopCode,
    FaBullseye,
    FaChartLine,
    FaPaintBrush,
    FaVideo,
} from "react-icons/fa";
import Dotted from "../components/Dotted";
import { getProjects, submitProjectRequest } from "../api/projectApi";

const categories = [
    "All Projects",
    "Web Development",
    "Digital Marketing",
    "Branding",
    "Video",
    "Social Media",
    "Content Creation",
];

// Sample projects
const sampleProjects = [
    { id: 1, title: "E-commerce Platform", description: "Custom e-commerce solution with advanced features", category: "Web Development", icon: <FaLaptopCode size={40} className="text-emerald-500" /> },
    { id: 2, title: "Digital Marketing Campaign", description: "Comprehensive marketing strategy resulting in 300% lead increase", category: "Digital Marketing", icon: <FaChartLine size={40} className="text-emerald-500" /> },
    { id: 3, title: "Brand Identity Design", description: "Complete brand redesign and visual identity system", category: "Branding", icon: <FaPaintBrush size={40} className="text-emerald-500" /> },
    { id: 4, title: "Corporate Website", description: "Responsive corporate website with CMS integration", category: "Web Development", icon: <FaLaptopCode size={40} className="text-emerald-500" /> },
    { id: 5, title: "Social Media Strategy", description: "Social media management increasing engagement by 250%", category: "Social Media", icon: <FaBullseye size={40} className="text-emerald-500" /> },
    { id: 6, title: "Video Production", description: "Professional video content for marketing campaigns", category: "Video", icon: <FaVideo size={40} className="text-emerald-500" /> },
    { id: 7, title: "Content Creation", description: "High-quality content generation for blogs, social media, and campaigns", category: "Content Creation", icon: <FaBullseye size={40} className="text-emerald-500" /> },
];

const PortfolioPage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Projects");
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        project_type: "Web Development",
        project_details: ""
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedProjectType, setSelectedProjectType] = useState("Select  ");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        setProjects(sampleProjects);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMsg("");
        setErrorMsg("");
        try {
            const res = await submitProjectRequest(formData);
            setSuccessMsg(res.message || "Project request submitted successfully!");
            setFormData({ full_name: "", email: "", phone: "", project_type: "Web Development", project_details: "" });
            setSelectedProjectType("Select  ");
        } catch (err) {
            setErrorMsg(err.message || "Failed to submit project request");
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = selectedCategory === "All Projects"
        ? projects
        : projects.filter((project) => project.category === selectedCategory);

    return (
        <div className="relative pt-9 min-h-screen text-white">
            <Dotted className="absolute inset-0 w-full h-full -z-10" />

            {/* Hero Section */}
            <section className="text-center py-20">
                <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Portfolio</h1>
                    <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
                        Showcasing our expertise through successful client projects
                    </p>
                </div>
            </section>

            {/* Categories */}
            <div className="max-w-4xl mx-auto px-4 relative z-10 flex flex-wrap justify-center gap-4">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-5 py-2 rounded-full font-medium border transition-all duration-200
                        ${selectedCategory === cat
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : "bg-transparent border-gray-500 text-gray-200 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl"
                    >
                        <div className="mb-4">{project.icon}</div>
                        <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                        <p className="text-gray-300">{project.description}</p>
                        <span className="mt-4 inline-block text-sm font-medium text-emerald-400">{project.category}</span>
                    </div>
                ))}
            </section>

            {/* CTA Section with Form */}
            <section className="text-center py-10">
                <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">Ready to Discuss Your Project?</h2>
                    <p className="mb-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
                        Let's discuss how we can help transform your digital presence
                    </p>

                    {successMsg && <p className="text-green-400 text-center mb-3">{successMsg}</p>}
                    {errorMsg && <p className="text-red-400 text-center mb-3">{errorMsg}</p>}

                    <form className="max-w-2xl mx-auto space-y-6 text-left" onSubmit={handleSubmit}>
                        {/* Full Name */}
                        <div className="relative">
                            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                            <input
                                type="text"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full pl-10 px-4 py-3 rounded-lg outline-none bg-white/20 text-white border border-white/30 placeholder-gray-300 focus:ring-2 focus:ring-emerald-400"
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
                                placeholder="Enter your email"
                                required
                                className="w-full pl-10 px-4 py-3 rounded-lg outline-none bg-white/20 text-white border border-white/30 placeholder-gray-300 focus:ring-2 focus:ring-emerald-400"
                            />
                        </div>

                        {/* Phone */}
                        <div className="relative">
                            <FaPhone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                            <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number || ""}
                                onChange={handleChange}
                                placeholder="Enter your phone number"
                                required
                                className="w-full pl-10 px-4 py-3 rounded-lg outline-none bg-white/20 text-white border border-white/30 placeholder-gray-300 focus:ring-2 focus:ring-emerald-400"
                            />
                        </div>

                        {/* Project Type Dropdown */}
                        <div className="relative">
                            <FaComment className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                            <div
                                className="w-full pl-10 px-4 py-3 border rounded-lg flex justify-between items-center cursor-pointer hover:bg-white/5 transition bg-white/20 text-white"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <span>{selectedProjectType}</span>
                                <span>{dropdownOpen ? "▲" : "▼"}</span>
                            </div>

                            {dropdownOpen && (
                                <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto text-gray-800">
                                    {categories.filter(cat => cat !== "All Projects").map(cat => (
                                        <li
                                            key={cat}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setSelectedProjectType(cat);
                                                setFormData(prev => ({ ...prev, project_type: cat }));
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            {cat}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Project Details */}
                        <div className="relative">
                            <FaComment className="absolute top-2 left-3 text-gray-300" />
                            <textarea
                                rows="5"
                                name="project_details"
                                value={formData.project_details}
                                onChange={handleChange}
                                placeholder="Describe your project..."
                                required
                                className="w-full pl-10 px-4 py-3 rounded-lg outline-none bg-white/20 text-white border border-white/30 placeholder-gray-300 focus:ring-2 focus:ring-emerald-400"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl shadow-md hover:bg-emerald-700 transition"
                        >
                            {loading ? "Submitting..." : "Submit Project Inquiry"}
                        </button>
                    </form>
                </div>
            </section>

        </div>
    );
};

export default PortfolioPage;
