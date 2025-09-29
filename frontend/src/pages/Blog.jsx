import React from "react";
import Dotted from "../components/Dotted";

const blogs = [
    {
        id: 1,
        title: "How to Boost Your Business with AI",
        author: "John Doe",
        date: "Sep 20, 2025",
        image: "https://via.placeholder.com/400x250",
        summary: "Discover strategies to implement AI solutions to grow your company efficiently.",
    },
    {
        id: 2,
        title: "Top 10 Marketing Trends in 2025",
        author: "Jane Smith",
        date: "Sep 18, 2025",
        image: "https://via.placeholder.com/400x250",
        summary: "Stay ahead in marketing with these top trends shaping the industry.",
    },
    {
        id: 3,
        title: "Remote Work: Best Practices",
        author: "Alice Johnson",
        date: "Sep 15, 2025",
        image: "https://via.placeholder.com/400x250",
        summary: "Learn how to manage teams effectively in a remote work environment.",
    },
];

const categories = ["AI", "Marketing", "Remote Work", "Productivity", "Design"];

const Blog = () => {
    return (
        <div className="relative min-h-screen bg-gray-900 py-22 text-white overflow-hidden">
            {/* Dotted Background */}
            <Dotted />

            <div className="container mx-auto px-4 py-8 relative z-10">
                <h1 className="text-4xl font-bold mb-6 text-center">Our Blog</h1>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                className="border border-white/20 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-lg bg-white/10 hover:bg-white/20 transition duration-300"
                            >
                                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                                    <p className="text-sm text-gray-300 mb-2">
                                        By {blog.author} | {blog.date}
                                    </p>
                                    <p className="text-gray-200">{blog.summary}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-64">
                        <div className="border border-white/20 rounded-2xl p-4 shadow-2xl backdrop-blur-lg bg-white/10">
                            <h3 className="text-lg font-bold mb-4">Categories</h3>
                            <ul className="space-y-2">
                                {categories.map((cat, index) => (
                                    <li
                                        key={index}
                                        className="text-blue-400 hover:underline cursor-pointer"
                                    >
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;