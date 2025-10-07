import React, { useRef, useState, useEffect } from "react";
import { FaLinkedin, FaTwitter, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getTeamData } from '../api/teamApi';

const MeetOurTeam = () => {

    const emptyMember = {
        id: null,
        name: "",
        role: "",
        img: "",
        linkedin: "",
        twitter: "",
    };

    const [teamMembers, setTeamMembers] = useState([emptyMember]);
    const teamRef = useRef(null);

    // ------------------- FETCH TEAM DATA -------------------
    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const res = await getTeamData();
                if (res && res.length > 0) {
                    const formattedData = res.map(member => ({
                        id: member.id,
                        name: member.name || "",
                        role: member.role || "",
                        img: member.img || "",
                        linkedin: member.linkedin || "#",
                        twitter: member.twitter || "#",
                    }));
                    setTeamMembers(formattedData);
                }
            } catch (error) {
                console.error("Error fetching team data:", error);
                setTeamMembers([emptyMember]);
            }
        };

        fetchTeam();
    }, []);

    // ------------------- SCROLL FUNCTION -------------------
    const scrollTeam = (direction) => {
        if (teamRef.current) {
            const card = teamRef.current.querySelector("div");
            if (!card) return;
            const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card).marginRight);
            const scrollAmount = cardWidth * 1;
            teamRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            {/* Header */}
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-100">Meet Our Team</h1>
                <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                    Our dedicated professionals are here to help your business grow.
                </p>
            </div>

            <div className="relative">
                {/* Scroll Buttons */}
                <button
                    onClick={() => scrollTeam("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition hidden md:flex"
                >
                    <FaChevronLeft size={20} className="text-white" />
                </button>
                <button
                    onClick={() => scrollTeam("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/40 transition hidden md:flex"
                >
                    <FaChevronRight size={20} className="text-white" />
                </button>

                {/* Team Carousel */}
                <div ref={teamRef} className="flex gap-6 overflow-x-auto scroll-smooth px-2 md:px-6 scrollbar-hide">
                    {teamMembers.map((member) => (
                        <div
                            key={member.id || member.name}
                            className="flex-shrink-0 w-[90%] sm:w-[45%] md:w-[30%] bg-white/10 backdrop-blur-md border border-white/30 p-6 rounded-2xl shadow-lg text-center"
                        >
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                                {member.img ? (
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white">
                                        No Image
                                    </div>
                                )}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-100">{member.name}</h3>
                            <p className="text-gray-400 mb-4">{member.role}</p>
                            <div className="flex justify-center gap-4 text-gray-200">
                                <a href={member.linkedin} className="hover:text-emerald-400 transition transform hover:scale-110">
                                    <FaLinkedin size={20} />
                                </a>
                                <a href={member.twitter} className="hover:text-emerald-400 transition transform hover:scale-110">
                                    <FaTwitter size={20} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MeetOurTeam;