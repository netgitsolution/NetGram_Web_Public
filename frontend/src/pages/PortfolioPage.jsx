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
import { submitProjectRequest } from "../api/projectApi";
import { getPortfolioData } from '../api/portfolioApi';

const categories = [
    "All Projects",
    "Web Development",
    "Digital Marketing",
    "Branding",
    "Video",
    "Social Media",
    "Content Creation",
];

const PortfolioPage = () => {
    const emptyData = {
        id: 1,
        heading: "",
        sub_heading: "",
        project_category: ["All Projects"],
        project: [
            { id: 0, project_name: "", project_description: "", project_stack: "", project_category_name: "All Projects" }
        ],
        team_heading: "",
        team_sub_heading: "",
        team_role: [{ role_name: "" }],
    };

    const [heading, setHeading] = useState(emptyData.heading);
    const [subHeading, setSubHeading] = useState(emptyData.sub_heading);
    const [projects, setProjects] = useState(emptyData.project);
    const [teamHeading, setTeamHeading] = useState(emptyData.team_heading);
    const [teamSubHeading, setTeamSubHeading] = useState(emptyData.team_sub_heading);
    const [teamRoles, setTeamRoles] = useState(emptyData.team_role);

    const [selectedCategory, setSelectedCategory] = useState("All Projects");
    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone_number: "",
        project_type: "",
        project_details: ""
    });
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedProjectType, setSelectedProjectType] = useState("Select Role");
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPortfolioData();
                if (res && res.length > 0) {
                    const data = res[0];

                    setHeading(data.heading || "");
                    setSubHeading(data.sub_heading || "");
                    setTeamHeading(data.team_heading || "");
                    setTeamSubHeading(data.team_sub_heading || "");
                    setTeamRoles(data.team_role || [{ role_name: "" }]);

                    setProjects(
                        data.project?.map((p, index) => ({
                            id: p.id ?? index,
                            title: p.project_name || "",
                            description: p.project_description || "",
                            category: p.project_category_name || "All Projects",
                            icon: getProjectIcon(p.project_category_name),
                        })) || []
                    );
                }
            } catch (err) {
                console.error("Error fetching portfolio data:", err);
            }
        };

        fetchData();
    }, []);

    const getProjectIcon = (category) => {
        switch (category) {
            case "Web Development": return <FaLaptopCode size={40} className="text-emerald-500" />;
            case "Digital Marketing": return <FaChartLine size={40} className="text-emerald-500" />;
            case "Branding": return <FaPaintBrush size={40} className="text-emerald-500" />;
            case "Social Media": return <FaBullseye size={40} className="text-emerald-500" />;
            case "Video": return <FaVideo size={40} className="text-emerald-500" />;
            case "Content Creation": return <FaBullseye size={40} className="text-emerald-500" />;
            default: return <FaLaptopCode size={40} className="text-emerald-500" />;
        }
    };

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
            setFormData({ full_name: "", email: "", phone_number: "", project_type: "", project_details: "" });
            setSelectedProjectType("Select Role");
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
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{heading}</h1>
                    <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">{subHeading}</p>
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
                {filteredProjects.map((project, index) => (
                    <div
                        key={`${project.id}-${index}`}
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
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">{teamHeading || "Ready to Discuss Your Project?"}</h2>
                    <p className="mb-6 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">{teamSubHeading || "Let's discuss how we can help transform your digital presence"}</p>

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

                        {/* Role Dropdown */}
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
                                    {teamRoles.map((role, idx) => (
                                        <li
                                            key={idx}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setSelectedProjectType(role.role_name);
                                                setFormData(prev => ({ ...prev, project_type: role.role_name }));
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            {role.role_name}
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