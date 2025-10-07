import React, { useState, useEffect } from "react";
import { submitServiceData, getServiceData } from "../../api/serviceApi";

export default function ServiceAdmin() {
    const emptyData = {
        id: 1,
        heading: "",
        sub_heading: "",
        service_card: [{ project_name: "", project_description: "", project_category_list: [] }],
        flexible_heading: "",
        flexible_text: "",
    };

    const [headingName, setHeadingName] = useState("");
    const [subHeadingName, setSubHeadingName] = useState("");
    const [cards, setCards] = useState([{ name: "", description: "", sectionList: [], sectionString: "" }]);
    const [flexibleData, setFlexibleData] = useState({ heading: "", text: "" });

    // ------------------- FETCH DATA ON MOUNT -------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getServiceData();
                if (res && res.length > 0) {
                    const data = res[0];

                    setHeadingName(data.heading || "");
                    setSubHeadingName(data.sub_heading || "");
                    setCards(
                        data.service_card?.map((card) => ({
                            name: card.project_name || "",
                            description: card.project_description || "",
                            sectionList: card.project_category_list || [],
                            sectionString: card.project_category_list?.join(", ") || "",
                        })) || [{ name: "", description: "", sectionList: [], sectionString: "" }]
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

    // ------------------- FORM SUBMIT -------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            id: 1,
            heading: headingName,
            sub_heading: subHeadingName,
            service_card: cards.map((card) => ({
                project_name: card.name,
                project_description: card.description,
                project_category_list: card.sectionList,
            })),
            flexible_heading: flexibleData.heading,
            flexible_text: flexibleData.text,
        };

        try {
            const res = await submitServiceData(payload);
            alert(res.message || "Data submitted successfully!");

            if (res.data) {
                const data = res.data;
                setHeadingName(data.heading || "");
                setSubHeadingName(data.sub_heading || "");
                setCards(
                    data.service_card?.map((card) => ({
                        name: card.project_name || "",
                        description: card.project_description || "",
                        sectionList: card.project_category_list || [],
                        sectionString: card.project_category_list?.join(", ") || "",
                    })) || [{ name: "", description: "", sectionList: [], sectionString: "" }]
                );
                setFlexibleData({
                    heading: data.flexible_heading || "",
                    text: data.flexible_text || "",
                });
            }
        } catch (error) {
            console.error("Error submitting service data:", error);
            alert(error.message || "Something went wrong!");
        }
    };

    // ------------------- CARD HANDLERS -------------------
    const handleCardChange = (index, field, value) => {
        const updatedCards = [...cards];
        updatedCards[index][field] = value;
        setCards(updatedCards);
    };

    const addCard = () => setCards([...cards, { name: "", description: "", sectionList: [], sectionString: "" }]);
    const removeCard = (index) => {
        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards.length ? updatedCards : [{ name: "", description: "", sectionList: [], sectionString: "" }]);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-4xl space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
                    Service Admin Panel
                </h2>

                {/* Heading Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Heading & Subheading</h1>
                    <div>
                        <input
                            type="text"
                            value={headingName}
                            onChange={(e) => setHeadingName(e.target.value)}
                            placeholder="Service Heading"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={subHeadingName}
                            onChange={(e) => setSubHeadingName(e.target.value)}
                            placeholder="Service Subheading"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>

                {/* Service Cards */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Service Cards</h1>
                    {cards.map((card, index) => (
                        <div key={index} className="border border-gray-300 rounded-lg p-4 mb-4 relative">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-semibold text-lg">Card #{index + 1}</h2>
                                <div className="space-x-2">
                                    <button type="button" onClick={() => removeCard(index)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">-</button>
                                    {index === cards.length - 1 && (
                                        <button type="button" onClick={addCard} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">+</button>
                                    )}
                                </div>
                            </div>
                            <input
                                type="text"
                                value={card.name}
                                onChange={(e) => handleCardChange(index, "name", e.target.value)}
                                placeholder="Card Name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
                                required
                            />
                            <textarea
                                value={card.description}
                                onChange={(e) => handleCardChange(index, "description", e.target.value)}
                                placeholder="Card Description"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mb-2"
                                rows={3}
                                required
                            />
                            <textarea
                                value={card.sectionString}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const list = value.split(",").map(i => i.trim()).filter(Boolean);
                                    handleCardChange(index, "sectionString", value);
                                    handleCardChange(index, "sectionList", list);
                                }}
                                placeholder="Categories (comma separated)"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                rows={2}
                            />
                        </div>
                    ))}
                </div>

                {/* Flexible Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Flexible Section</h1>
                    <input
                        type="text"
                        value={flexibleData.heading}
                        onChange={(e) => setFlexibleData({ ...flexibleData, heading: e.target.value })}
                        placeholder="Flexible Heading"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                        required
                    />
                    <textarea
                        value={flexibleData.text}
                        onChange={(e) => setFlexibleData({ ...flexibleData, text: e.target.value })}
                        placeholder="Flexible Text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={3}
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full sm:w-1/2 lg:w-1/3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Save Service Data
                    </button>
                </div>
            </div>
        </div>
    );
}