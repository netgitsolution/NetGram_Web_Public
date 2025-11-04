import React, { useState, useEffect } from "react";
import { submitHomeData, getHomeData } from "../../api/homeApi";

export default function HomeAdmin() {
    // ------------------- EMPTY FALLBACK -------------------
    const emptyData = {
        id: 1,
        service_heading: [""],
        hero_heading: "",
        hero_text: "",
        client: [{ clientName: "", feedback: "", companyName: "" }],
    };

    // ------------------- STATES -------------------
    const [services, setServices] = useState(emptyData.service_heading);
    const [headingName, setHeadingName] = useState(emptyData.hero_heading);
    const [textName, setTextName] = useState(emptyData.hero_text);
    const [clients, setClients] = useState(emptyData.client);

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

    // ------------------- FORM SUBMIT -------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            id: 1,
            service_heading: services,
            hero_heading: headingName,
            hero_text: textName,
            client: clients,
        };

        try {
            const res = await submitHomeData(payload);
            alert(res.message);

            // updated data ko state me set karna
            if (res.data) {
                setServices(res.data.service_heading || [""]);
                setHeadingName(res.data.hero_heading || "");
                setTextName(res.data.hero_text || "");
                setClients(
                    res.data.client || [{ clientName: "", feedback: "", companyName: "" }]
                );
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert(error.message || "Something went wrong!");
        }
    };

    // ------------------- SERVICE HANDLERS -------------------
    const addServiceInput = () => setServices([...services, ""]);
    const handleServiceChange = (index, value) => {
        const newServices = [...services];
        newServices[index] = value;
        setServices(newServices);
    };
    const removeServiceInput = (index) => {
        const newServices = services.filter((_, i) => i !== index);
        setServices(newServices.length ? newServices : [""]);
    };

    // ------------------- CLIENT HANDLERS -------------------
    const addClientCard = () =>
        setClients([...clients, { clientName: "", feedback: "", companyName: "" }]);

    const removeClientCard = (index) => {
        const newClients = clients.filter((_, i) => i !== index);
        setClients(
            newClients.length ? newClients : [{ clientName: "", feedback: "", companyName: "" }]
        );
    };

    const handleClientChange = (index, field, value) => {
        const newClients = [...clients];
        newClients[index][field] = value;
        setClients(newClients);
    };

    // ------------------- JSX -------------------
    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-10">
            <div className="w-full max-w-4xl space-y-6">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">
                    Home Admin Panel
                </h2>

                {/* Service Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">
                        Service Section
                    </h1>
                    <div className="space-y-3">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row gap-2 items-start sm:items-center"
                            >
                                <input
                                    type="text"
                                    value={service}
                                    onChange={(e) => handleServiceChange(index, e.target.value)}
                                    placeholder="Enter service name"
                                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <div className="flex gap-2 mt-2 sm:mt-0">
                                    {index === services.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={addServiceInput}
                                            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                        >
                                            +
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeServiceInput(index)}
                                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Hero Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">
                        Hero Section
                    </h1>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-1">Heading</h3>
                            <input
                                type="text"
                                value={headingName}
                                onChange={(e) => setHeadingName(e.target.value)}
                                placeholder="Enter heading"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <h3 className="text-lg sm:text-xl font-semibold mb-1">Text</h3>
                            <textarea
                                value={textName}
                                onChange={(e) => setTextName(e.target.value)}
                                placeholder="Enter text"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={5}
                                required
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Testimonial Section */}
                <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
                    <h1 className="text-xl sm:text-2xl font-semibold mb-4">
                        Testimonial Section
                    </h1>

                    <div className="space-y-4">
                        {clients.map((client, index) => (
                            <div
                                key={index}
                                className="border p-4 rounded-lg space-y-3 relative bg-gray-50"
                            >
                                <h3 className="text-lg font-medium">Client {index + 1}</h3>

                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={client.clientName}
                                        onChange={(e) =>
                                            handleClientChange(index, "clientName", e.target.value)
                                        }
                                        placeholder="Client Name"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                    <textarea
                                        value={client.feedback}
                                        onChange={(e) =>
                                            handleClientChange(index, "feedback", e.target.value)
                                        }
                                        placeholder="Feedback"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows={3}
                                        required
                                    ></textarea>
                                    <input
                                        type="text"
                                        value={client.companyName}
                                        onChange={(e) =>
                                            handleClientChange(index, "companyName", e.target.value)
                                        }
                                        placeholder="Company Name"
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                                    {index === clients.length - 1 && (
                                        <button
                                            type="button"
                                            onClick={addClientCard}
                                            className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                                        >
                                            Add
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeClientCard(index)}
                                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
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