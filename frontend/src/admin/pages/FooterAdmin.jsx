import React, { useState, useEffect } from "react";
import { submitFooterData, getFooterData } from "../../api/footerApi";

export default function FooterAdmin() {
  // ------------------- EMPTY FALLBACK -------------------
  const emptyData = {
    id: 1,
    heading_text: "",
    phone_number: "",
    email: "",
    address: ""
  };

  // ------------------- STATES -------------------
  const [headingText, setHeadingText] = useState(emptyData.heading_text);
  const [phoneNumber, setPhoneNumber] = useState(emptyData.phone_number);
  const [email, setEmail] = useState(emptyData.email);
  const [address, setAddress] = useState(emptyData.address);

  // ------------------- FETCH DATA ON MOUNT -------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getFooterData(); // API call
        if (res && res.length > 0) {
          const data = res[0]; // assuming API returns array
          setHeadingText(data.heading_text || "");
          setPhoneNumber(data.phone_number || "");
          setEmail(data.email || "");
          setAddress(data.address || "");
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };

    fetchData();
  }, []);

  // ------------------- FORM SUBMIT -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: 1,
      heading_text: headingText,
      phone_number: phoneNumber,
      email,
      address
    };

    try {
      const res = await submitFooterData(payload);
      alert(res.message || "Footer updated successfully!");

      if (res.data) {
        setHeadingText(res.data.heading_text || "");
        setPhoneNumber(res.data.phone_number || "");
        setEmail(res.data.email || "");
        setAddress(res.data.address || "");
      }
    } catch (error) {
      console.error("Error submitting footer data:", error);
      alert(error.message || "Something went wrong!");
    }
  };

  // ------------------- JSX -------------------
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">
          Footer Admin
        </h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Heading Section */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Heading Section</h2>
            <textarea
              placeholder="Heading Text"
              value={headingText}
              onChange={(e) => setHeadingText(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              required
            />
          </section>

          {/* Contact Section */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Contact Info</h2>
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              required
            />
          </section>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-1/2 lg:w-1/3 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Save Footer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}