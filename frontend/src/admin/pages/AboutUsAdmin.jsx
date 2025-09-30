import React, { useState } from "react";

export default function AboutAdmin() {
  const [heading, setHeading] = useState("");
  const [text, setText] = useState("");

  const [story, setStory] = useState({ heading: "", text: "" });
  const [mission, setMission] = useState({ heading: "", text: "" });

  const [coreValues, setCoreValues] = useState([{ name: "", text: "" }]);
  const [teamMembers, setTeamMembers] = useState([
    { name: "", role: "", img: "", linkedin: "", twitter: "" },
  ]);

  const [contact, setContact] = useState({ mobile: "", gmail: "", address: "" });
  const [businessHours, setBusinessHours] = useState([{ day: "", inTime: "", outTime: "" }]);
  const [social, setSocial] = useState({ facebook: "", twitter: "", instagram: "", youtube: "", linkedin: "" });

  // Core Values
  const addCoreValue = () => setCoreValues([...coreValues, { name: "", text: "" }]);
  const removeCoreValue = (index) => {
    if (coreValues.length > 1) {
      const newValues = [...coreValues];
      newValues.splice(index, 1);
      setCoreValues(newValues);
    }
  };

  // Team Members
  const addTeamMember = () =>
    setTeamMembers([...teamMembers, { name: "", role: "", img: "", linkedin: "", twitter: "" }]);
  const removeTeamMember = (index) => {
    if (teamMembers.length > 1) {
      const newTeam = [...teamMembers];
      newTeam.splice(index, 1);
      setTeamMembers(newTeam);
    }
  };

  // Business Hours
  const addBusinessHour = () => setBusinessHours([...businessHours, { day: "", inTime: "", outTime: "" }]);
  const removeBusinessHour = (index) => {
    if (businessHours.length > 1) {
      const newHours = [...businessHours];
      newHours.splice(index, 1);
      setBusinessHours(newHours);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      heading,
      text,
      story,
      mission,
      coreValues,
      teamMembers,
      contact,
      businessHours,
      social,
    });
    alert("Form submitted successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-10">
      <div className="w-full max-w-4xl space-y-6">

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-4">About Admin Panel</h1>

        {/* Heading & Text */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Main Heading & Text</h2>
          <input
            type="text"
            placeholder="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={4}
          />
        </div>

        {/* Our Story & Mission */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Our Story & Mission</h2>

          {/* Story */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Story Heading"
              value={story.heading}
              onChange={(e) => setStory({ ...story, heading: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Story Text"
              value={story.text}
              onChange={(e) => setStory({ ...story, text: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
            />
          </div>

          {/* Mission */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Mission Heading"
              value={mission.heading}
              onChange={(e) => setMission({ ...mission, heading: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              placeholder="Mission Text"
              value={mission.text}
              onChange={(e) => setMission({ ...mission, text: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
            />
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Our Core Values</h2>
          {coreValues.map((value, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3 items-center">
              <input
                type="text"
                placeholder="Value Name"
                value={value.name}
                onChange={(e) => {
                  const newValues = [...coreValues];
                  newValues[index].name = e.target.value;
                  setCoreValues(newValues);
                }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Value Text"
                value={value.text}
                onChange={(e) => {
                  const newValues = [...coreValues];
                  newValues[index].text = e.target.value;
                  setCoreValues(newValues);
                }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex gap-1">
                {index === coreValues.length - 1 && (
                  <button
                    type="button"
                    onClick={addCoreValue}
                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    +
                  </button>
                )}
                {coreValues.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCoreValue(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Meet Our Team */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Meet Our Team</h2>
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3 items-center">
              <input
                type="text"
                placeholder="Name"
                value={member.name}
                onChange={(e) => {
                  const newTeam = [...teamMembers];
                  newTeam[index].name = e.target.value;
                  setTeamMembers(newTeam);
                }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Role"
                value={member.role}
                onChange={(e) => {
                  const newTeam = [...teamMembers];
                  newTeam[index].role = e.target.value;
                  setTeamMembers(newTeam);
                }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={member.img}
                onChange={(e) => {
                  const newTeam = [...teamMembers];
                  newTeam[index].img = e.target.value;
                  setTeamMembers(newTeam);
                }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="LinkedIn Link"
                value={member.linkedin}
                onChange={(e) => {
                  const newTeam = [...teamMembers];
                  newTeam[index].linkedin = e.target.value;
                  setTeamMembers(newTeam);
                }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Twitter Link"
                value={member.twitter}
                onChange={(e) => {
                  const newTeam = [...teamMembers];
                  newTeam[index].twitter = e.target.value;
                  setTeamMembers(newTeam);
                }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <div className="flex gap-1 mt-2 sm:mt-0">
                {index === teamMembers.length - 1 && (
                  <button
                    type="button"
                    onClick={addTeamMember}
                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    +
                  </button>
                )}
                {teamMembers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeTeamMember(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Us */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Contact Us</h2>
          <input
            type="text"
            placeholder="Mobile Number"
            value={contact.mobile}
            onChange={(e) => setContact({ ...contact, mobile: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="email"
            placeholder="Gmail"
            value={contact.gmail}
            onChange={(e) => setContact({ ...contact, gmail: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Address"
            value={contact.address}
            onChange={(e) => setContact({ ...contact, address: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows={2}
          />
        </div>

        {/* Business Hours */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Business Hours</h2>
          {businessHours.map((hour, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-2 mb-3 items-center">
              <input
                type="text"
                placeholder="Day"
                value={hour.day}
                onChange={(e) => {
                  const newHours = [...businessHours];
                  newHours[index].day = e.target.value;
                  setBusinessHours(newHours);
                }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="time"
                value={hour.inTime}
                onChange={(e) => {
                  const newHours = [...businessHours];
                  newHours[index].inTime = e.target.value;
                  setBusinessHours(newHours);
                }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="time"
                value={hour.outTime}
                onChange={(e) => {
                  const newHours = [...businessHours];
                  newHours[index].outTime = e.target.value;
                  setBusinessHours(newHours);
                }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <div className="flex gap-1 mt-2 sm:mt-0">
                {index === businessHours.length - 1 && (
                  <button
                    type="button"
                    onClick={addBusinessHour}
                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    +
                  </button>
                )}
                {businessHours.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBusinessHour(index)}
                    className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    -
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Follow Us */}
        <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Follow Us</h2>
          {["facebook", "twitter", "instagram", "youtube", "linkedin"].map((platform) => (
            <input
              key={platform}
              type="text"
              placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} Link`}
              value={social[platform]}
              onChange={(e) => setSocial({ ...social, [platform]: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full sm:w-1/2 lg:w-1/3 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
          >
            Save About Page
          </button>
        </div>
      </div>
    </div>
  );
}