import React, { useState, useEffect } from "react";
import { FaUser, FaRegEnvelope, FaComment, FaPhone } from "react-icons/fa";
import Dotted from "../components/Dotted";
import { submitCareerForm } from "../api/careerApi";
import { getJoinUsData } from "../api/joinUsApi";

const JoinUs = () => {
    const [joinContent, setJoinContent] = useState({
        heading: "",
        sub_heading: "",
        Opportunities_heading: "",
        Opportunities_sub_heading: "",
        role: [],
        apply: [],
    });

    const [formData, setFormData] = useState({
        your_name: "",
        your_email: "",
        your_number: "",
        select_role: "",
        join_as: "",
        your_message: "",
        file: null,
    });

    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
    const [joinDropdownOpen, setJoinDropdownOpen] = useState(false);

    // ------------------- FETCH JOIN US DATA -------------------
    useEffect(() => {
        const fetchJoinData = async () => {
            try {
                const res = await getJoinUsData();
                if (res && res.length > 0) {
                    // assuming API returns an array, take first element
                    setJoinContent(res[0]);
                }
            } catch (err) {
                console.error("Failed to fetch join us data:", err);
            }
        };
        fetchJoinData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        if (!formData.file) {
            setErrorMsg("Please upload your CV before submitting");
            setLoading(false);
            return;
        }

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value) data.append(key, value);
            });

            const res = await submitCareerForm(data);
            setSuccessMsg(res.message);

            setFormData({
                your_name: "",
                your_email: "",
                your_number: "",
                select_role: "",
                join_as: "",
                your_message: "",
                file: null,
            });
        } catch (err) {
            console.error("Axios error:", err.response || err.message);
            setErrorMsg(err.response?.data?.message || err.message || "Failed to submit form");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative pt-9 min-h-screen bg-gray-900 text-white overflow-hidden">
            <Dotted />

            <div className="relative z-10 flex flex-col items-center justify-center py-20 px-4">

                {/* Hero Section */}
                <section className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
                        {joinContent.heading || "We Are Hiring!"}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
                        {joinContent.sub_heading || "Join our dynamic team and help us shape the future of digital transformation."}
                    </p>
                </section>

                {/* Form Section */}
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl max-w-2xl w-full">
                    <h2 className="text-4xl font-extrabold mb-2 text-center">
                        {joinContent.Opportunities_heading}
                    </h2>
                    <p className="text-center text-gray-300 mb-5">
                        {joinContent.Opportunities_sub_heading}
                    </p>

                    {successMsg && (
                        <p className="text-green-400 text-center mb-3">
                            {successMsg}
                        </p>
                    )}
                    {errorMsg && (
                        <p className="text-red-400 text-center mb-3">
                            {errorMsg}
                        </p>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {[
                            { name: "your_name", placeholder: "Your Name", icon: FaUser, type: "text" },
                            { name: "your_email", placeholder: "Your Email", icon: FaRegEnvelope, type: "email" },
                            { name: "your_number", placeholder: "Your Phone No", icon: FaPhone, type: "tel", pattern: "[0-9]{10}", maxLength: 10 },
                        ].map((field) => (
                            <div key={field.name} className="relative">
                                <field.icon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    required
                                    {...(field.pattern && { pattern: field.pattern })}
                                    {...(field.maxLength && { maxLength: field.maxLength })}
                                    className="w-full px-10 py-2 bg-white/20 border border-white/30 rounded-lg"
                                />
                            </div>
                        ))}

                        {/* Role Dropdown */}
                        <div className="relative">
                            <FaComment className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                            <div
                                className="w-full px-10 py-2 border border-white/30 rounded-lg flex justify-between items-center cursor-pointer bg-white/20 text-white"
                                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                            >
                                <span>{formData.select_role || "Select a Role"}</span>
                                <span>{roleDropdownOpen ? "▲" : "▼"}</span>
                            </div>
                            {roleDropdownOpen && (
                                <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto text-gray-800">
                                    {(joinContent.role.length ? joinContent.role : []).map((service, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setFormData((prev) => ({ ...prev, select_role: service }));
                                                setRoleDropdownOpen(false);
                                            }}
                                        >
                                            {service}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Join As Dropdown */}
                        <div className="relative">
                            <FaComment className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-300" />
                            <div
                                className="w-full px-10 py-2 border border-white/30 rounded-lg flex justify-between items-center cursor-pointer bg-white/20 text-white"
                                onClick={() => setJoinDropdownOpen(!joinDropdownOpen)}
                            >
                                <span>{formData.join_as || "Apply for"}</span>
                                <span>{joinDropdownOpen ? "▲" : "▼"}</span>
                            </div>
                            {joinDropdownOpen && (
                                <ul className="absolute w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-10 max-h-60 overflow-y-auto text-gray-800">
                                    {(joinContent.apply.length ? joinContent.apply : []).map((join, index) => (
                                        <li
                                            key={index}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                            onClick={() => {
                                                setFormData((prev) => ({ ...prev, join_as: join }));
                                                setJoinDropdownOpen(false);
                                            }}
                                        >
                                            {join}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Message */}
                        <div className="relative">
                            <FaComment className="absolute top-2 left-3 text-gray-300" />
                            <textarea
                                name="your_message"
                                value={formData.your_message}
                                onChange={handleChange}
                                placeholder="Your Message"
                                rows={5}
                                className="w-full px-10 py-2 bg-white/20 border border-white/30 rounded-lg"
                            ></textarea>
                        </div>

                        {/* Upload CV */}
                        <div>
                            <label className="block mb-1 font-medium text-green-400">
                                Upload CV <span className="text-sm">(PDF/DOC)</span>
                            </label>
                            <input
                                type="file"
                                name="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !formData.file}
                            className="w-full px-6 py-3 bg-emerald-500 text-white font-semibold rounded-xl"
                        >
                            {loading ? "Submitting..." : "Submit Application"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default JoinUs;