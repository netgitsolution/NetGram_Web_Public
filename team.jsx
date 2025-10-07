import React, { useState, useEffect, useRef } from "react";
import { getTeamData, submitTeamData } from "../../api/teamApi";

export default function TeamAdmin() {
    const emptyMember = {
        id: null,
        name: "",
        role: "",
        img: "",
        linkedin: "",
        twitter: "",
    };

    const [team, setTeam] = useState([emptyMember]);

    // refs for file inputs
    const fileInputRefs = useRef({});

    // ------------------- FETCH DATA ON MOUNT -------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTeamData(); // API call

                if (res && res.length > 0) {
                    const data = res.map(member => ({
                        id: member.id || Date.now(),
                        name: member.name || "",
                        role: member.role || "",
                        img: member.img || "",
                        linkedin: member.linkedin || "",
                        twitter: member.twitter || "",
                    }));
                    setTeam(data);
                }
            } catch (error) {
                console.error("Error fetching team data:", error);
            }
        };

        fetchData();
    }, []);

    // ------------------- HANDLE CHANGES -------------------
    const handleChange = (index, field, value) => {
        const updatedTeam = [...team];
        updatedTeam[index][field] = value;
        setTeam(updatedTeam);
    };

    const handleImageUpload = (index, file) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleChange(index, "img", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = (index) => {
        handleChange(index, "img", "");
        if (fileInputRefs.current[index]) {
            fileInputRefs.current[index].value = "";
        }
    };

    // ------------------- ADD / REMOVE MEMBERS -------------------
    const addMember = () => {
        setTeam([...team, { ...emptyMember, id: Date.now() }]);
    };

    const removeMember = (index) => {
        const updatedTeam = [...team];
        updatedTeam.splice(index, 1);
        setTeam(updatedTeam.length ? updatedTeam : [emptyMember]);
    };

    // ------------------- SUBMIT FORM -------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = team.map(member => ({
            id: member.id || Date.now(),
            name: member.name,
            role: member.role,
            img: member.img,
            linkedin: member.linkedin,
            twitter: member.twitter,
        }));

        try {
            const res = await submitTeamData(payload);
            alert(res.message || "Team data submitted!");

            // update state with returned data
            if (res.data) {
                setTeam(
                    res.data.map(member => ({
                        id: member.id || Date.now(),
                        name: member.name || "",
                        role: member.role || "",
                        img: member.img || "",
                        linkedin: member.linkedin || "",
                        twitter: member.twitter || "",
                    }))
                );
            }
        } catch (error) {
            console.error("Error submitting team data:", error);
            alert(error.message || "Something went wrong!");
        }
    };

    // ------------------- JSX -------------------
    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-8">
                <h1 className="text-3xl font-bold text-center mb-6">Team Admin Panel</h1>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {team.map((member, index) => (
                        <div
                            key={member.id || index}
                            className="border p-4 rounded-lg shadow-sm space-y-4 relative"
                        >
                            <h2 className="text-xl font-semibold">Team Member {index + 1}</h2>

                            <input
                                type="text"
                                placeholder="Name"
                                value={member.name}
                                onChange={(e) => handleChange(index, "name", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Role"
                                value={member.role}
                                onChange={(e) => handleChange(index, "role", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <input
                                type="file"
                                accept="image/*"
                                ref={(el) => (fileInputRefs.current[index] = el)}
                                onChange={(e) =>
                                    handleChange(index, "file", e.target.files[0])
                                }
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />

                            {member.img && (
                                <div className="flex items-center space-x-4 mt-2">
                                    <img
                                        src={member.img}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded-lg border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                    >
                                        Remove Image
                                    </button>
                                </div>
                            )}

                            <input
                                type="url"
                                placeholder="LinkedIn URL"
                                value={member.linkedin}
                                onChange={(e) => handleChange(index, "linkedin", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />

                            <input
                                type="url"
                                placeholder="Twitter URL"
                                value={member.twitter}
                                onChange={(e) => handleChange(index, "twitter", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            />

                            {team.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeMember(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            )}
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={addMember}
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                    >
                        + Add Member
                    </button>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-full sm:w-1/2 lg:w-1/3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                        >
                            Save Team
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}