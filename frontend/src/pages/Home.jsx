import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import BackgroundAnimation from "../components/BackgroundAnimation";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getHomeData } from "../api/homeApi";

const HomePage = () => {

    const emptyData = {
        id: 1,
        service_heading: [""],
        hero_heading: "",
        hero_text: "",
        client: [{ clientName: "", feedback: "", companyName: "" }],
    };
    const [services, setServices] = useState(emptyData.service_heading);
    const [headingName, setHeadingName] = useState(emptyData.hero_heading);
    const [textName, setTextName] = useState(emptyData.hero_text);
    const [clients, setClients] = useState(emptyData.client);
    const testimonials = clients;
    const testimonialsRef = useRef(null);

    // ------------------- FETCH DATA ON MOUNT -------------------
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getHomeData();

                if (res && res.length > 0) {
                    const data = res[0]; // assuming API returns array

                    setServices(data.service_heading || [""]);
                    setHeadingName(data.hero_heading || "");
                    setTextName(data.hero_text || "");
                    setClients(
                        data.client?.map((c) => ({
                            clientName: c.name || c.clientName || "",
                            feedback: c.feedback || "",
                            companyName: c.companyName || c.name || "",
                        })) || [{ clientName: "", feedback: "", companyName: "" }]
                    );
                }
            } catch (error) {
                console.error("Error fetching home data:", error);
                // fallback already empty
            }
        };
        fetchData();
    }, []);


    const navigate = useNavigate();

    const handleScrollToTestimonials = () => {
        testimonialsRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleGoToPortfolio = () => {
        navigate("/portfolio");
    };

    // Carousel state
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 3; // ek baar me 3 testimonials dikhane hain
    const totalPages = Math.ceil(testimonials.length / itemsPerPage);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
    };

    return (
        <div className="relative m-0 p-0">
            {/* Hero Section */}
            <section className="relative bg-[#192335] text-white h-screen flex items-center justify-center overflow-hidden">
                <BackgroundAnimation services={services} />

                <div className="absolute inset-0 bg-black/50 z-0"></div>

                <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-4xl md:text-5xl font-extrabold leading-tight mb-4"
                    >
                        {headingName}
                        {/* Transforming Your Digital Presence <br />
                        with Innovative IT Solutions */}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-gray-200 text-base md:text-lg mb-6"
                    >
                        {textName}
                        {/* We provide cutting-edge IT solutions that drive business growth and
                        digital transformation for our clients across digital media
                        marketing, content creation, web development, and training services. */}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button
                            onClick={handleScrollToTestimonials}
                            className="px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-gray-300 transition-all transform hover:-translate-y-1"
                        >
                            Get Started
                        </button>

                        <button
                            onClick={handleGoToPortfolio}
                            className="px-6 py-3 bg-transparent border border-gray-200 text-gray-200 font-semibold rounded-xl hover:bg-gray-200 hover:text-gray-900 transition-all transform hover:-translate-y-1"
                        >
                            View Our Work
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                ref={testimonialsRef}
                className="py-12 bg-[#192335] relative overflow-hidden"
            >
                <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-10 text-white">
                        What Our Clients Say
                    </h2>

                    {/* Carousel Container */}
                    <div className="relative">
                        <div className="flex justify-center gap-6 flex-wrap">
                            {testimonials
                                .slice(
                                    currentIndex * itemsPerPage,
                                    currentIndex * itemsPerPage + itemsPerPage
                                )
                                .map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className="min-w-[250px] max-w-sm bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-lg transition"
                                    >
                                        <p className="text-gray-200 mb-4">
                                            &quot;{testimonial.feedback}&quot;
                                        </p>
                                        <h3 className="font-semibold text-lg text-white">
                                            {testimonial.clientName}
                                        </h3>
                                        <p className="text-gray-300 text-sm">
                                            {testimonial.companyName}
                                        </p>
                                    </div>
                                ))}
                        </div>

                        {/* Left Button */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-700/60 text-white p-2 rounded-full hover:bg-gray-600"
                        >
                            <FiChevronLeft size={24} />
                        </button>

                        {/* Right Button */}
                        <button
                            onClick={handleNext}
                            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-700/60 text-white p-2 rounded-full hover:bg-gray-600"
                        >
                            <FiChevronRight size={24} />
                        </button>
                    </div>

                    {/* Page Numbers */}
                    <div className="flex justify-center mt-6 gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${i === currentIndex
                                    ? "bg-white text-black"
                                    : "bg-gray-700 text-white hover:bg-gray-600"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                {/* optional light overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0"></div>
            </section>
        </div>
    );
};

export default HomePage;