import React, { useState } from "react";

export default function ProjectAdmin() {
    const [headingName, setHeadingName] = useState("");
    const [textName, setTextName] = useState("");

    // Categories
    const [categories, setCategories] = useState([
        "All Projects",
        "Web Development",
        "Digital Marketing",
        "Branding",
        "Video",
        "Social Media",
        "Content Creation",
    ]);
    const [newCategory, setNewCategory] = useState("");

    // Projects
    const [projects, setProjects] = useState([
        { name: "", description: "", stack: "", category: "All Projects" },
    ]);

    // Team / Roles Section
    const [teamHeading, setTeamHeading] = useState("");
    const [teamSubHeading, setTeamSubHeading] = useState("");
    const [roles, setRoles] = useState([{ name: "" }]);

    const handleRoleChange = (index, value) => {
        const newRoles = [...roles];
        newRoles[index].name = value;
        setRoles(newRoles);
    };

    const handleAddRole = () => {
        setRoles([...roles, { name: "" }]);
    };

    const handleRemoveRole = (index) => {
        if (roles.length === 1) return;
        setRoles(roles.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            headingName,
            textName,
            projects,
            teamSection: {
                teamHeading,
                teamSubHeading,
                roles,
            },
        });
        alert("Form submitted successfully!");

        // Reset
        setHeadingName("");
        setTextName("");
        setProjects([{ name: "", description: "", stack: "", category: "All Projects" }]);
        setTeamHeading("");
        setTeamSubHeading("");
        setRoles([{ name: "" }]);
    };

    // Category functions
    const handleAddCategory = () => {
        if (!newCategory.trim()) return alert("Category name cannot be empty.");
        if (categories.includes(newCategory)) return alert("Category already exists.");
        setCategories([...categories, newCategory]);
        setNewCategory("");
    };

    const handleDeleteCategory = (category) => {
        if (category === "All Projects") return alert("Default category cannot be deleted.");
        setCategories(categories.filter((c) => c !== category));
        setProjects(
            projects.map((p) =>
                p.category === category ? { ...p, category: "All Projects" } : p
            )
        );
    };

    // Project functions
    const handleProjectChange = (index, field, value) => {
        const newProjects = [...projects];
        newProjects[index][field] = value;
        setProjects(newProjects);
    };

    const handleAddProject = () => {
        setProjects([...projects, { name: "", description: "", stack: "", category: "All Projects" }]);
    };

    const handleRemoveProject = (index) => {
        if (projects.length === 1) return;
        setProjects(projects.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-4xl space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
                    Portfolio Admin Panel
                </h2>

                {/* Heading & Text */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Heading & Text Section</h1>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Heading Name</label>
                        <input
                            type="text"
                            value={headingName}
                            onChange={(e) => setHeadingName(e.target.value)}
                            placeholder="Enter heading name"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Text Name</label>
                        <textarea
                            value={textName}
                            onChange={(e) => setTextName(e.target.value)}
                            placeholder="Enter text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={4}
                        />
                    </div>
                </div>

                {/* Project Category Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Project Categories</h1>

                    {/* Show Categories with delete option */}
                    <div className="flex flex-wrap gap-3 mb-3">
                        {categories.map((category) => (
                            <div key={category} className="flex items-center gap-2 border px-3 py-1 rounded-lg bg-gray-50">
                                <span className="text-gray-700">{category}</span>
                                {category !== "All Projects" && (
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteCategory(category)}
                                        className="text-red-500 text-sm hover:underline"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Add new category input */}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New category name"
                            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={handleAddCategory}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Projects Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Projects</h1>

                    {projects.map((project, index) => (
                        <div key={index} className="border p-4 rounded-lg space-y-4 relative">
                            {/* Remove Button */}
                            <button
                                type="button"
                                onClick={() => handleRemoveProject(index)}
                                disabled={projects.length === 1}
                                className={`absolute top-2 right-2 ${projects.length === 1
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-red-500 hover:underline"
                                    }`}
                            >
                                ✕
                            </button>

                            <h2 className="font-semibold text-gray-700 mb-2">Project {index + 1}</h2>

                            {/* Dropdown List for Category */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Select Category</label>
                                <select
                                    value={project.category}
                                    onChange={(e) => handleProjectChange(index, "category", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Project Name */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Project Name</label>
                                <input
                                    type="text"
                                    value={project.name}
                                    onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                                    placeholder="Enter project name"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Project Description */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Project Description</label>
                                <textarea
                                    value={project.description}
                                    onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                                    placeholder="Enter project description"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                />
                            </div>

                            {/* Project Stack */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Project Stack</label>
                                <input
                                    type="text"
                                    value={project.stack}
                                    onChange={(e) => handleProjectChange(index, "stack", e.target.value)}
                                    placeholder="Enter stack (e.g., React, Node, MySQL)"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddProject}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        + Add Project
                    </button>
                </div>

                {/* Team / Roles Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Team / Roles Section</h1>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Section Heading</label>
                        <input
                            type="text"
                            value={teamHeading}
                            onChange={(e) => setTeamHeading(e.target.value)}
                            placeholder="Enter section heading"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Sub Heading</label>
                        <input
                            type="text"
                            value={teamSubHeading}
                            onChange={(e) => setTeamSubHeading(e.target.value)}
                            placeholder="Enter sub heading"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-1">Roles</label>
                        {roles.map((role, index) => (
                            <div key={index} className="flex items-center gap-2 mb-2">
                                <input
                                    type="text"
                                    value={role.name}
                                    onChange={(e) => handleRoleChange(index, e.target.value)}
                                    placeholder={`Role ${index + 1}`}
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRole(index)}
                                    disabled={roles.length === 1}
                                    className={`px-3 py-2 rounded-lg ${roles.length === 1
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-red-500 text-white hover:bg-red-600"
                                        }`}
                                >
                                    -
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddRole}
                                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                    +
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full sm:w-1/2 lg:w-1/3 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}