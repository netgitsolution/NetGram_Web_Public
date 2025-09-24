import React, { useState } from "react";

export default function ServiceAdmin() {
    const [headingName, setHeadingName] = useState("");
    const [textName, setTextName] = useState("");
    const [cardData, setCardData] = useState({
        name: "",
        description: "",
        section: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Service Heading:", { headingName, textName });
        console.log("Card Data:", cardData);
        alert("Form submitted successfully!");

        // Reset fields
        setHeadingName("");
        setTextName("");
        setCardData({ name: "", description: "", section: "" });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-4xl space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
                    Service Admin Panel
                </h2>

                {/* Section 1: Heading & Text */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Heading & Text Section</h1>

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
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Service Card Section</h1>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Service Card Name
                        </label>
                        <input
                            type="text"
                            value={cardData.name}
                            onChange={(e) =>
                                setCardData({ ...cardData, name: e.target.value })
                            }
                            placeholder="Enter Service Card Name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Service Description
                        </label>
                        <textarea
                            value={cardData.description}
                            onChange={(e) =>
                                setCardData({ ...cardData, description: e.target.value })
                            }
                            placeholder="Enter Service Description"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            rows={4}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Service Section
                        </label>
                        <input
                            type="text"
                            value={cardData.section}
                            onChange={(e) =>
                                setCardData({ ...cardData, section: e.target.value })
                            }
                            placeholder="Enter Service Section"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
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