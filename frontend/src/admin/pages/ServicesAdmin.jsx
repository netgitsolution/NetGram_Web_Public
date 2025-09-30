import React, { useState } from "react";

export default function ServiceAdmin() {
    const [headingName, setHeadingName] = useState("");
    const [textName, setTextName] = useState("");
    const [cards, setCards] = useState([
        { name: "", description: "", section: "" },
    ]);
    const [flexibleData, setFlexibleData] = useState({
        heading: "",
        text: "",
    });

    const handleCardChange = (index, field, value) => {
        const updatedCards = [...cards];
        updatedCards[index][field] = value;
        setCards(updatedCards);
    };

    const addCard = () => {
        setCards([...cards, { name: "", description: "", section: "" }]);
    };

    const removeCard = (index) => {
        if (cards.length === 1) return; // Always keep at least 1 card
        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Service Heading:", { headingName, textName });
        console.log("Service Cards:", cards);
        console.log("Flexible Section Data:", flexibleData);
        alert("Form submitted successfully!");

        // Reset fields
        setHeadingName("");
        setTextName("");
        setCards([{ name: "", description: "", section: "" }]);
        setFlexibleData({ heading: "", text: "" });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-4xl space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
                    Service Admin Panel
                </h2>

                {/* Section 1: Heading & Text */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">
                        Heading & Text Section
                    </h1>
                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Service Heading Name
                        </label>
                        <input
                            type="text"
                            value={headingName}
                            onChange={(e) => setHeadingName(e.target.value)}
                            placeholder="Enter Service Heading Name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Service Text Name
                        </label>
                        <textarea
                            value={textName}
                            onChange={(e) => setTextName(e.target.value)}
                            placeholder="Enter Service Text Name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            required
                        />
                    </div>
                </div>

                {/* Section 2: Service Card Details */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">
                        Service Card Section
                    </h1>

                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-lg p-4 mb-4 relative"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="font-semibold text-lg">
                                    Card #{index + 1}
                                </h2>
                                <div className="space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => removeCard(index)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        -
                                    </button>
                                    {index === cards.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={addCard}
                                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                                        >
                                            +
                                        </button>
                                    )}
                                </div>
                            </div>

                            <div className="mb-2">
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Service Card Name
                                </label>
                                <input
                                    type="text"
                                    value={card.name}
                                    onChange={(e) =>
                                        handleCardChange(index, "name", e.target.value)
                                    }
                                    placeholder="Enter Service Card Name"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>

                            <div className="mb-2">
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Service Description
                                </label>
                                <textarea
                                    value={card.description}
                                    onChange={(e) =>
                                        handleCardChange(index, "description", e.target.value)
                                    }
                                    placeholder="Enter Service Description"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">
                                    Service Section
                                </label>
                                <input
                                    type="text"
                                    value={card.section}
                                    onChange={(e) =>
                                        handleCardChange(index, "section", e.target.value)
                                    }
                                    placeholder="Enter Service Section"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Section 3: Flexible Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Flexible Section</h1>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Flexible Heading
                        </label>
                        <input
                            type="text"
                            value={flexibleData.heading}
                            onChange={(e) =>
                                setFlexibleData({ ...flexibleData, heading: e.target.value })
                            }
                            placeholder="Enter Flexible Heading"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Flexible Text
                        </label>
                        <textarea
                            value={flexibleData.text}
                            onChange={(e) =>
                                setFlexibleData({ ...flexibleData, text: e.target.value })
                            }
                            placeholder="Enter Flexible Text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            rows={3}
                            required
                        />
                    </div>
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