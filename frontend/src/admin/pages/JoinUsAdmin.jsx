import React, { useState, useEffect } from "react";
import { submitJoinUsData, getJoinUsData } from "../../api/joinUsApi";

export default function JoinUsAdmin() {
    // ------------------- EMPTY FALLBACK -------------------
    const emptyData = {
        id: 1,
        heading: "",
        sub_heading: "",
        Opportunities_heading: "",
        Opportunities_sub_heading: "",
        role: [""],
        apply: [""],
    };

    // ------------------- STATES -------------------
    const [headingName, setHeadingName] = useState(emptyData.heading);
    const [subHeading, setSubHeading] = useState(emptyData.sub_heading);
    const [opportunitiesHeading, setOpportunitiesHeading] = useState(emptyData.Opportunities_heading);
    const [opportunitiesSubHeading, setOpportunitiesSubHeading] = useState(emptyData.Opportunities_sub_heading);
    const [roles, setRoles] = useState(emptyData.role);
    const [applyRoles, setApplyRoles] = useState(emptyData.apply);

    // ------------------- FETCH DATA ON MOUNT -------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getJoinUsData(); // fetch from API
                if (res && res.length > 0) {
                    const data = res[0]; // assuming API returns array
                    setHeadingName(data.heading || "");
                    setSubHeading(data.sub_heading || "");
                    setOpportunitiesHeading(data.Opportunities_heading || "");
                    setOpportunitiesSubHeading(data.Opportunities_sub_heading || "");
                    setRoles(data.role || [""]);
                    setApplyRoles(data.apply || [""]);
                }
            } catch (error) {
                console.error("Error fetching Join Us data:", error);
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
            sub_heading: subHeading,
            Opportunities_heading: opportunitiesHeading,
            Opportunities_sub_heading: opportunitiesSubHeading,
            role: roles,
            apply: applyRoles,
        };

        try {
            const res = await submitJoinUsData(payload);
            alert(res.message || "Data submitted successfully!");

            // update state with response
            if (res.data) {
                setHeadingName(res.data.heading || "");
                setSubHeading(res.data.sub_heading || "");
                setOpportunitiesHeading(res.data.Opportunities_heading || "");
                setOpportunitiesSubHeading(res.data.Opportunities_sub_heading || "");
                setRoles(res.data.role || [""]);
                setApplyRoles(res.data.apply || [""]);
            }
        } catch (error) {
            console.error("Error submitting Join Us data:", error);
            alert(error.message || "Something went wrong!");
        }
    };

    // ------------------- HANDLERS -------------------
    const addField = (field) => {
        if (field === "roles") setRoles([...roles, ""]);
        else setApplyRoles([...applyRoles, ""]);
    };

    const removeField = (field, index) => {
        if (field === "roles") {
            const newRoles = roles.filter((_, i) => i !== index);
            setRoles(newRoles.length ? newRoles : [""]);
        } else {
            const newApplyRoles = applyRoles.filter((_, i) => i !== index);
            setApplyRoles(newApplyRoles.length ? newApplyRoles : [""]);
        }
    };

    const handleFieldChange = (field, index, value) => {
        if (field === "roles") {
            const updated = [...roles];
            updated[index] = value;
            setRoles(updated);
        } else {
            const updated = [...applyRoles];
            updated[index] = value;
            setApplyRoles(updated);
        }
    };

    // ------------------- JSX -------------------
    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-4xl space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
                    Join Us Admin Panel
                </h2>

                {/* Heading & Subheading */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">
                        Heading & Subheading
                    </h1>
                    <input
                        type="text"
                        value={headingName}
                        onChange={(e) => setHeadingName(e.target.value)}
                        placeholder="Heading"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        value={subHeading}
                        onChange={(e) => setSubHeading(e.target.value)}
                        placeholder="Subheading"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    ></textarea>
                </div>

                {/* Opportunities Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">
                        Opportunities
                    </h1>
                    <input
                        type="text"
                        value={opportunitiesHeading}
                        onChange={(e) => setOpportunitiesHeading(e.target.value)}
                        placeholder="Opportunities Heading"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <textarea
                        value={opportunitiesSubHeading}
                        onChange={(e) => setOpportunitiesSubHeading(e.target.value)}
                        placeholder="Opportunities Subheading"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={3}
                    ></textarea>
                </div>

                {/* Roles */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Roles</h1>
                    {roles.map((role, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={role}
                                onChange={(e) => handleFieldChange("roles", index, e.target.value)}
                                placeholder="Enter role"
                                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeField("roles", index)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                disabled={roles.length === 1}
                            >
                                -
                            </button>
                            {index === roles.length - 1 && (
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

                {/* Apply Roles */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Apply Roles</h1>
                    {applyRoles.map((applyRole, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={applyRole}
                                onChange={(e) =>
                                    handleFieldChange("applyRoles", index, e.target.value)
                                }
                                placeholder="Enter apply role"
                                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                type="button"
                                onClick={() => removeField("applyRoles", index)}
                                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                disabled={applyRoles.length === 1}
                            >
                                -
                            </button>
                            {index === applyRoles.length - 1 && (
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
