import { useState } from "react";

export default function FooterAdmin() {
  const [heading, setHeading] = useState("");
  const [nameHeading, setNameHeading] = useState("");
  const [text, setText] = useState("");

  const [quickLinks, setQuickLinks] = useState([""]);
  const [contact, setContact] = useState({ number: "", gmail: "", address: "" });

  const handleQuickLinkChange = (index, value) => {
    const newLinks = [...quickLinks];
    newLinks[index] = value;
    setQuickLinks(newLinks);
  };

  const addQuickLink = () => setQuickLinks([...quickLinks, ""]);
  const removeQuickLink = (index) => {
    if (quickLinks.length > 1) {
      setQuickLinks(quickLinks.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ heading, nameHeading, text, quickLinks, contact });
    alert("FooterAdmin form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 space-y-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6">Footer Admin</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Heading Section */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Heading Section</h2>
            <textarea
              placeholder="Text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
            />
          </section>

          {/* Contact Us Section */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Contact Us</h2>
            <input
              type="text"
              placeholder="Phone Number"
              value={contact.number}
              onChange={(e) => setContact({ ...contact, number: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={contact.gmail}
              onChange={(e) => setContact({ ...contact, gmail: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Address"
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
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