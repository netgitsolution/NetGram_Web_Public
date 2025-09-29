import React, { useState } from "react";

export default function NavbarAdmin() {
    const [mainHeading, setMainHeading] = useState("");
    const [mainText, setMainText] = useState("");
    const [pageHeadings, setPageHeadings] = useState([""]);

    // Page Headings functions
    const addPageHeading = () => setPageHeadings([...pageHeadings, ""]);
    const removePageHeading = (index) => {
        const newHeadings = pageHeadings.filter((_, i) => i !== index);
        setPageHeadings(newHeadings.length ? newHeadings : [""]);
    };
    const handlePageHeadingChange = (index, value) => {
        const newHeadings = [...pageHeadings];
        newHeadings[index] = value;
        setPageHeadings(newHeadings);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ mainHeading, mainText, pageHeadings });
        alert("Navbar settings saved!");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-4xl space-y-6">
                {/* Main Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
                    Navbar Admin Panel
                </h1>

                {/* Heading & Text */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">Heading & Text</h2>
                    <input
                        type="text"
                        placeholder="Main Heading"
                        value={mainHeading}
                        onChange={(e) => setMainHeading(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg mb-3 focus:ring-2 focus:ring-purple-500"
                    />
                    <textarea
                        placeholder="Main Text"
                        value={mainText}
                        onChange={(e) => setMainText(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        rows={3}
                    ></textarea>
                </div>

                {/* Page Headings */}
                {/* <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4">Page Headings</h2>
                    <div className="space-y-3">
                        {pageHeadings.map((heading, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row gap-2 sm:items-center"
                            >
                                <input
                                    type="text"
                                    placeholder={`Page Heading ${index + 1}`}
                                    value={heading}
                                    onChange={(e) =>
                                        handlePageHeadingChange(index, e.target.value)
                                    }
                                    className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                                />
                                <div className="flex gap-2">
                                    {index === pageHeadings.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={addPageHeading}
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                        >
                                            +
                                        </button>
                                    )}
                                    {pageHeadings.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removePageHeading(index)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                        >
                                            -
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full sm:w-1/2 lg:w-1/3 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
                    >
                        Save Navbar
                    </button>
                </div>
            </div>
        </div>
    );
}