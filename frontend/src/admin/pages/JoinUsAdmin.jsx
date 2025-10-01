import React, { useState } from "react";

export default function JoinUsAdmin() {
    const [headingName, setHeadingName] = useState("");
    const [textName, setTextName] = useState("");
    const [opportunityHeading, setOpportunityHeading] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        roles: [""],       // multiple roles
        applyRoles: [""],  // multiple apply roles
        message: "",
        file: null,
    });

    const handleChange = (e, index, field) => {
        const { value } = e.target;
        const updated = [...formData[field]];
        updated[index] = value;

        setFormData({
            ...formData,
            [field]: updated,
        });
    };

    const addField = (field) => {
        setFormData({
            ...formData,
            [field]: [...formData[field], ""],
        });
    };

    const removeField = (field, index) => {
        const updated = [...formData[field]];
        updated.splice(index, 1);
        setFormData({
            ...formData,
            [field]: updated,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Heading & Text:", { headingName, textName });
        console.log("Opportunities Heading:", opportunityHeading);
        console.log("Opportunities Form:", formData);
        alert("Form submitted successfully!");

        // Reset fields
        setHeadingName("");
        setTextName("");
        setOpportunityHeading("");
        setFormData({
            name: "",
            email: "",
            phone: "",
            roles: [""],
            applyRoles: [""],
            message: "",
            file: null,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-4xl space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
                    Join Us Admin Panel
                </h2>

                {/* Section 1: Heading & Text */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">
                        Heading & Text Section
                    </h1>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Heading Name
                        </label>
                        <input
                            type="text"
                            value={headingName}
                            onChange={(e) => setHeadingName(e.target.value)}
                            placeholder="Enter heading name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">
                            Text Name
                        </label>
                        <textarea
                            value={textName}
                            onChange={(e) => setTextName(e.target.value)}
                            placeholder="Enter text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}
                            required
                        />
                    </div>
                </div>

                {/* Section 2: Opportunities & Apply Form */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">
                        Opportunities & Apply Section
                    </h1>

                    {/* Roles Section */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Select Role(s)
                        </label>
                        {formData.roles.map((role, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={role}
                                    onChange={(e) => handleChange(e, index, "roles")}
                                    placeholder="Enter role (e.g., Designer, Developer)"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeField("roles", index)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    disabled={formData.roles.length === 1}
                                >
                                    -
                                </button>
                                {index === formData.roles.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={() => addField("roles")}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Apply Roles Section */}
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Apply Role(s)
                        </label>
                        {formData.applyRoles.map((applyRole, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={applyRole}
                                    onChange={(e) => handleChange(e, index, "applyRoles")}
                                    placeholder="Enter role you want to apply for"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeField("applyRoles", index)}
                                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                    disabled={formData.applyRoles.length === 1}
                                >
                                    -
                                </button>
                                {index === formData.applyRoles.length - 1 && (
                                    <button
                                        type="button"
                                        onClick={() => addField("applyRoles")}
                                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                    >
                                        +
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full sm:w-1/2 lg:w-1/3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Save Join Us Data
                    </button>
                </div>
            </div>
        </div>
    );
}