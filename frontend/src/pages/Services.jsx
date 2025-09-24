import React from "react";
import {
    FaChartLine,
    FaPenNib,
    FaLaptopCode,
    FaPaintBrush,
    FaGraduationCap,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Dotted from "../components/Dotted";

const servicesData = [
    {
        id: 1,
        icon: <FaChartLine size={40} className="text-emerald-400" />,
        title: "Digital Media Marketing",
        description:
            "Comprehensive digital marketing strategies to boost your online presence and drive conversions.",
        points: [
            "SEO Optimization",
            "Social Media Management",
            "PPC Campaigns",
            "Content Marketing",
            "Analytics & Reporting",
        ],
    },
    {
        id: 2,
        icon: <FaPenNib size={40} className="text-pink-400" />,
        title: "Script & Content Writing",
        description:
            "Professional content creation services for all your business communication needs.",
        points: [
            "Website Copy",
            "Blog Articles",
            "Marketing Scripts",
            "Technical Documentation",
            "Social Media Content",
        ],
    },
    {
        id: 3,
        icon: <FaLaptopCode size={40} className="text-purple-400" />,
        title: "Web Development",
        description:
            "Custom website development solutions using modern technologies and best practices.",
        points: [
            "Responsive Design",
            "E-commerce Solutions",
            "CMS Integration",
            "API Development",
            "Maintenance & Support",
        ],
    },
    {
        id: 4,
        icon: <FaPaintBrush size={40} className="text-yellow-400" />,
        title: "Content Creation",
        description:
            "Creative visual and multimedia content to engage your audience effectively.",
        points: [
            "Graphic Design",
            "Video Production",
            "Photography",
            "Infographics",
            "Brand Identity",
        ],
    },
    {
        id: 5,
        icon: <FaGraduationCap size={40} className="text-red-400" />,
        title: "Training Services",
        description:
            "Professional IT training programs to upskill your team and improve productivity.",
        points: [
            "Technical Training",
            "Digital Marketing Workshops",
            "Web Development Courses",
            "Custom Curricula",
            "Certification Programs",
        ],
    },
];

const ServicesPage = () => {
    const navigate = useNavigate();

    return (
        <div className="relative pt-9 min-h-screen text-white">
            {/* Glass Dotted Background */}
            <Dotted className="absolute inset-0 w-full h-full -z-10" />

            {/* Hero Section */}
            <section className="text-center py-20">
                <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                        Our Services
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
                        Comprehensive IT solutions tailored to your business needs
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {servicesData.map((service) => (
                    <div
                        key={service.id}
                        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-lg"
                    >
                        <div className="mb-6">{service.icon}</div>
                        <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                        <p className="text-gray-300 mb-5">{service.description}</p>
                        <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                            {service.points.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                        <button
                            className="px-6 py-2 border border-emerald-400 text-emerald-400 rounded-lg font-medium hover:bg-emerald-500 hover:text-white transition"
                            onClick={() => navigate("/contact")}
                        >
                            Contact Us
                        </button>
                    </div>
                ))}
            </section>

            {/* CTA Section */}
            <section className="text-center py-20">
                <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Flexible Pricing Options
                    </h2>
                    <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                        We offer customized pricing based on your specific requirements.
                        Contact us for a detailed quote tailored to your business needs.
                    </p>
                    <button
                        className="px-8 py-4 bg-emerald-500 text-white rounded-xl font-semibold shadow-md hover:bg-emerald-600 transition"
                        onClick={() => navigate("/about")}
                    >
                        Request Quote
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;