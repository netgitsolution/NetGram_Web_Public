import React, { useState, useEffect } from "react";
import { submitPortfolioData, getPortfolioData } from "../../api/portfolioApi";

export default function ProjectAdmin() {
    // ------------------- EMPTY FALLBACK -------------------
    const emptyData = {
        id: 1,
        heading: "",
        sub_heading: "",
        project_category: ["All Projects"],
        project: [
            { project_name: "", project_description: "", project_stack: "", project_category_name: "All Projects" }
        ],
        team_heading: "",
        team_sub_heading: "",
        team_role: [{ role_name: "" }],
    };

    // ------------------- STATES -------------------
    const [headingName, setHeadingName] = useState(emptyData.heading);
    const [textName, setTextName] = useState(emptyData.sub_heading);
    const [categories, setCategories] = useState([...emptyData.project_category]);
    const [newCategory, setNewCategory] = useState("");
    const [projects, setProjects] = useState(
        emptyData.project.map(p => ({
            name: p.project_name,
            description: p.project_description,
            stack: p.project_stack,
            category: p.project_category_name,
        }))
    );
    const [teamHeading, setTeamHeading] = useState(emptyData.team_heading);
    const [teamSubHeading, setTeamSubHeading] = useState(emptyData.team_sub_heading);
    const [roles, setRoles] = useState(
        emptyData.team_role.map(r => ({ name: r.role_name }))
    );

    // ------------------- FETCH DATA ON MOUNT -------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPortfolioData();
                if (res && res.length > 0) {
                    const data = res[0];

                    setHeadingName(data.heading || "");
                    setTextName(data.sub_heading || "");
                    setCategories(data.project_category || ["All Projects"]);
                    setProjects(
                        data.project?.map(p => ({
                            name: p.project_name || "",
                            description: p.project_description || "",
                            stack: p.project_stack || "",
                            category: p.project_category_name || "All Projects",
                        })) || emptyData.project
                    );
                    setTeamHeading(data.team_heading || "");
                    setTeamSubHeading(data.team_sub_heading || "");
                    setRoles(
                        data.team_role?.map(r => ({ name: r.role_name || "" })) || [{ name: "" }]
                    );
                }
            } catch (error) {
                console.error("Error fetching portfolio data:", error);
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
            sub_heading: textName,
            project_category: categories,
            project: projects.map(p => ({
                project_name: p.name,
                project_description: p.description,
                project_stack: p.stack,
                project_category_name: p.category,
            })),
            team_heading: teamHeading,
            team_sub_heading: teamSubHeading,
            team_role: roles.map(r => ({ role_name: r.name })),
        };

        try {
            const res = await submitPortfolioData(payload);
            alert(res.message);

            if (res.data) {
                const data = res.data;
                setHeadingName(data.heading || "");
                setTextName(data.sub_heading || "");
                setCategories(data.project_category || ["All Projects"]);
                setProjects(
                    data.project?.map(p => ({
                        name: p.project_name || "",
                        description: p.project_description || "",
                        stack: p.project_stack || "",
                        category: p.project_category_name || "All Projects",
                    })) || emptyData.project
                );
                setTeamHeading(data.team_heading || "");
                setTeamSubHeading(data.team_sub_heading || "");
                setRoles(
                    data.team_role?.map(r => ({ name: r.role_name || "" })) || [{ name: "" }]
                );
            }
        } catch (error) {
            console.error("Error submitting portfolio form:", error);
            alert(error.message || "Something went wrong!");
        }
    };

    // ------------------- CATEGORY HANDLERS -------------------
    const handleAddCategory = () => {
        if (!newCategory.trim()) return alert("Category name cannot be empty.");
        if (categories.includes(newCategory)) return alert("Category already exists.");
        setCategories([...categories, newCategory]);
        setNewCategory("");
    };
    const handleDeleteCategory = (category) => {
        if (category === "All Projects") return alert("Default category cannot be deleted.");
        setCategories(categories.filter(c => c !== category));
        setProjects(projects.map(p => p.category === category ? { ...p, category: "All Projects" } : p));
    };

    // ------------------- PROJECT HANDLERS -------------------
    const handleProjectChange = (index, field, value) => {
        const newProjects = [...projects];
        newProjects[index][field] = value;
        setProjects(newProjects);
    };
    const handleAddProject = () => setProjects([...projects, { name: "", description: "", stack: "", category: "All Projects" }]);
    const handleRemoveProject = (index) => {
        if (projects.length === 1) return;
        setProjects(projects.filter((_, i) => i !== index));
    };

    // ------------------- ROLE HANDLERS -------------------
    const handleRoleChange = (index, value) => {
        const newRoles = [...roles];
        newRoles[index].name = value;
        setRoles(newRoles);
    };
    const handleAddRole = () => setRoles([...roles, { name: "" }]);
    const handleRemoveRole = (index) => {
        if (roles.length === 1) return;
        setRoles(roles.filter((_, i) => i !== index));
    };

    // ------------------- JSX -------------------
    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-4xl space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
                    Portfolio Admin Panel
                </h2>

                {/* Heading & Text Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Heading & Text</h1>
                    <input
                        type="text"
                        value={headingName}
                        onChange={(e) => setHeadingName(e.target.value)}
                        placeholder="Heading"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                    <textarea
                        value={textName}
                        onChange={(e) => setTextName(e.target.value)}
                        placeholder="Text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={4}
                    />
                </div>

                {/* Project Categories */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Project Categories</h1>
                    <div className="flex flex-wrap gap-3 mb-3">
                        {categories.map(category => (
                            <div key={category} className="flex items-center gap-2 border px-3 py-1 rounded-lg bg-gray-50">
                                <span>{category}</span>
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
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            placeholder="New category"
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
                            <button
                                type="button"
                                onClick={() => handleRemoveProject(index)}
                                disabled={projects.length === 1}
                                className={`absolute top-2 right-2 ${projects.length === 1 ? "text-gray-400 cursor-not-allowed" : "text-red-500 hover:underline"}`}
                            >
                                ✕
                            </button>
                            <input
                                type="text"
                                value={project.name}
                                onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                                placeholder="Project Name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <textarea
                                value={project.description}
                                onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                                placeholder="Project Description"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                            />
                            <input
                                type="text"
                                value={project.stack}
                                onChange={(e) => handleProjectChange(index, "stack", e.target.value)}
                                placeholder="Stack"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={project.category}
                                onChange={(e) => handleProjectChange(index, "category", e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
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

                {/* Team / Roles */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Team / Roles</h1>
                    <input
                        type="text"
                        value={teamHeading}
                        onChange={(e) => setTeamHeading(e.target.value)}
                        placeholder="Team Heading"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
                    <input
                        type="text"
                        value={teamSubHeading}
                        onChange={(e) => setTeamSubHeading(e.target.value)}
                        placeholder="Sub Heading"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                    />
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
                                className={`px-3 py-2 rounded-lg ${roles.length === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"}`}
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

                {/* Submit Button */}
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