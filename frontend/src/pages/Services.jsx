import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Dotted from "../components/Dotted";
import { getServiceData } from "../api/serviceApi";

const ServicesPage = () => {
    const navigate = useNavigate();

    const emptyData = {
        heading: "",
        sub_heading: "",
        service_card: [
            { project_name: "", project_description: "", project_category_list: [] },
        ],
        flexible_heading: "",
        flexible_text: "",
    };

    const [heading, setHeading] = useState(emptyData.heading);
    const [subHeading, setSubHeading] = useState(emptyData.sub_heading);
    const [cards, setCards] = useState(emptyData.service_card);
    const [flexibleData, setFlexibleData] = useState({
        heading: emptyData.flexible_heading,
        text: emptyData.flexible_text,
    });

    // ------------------- FETCH DATA ON MOUNT -------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getServiceData();
                if (res && res.length > 0) {
                    const data = res[0];

                    setHeading(data.heading || "");
                    setSubHeading(data.sub_heading || "");
                    setCards(
                        data.service_card?.map((card) => ({
                            project_name: card.project_name || "",
                            project_description: card.project_description || "",
                            project_category_list: card.project_category_list || [],
                        })) || []
                    );
                    setFlexibleData({
                        heading: data.flexible_heading || "",
                        text: data.flexible_text || "",
                    });
                }
            } catch (error) {
                console.error("Error fetching service data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="relative pt-9 min-h-screen text-white">
            {/* Glass Dotted Background */}
            <Dotted className="absolute inset-0 w-full h-full -z-10" />

            {/* Hero Section */}
            <section className="text-center py-20">
                <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{heading}</h1>
                    <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
                        {subHeading}
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-lg"
                    >
                        <h3 className="text-xl font-semibold mb-3 text-white">
                            {card.project_name}
                        </h3>
                        <p className="text-gray-300 mb-5">{card.project_description}</p>
                        {card.project_category_list?.length > 0 && (
                            <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                                {card.project_category_list.map((point, idx) => (
                                    <li key={idx}>{point}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </section>

            {/* Flexible Section / CTA */}
            {flexibleData.heading && (
                <section className="text-center py-20">
                    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {flexibleData.heading}
                        </h2>
                        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                            {flexibleData.text}
                        </p>
                        <button
                            className="px-8 py-4 bg-emerald-500 text-white rounded-xl font-semibold shadow-md hover:bg-emerald-600 transition"
                            onClick={() => navigate("/about")}
                        >
                            Request Quote
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ServicesPage;