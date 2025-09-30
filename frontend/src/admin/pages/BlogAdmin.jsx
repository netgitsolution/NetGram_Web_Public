import React, { useState } from "react";

export default function BlogAdmin() {
    const [headingName, setHeadingName] = useState("");
    const [textName, setTextName] = useState("");

    // Categories
    const [categories, setCategories] = useState([
        "All",
        "AI",
        "Marketing",
        "How to",
        "Video",
        "Docs",
        "Productivity",
        "Knowledge",
        "Content Creation",
    ]);
    const [blogCategory, setBlogCategory] = useState("");
    const [newCategory, setNewCategory] = useState("");

    // Blogs Array
    const [blogs, setBlogs] = useState([
        { title: "", author: "", date: "", summary: "", image: "" },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!blogCategory) {
            alert("Please select a blog category.");
            return;
        }

        console.log({
            headingName,
            textName,
            blogCategory,
            blogs,
        });
        alert("Form submitted successfully!");

        setHeadingName("");
        setTextName("");
        setBlogCategory("");
        setBlogs([{ title: "", author: "", date: "", summary: "", image: "" }]);
    };

    // Category functions
    const handleAddCategory = () => {
        if (!newCategory.trim()) return alert("Category name cannot be empty.");
        if (categories.includes(newCategory)) return alert("Category already exists.");
        setCategories([...categories, newCategory]);
        setNewCategory("");
    };

    const handleDeleteCategory = (category) => {
        setCategories(categories.filter((c) => c !== category));
        if (blogCategory === category) setBlogCategory("");
    };

    // Blog functions
    const handleBlogChange = (index, field, value) => {
        const newBlogs = [...blogs];
        newBlogs[index][field] = value;
        setBlogs(newBlogs);
    };

    const handleAddBlog = () => {
        setBlogs([
            ...blogs,
            { title: "", author: "", date: "", summary: "", image: "" },
        ]);
    };

    const handleRemoveBlog = (index) => {
        if (blogs.length === 1) return; // prevent deleting last blog
        setBlogs(blogs.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-4xl space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
                    Blog Admin Panel
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

                {/* Blog Category */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Blog Category</h1>

                    <div className="flex flex-wrap gap-4 mb-4">
                        {categories.map((category) => (
                            <label key={category} className="flex items-center gap-2 border px-3 py-1 rounded-lg bg-gray-50">
                                <input
                                    type="radio"
                                    name="blogCategory"
                                    value={category}
                                    checked={blogCategory === category}
                                    onChange={(e) => setBlogCategory(e.target.value)}
                                    className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-400"
                                />
                                <span className="text-gray-700">{category}</span>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteCategory(category)}
                                    className="text-red-500 text-sm hover:underline ml-2"
                                >
                                    ✕
                                </button>
                            </label>
                        ))}
                    </div>

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

                {/* Blogs Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">Blogs</h1>

                    {blogs.map((blog, index) => (
                        <div key={index} className="border p-4 rounded-lg space-y-2 relative">
                            {/* Remove Button */}
                            <button
                                type="button"
                                onClick={() => handleRemoveBlog(index)}
                                disabled={blogs.length === 1} // disable if only one blog
                                className={`absolute top-2 right-2 ${blogs.length === 1
                                    ? "text-gray-400 cursor-not-allowed"
                                    : "text-red-500 hover:underline"
                                    }`}
                            >
                                ✕
                            </button>

                            <h2 className="font-semibold text-gray-700 mb-2">Blog {index + 1}</h2>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Blog Title</label>
                                <input
                                    type="text"
                                    value={blog.title}
                                    onChange={(e) => handleBlogChange(index, "title", e.target.value)}
                                    placeholder="Enter blog title"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Author</label>
                                <input
                                    type="text"
                                    value={blog.author}
                                    onChange={(e) => handleBlogChange(index, "author", e.target.value)}
                                    placeholder="Enter author name"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Date</label>
                                <input
                                    type="date"
                                    value={blog.date}
                                    onChange={(e) => handleBlogChange(index, "date", e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Summary</label>
                                <textarea
                                    value={blog.summary}
                                    onChange={(e) => handleBlogChange(index, "summary", e.target.value)}
                                    placeholder="Enter blog summary"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-1">Image URL</label>
                                <input
                                    type="text"
                                    value={blog.image}
                                    onChange={(e) => handleBlogChange(index, "image", e.target.value)}
                                    placeholder="Enter image URL"
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={handleAddBlog}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        + Add Blog
                    </button>
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