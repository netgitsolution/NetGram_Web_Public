import React, { useState } from "react";
import Dotted from "../components/Dotted";

// ----------------- Video Posts (with category) -----------------
const videoPosts = [
    {
        id: 1,
        title: "AI Tools Screen Recording",
        author: "Tech Guru",
        date: "Sep 22, 2025",
        category: "AI",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        summary:
            "Watch real-time screen recordings of AI tools like ChatGPT & Claude in action.",
    },
    {
        id: 2,
        title: "Animation: Common Password Patterns",
        author: "Security Expert",
        date: "Sep 20, 2025",
        category: "Video",
        video: "https://www.w3schools.com/html/movie.mp4",
        summary:
            "See animated explanations of common password patterns with Indian names.",
    },
    {
        id: 3,
        title: "AI Marketing Tools Overview",
        author: "Jane AI",
        date: "Sep 19, 2025",
        category: "Marketing",
        image: "https://via.placeholder.com/400x250",
        summary:
            "Learn how AI is transforming marketing campaigns with real examples.",
    },
    {
        id: 4,
        title: "Productivity Boost with AI",
        author: "John Productivity",
        date: "Sep 18, 2025",
        category: "Productivity",
        image: "https://via.placeholder.com/400x250",
        summary:
            "Discover AI tools to maximize your team productivity and efficiency.",
    },
];

// ----------------- Docs Posts (with category) -----------------
const docPosts = [
    {
        id: 1,
        title: "Boost Your Business with AI",
        author: "John Doe",
        date: "Sep 20, 2025",
        category: "AI",
        image: "https://via.placeholder.com/400x250",
        summary:
            "Discover strategies to implement AI solutions to grow your company efficiently.",
    },
    {
        id: 2,
        title: "Top 10 Marketing Trends 2025",
        author: "Jane Smith",
        date: "Sep 18, 2025",
        category: "Marketing",
        image: "https://via.placeholder.com/400x250",
        summary:
            "Stay ahead in marketing with these top trends shaping the industry.",
    },
    {
        id: 3,
        title: "Remote Work: Best Practices",
        author: "Alice Johnson",
        date: "Sep 15, 2025",
        category: "Remote Work",
        image: "https://via.placeholder.com/400x250",
        summary:
            "Learn how to manage teams effectively in a remote work environment.",
    },
    {
        id: 4,
        title: "Design System Guidelines",
        author: "Designer X",
        date: "Sep 12, 2025",
        category: "Design",
        image: "https://via.placeholder.com/400x250",
        summary: "Comprehensive guide for creating consistent design systems.",
    },
    {
        id: 5,
        title: "Video Editing Tips",
        author: "Video Pro",
        date: "Sep 10, 2025",
        category: "Video",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
        summary: "Learn best practices for editing professional quality videos.",
    },
    {
        id: 6,
        title: "Content Creation Strategies",
        author: "Content Master",
        date: "Sep 8, 2025",
        category: "Content Creation",
        image: "https://via.placeholder.com/400x250",
        summary:
            "Tips and tricks to create engaging content for blogs and social media.",
    },
    {
        id: 7,
        title: "Productivity Hacks for Teams",
        author: "Productivity Guru",
        date: "Sep 5, 2025",
        category: "Productivity",
        image: "https://via.placeholder.com/400x250",
        summary:
            "Boost your team's efficiency with these simple productivity hacks.",
    },
];

// ----------------- Categories -----------------
const categories = [
    "All",
    "AI",
    "Marketing",
    "How to",
    "Video",
    "Docs",
    "Productivity",
    "Knowledge",
    "Content Creation",
];

// Top 5 fix kar diye
const topCategories = ["All", "AI", "Marketing", "How to", "Video"];
const otherCategories = categories.filter(
    (cat) => !topCategories.includes(cat)
);

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    // ----------------- Render Card -----------------
    const renderPostCard = (post) => (
        <div
            key={post.id}
            className="border border-white/20 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-lg bg-white/10 hover:bg-white/20 transition duration-300 cursor-pointer"
        >
            {post.video ? (
                <video
                    src={post.video}
                    controls
                    className="w-full h-48 object-cover"
                ></video>
            ) : (
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                />
            )}

            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-sm text-gray-300 mb-2">
                    By {post.author} | {post.date}
                </p>
                <p className="text-gray-200">{post.summary}</p>
            </div>
        </div>
    );

    // ----------------- Filters -----------------
    const filteredVideoPosts =
        selectedCategory === "All"
            ? videoPosts
            : videoPosts.filter((post) => post.category === selectedCategory);

    const filteredDocPosts =
        selectedCategory === "All"
            ? docPosts
            : docPosts.filter((post) => post.category === selectedCategory);

    return (
        <div className="relative py-20 min-h-screen bg-gray-900 text-white overflow-hidden">
            {/* Dotted Background */}
            <Dotted />

            {/* 🔹 Hero Section */}
            <section className="text-center py-10 relative z-10">
                <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Our Blog</h1>
                    <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto">
                        Sharing insights, tutorials, and the latest trends
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 relative z-10">
                {/* Categories */}
                <div className="flex flex-col items-center gap-6">
                    {/* 🔹 Top Categories */}
                    <div className="flex flex-wrap justify-center gap-4">
                        {topCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2 rounded-full font-medium border transition-all duration-200
                                    ${selectedCategory === cat
                                        ? "bg-emerald-500 border-emerald-500 text-white"
                                        : "bg-transparent border-gray-500 text-gray-200 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* 🔹 Other Categories */}
                    {otherCategories.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-4">
                            {otherCategories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-5 py-2 rounded-full font-medium border transition-all duration-200
                                        ${selectedCategory === cat
                                            ? "bg-emerald-500 border-emerald-500 text-white"
                                            : "bg-transparent border-gray-500 text-gray-200 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sections */}
                <div className="flex flex-col gap-16">
                    {/* Video Section */}
                    <section>
                        <h2 className="text-3xl font-bold ">Videos</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredVideoPosts.map(renderPostCard)}
                            {filteredVideoPosts.length === 0 && (
                                <p className="text-gray-400 col-span-full text-center">
                                    No videos in this category.
                                </p>
                            )}
                        </div>
                    </section>

                    {/* Docs Section */}
                    <section>
                        <h2 className="text-3xl font-bold mb-6">Docs</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDocPosts.map(renderPostCard)}
                            {filteredDocPosts.length === 0 && (
                                <p className="text-gray-400 col-span-full text-center">
                                    No docs in this category.
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Blog;