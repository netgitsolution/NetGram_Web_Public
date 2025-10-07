import React, { useState, useEffect } from "react";
import { submitAboutData, getAboutData } from '../../api/aboutApi';

export default function AboutAdmin() {
  const emptyData = {
    id: 1,
    heading: "",
    sub_heading: "",
    story_heading: "",
    story_description: "",
    mission_heading: "",
    mission_description: "",
    core_values: [{ name: "", text: "" }],
    contact_heading: "",
    contact_sub_heading: "",
    contact_service_role: [{ service: "" }],
    mobile_number: "",
    email: "",
    address: "",
    business_hours: [{ day: "", inTime: "", outTime: "" }],
    social_media: { twitter: "", instagram: "", youtube: "", linkedin: "" },
  };

  const [heading, setHeading] = useState(emptyData.heading);
  const [subHeading, setSubHeading] = useState(emptyData.sub_heading);
  const [story, setStory] = useState({ heading: "", text: "" });
  const [mission, setMission] = useState({ heading: "", text: "" });
  const [coreValues, setCoreValues] = useState(emptyData.core_values);
  const [contactServices, setContactServices] = useState({
    heading: "",
    subheading: "",
    services: [{ service: "" }],
  });
  const [contact, setContact] = useState({ mobile_number: "", email: "", address: "" });
  const [businessHours, setBusinessHours] = useState(emptyData.business_hours);
  const [social, setSocial] = useState(emptyData.social_media);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAboutData();
        if (res && res.length > 0) {
          const data = res[0];

          setHeading(data.heading ?? ""); // fallback to empty string
          setSubHeading(data.sub_heading ?? "");
          setStory({
            heading: data.story_heading ?? "",
            text: data.story_description ?? ""
          });
          setMission({
            heading: data.mission_heading ?? "",
            text: data.mission_description ?? ""
          });
          setCoreValues(data.core_values?.length
            ? data.core_values.map(cv => ({ name: cv.name ?? "", text: cv.text ?? "" }))
            : [{ name: "", text: "" }]
          );
          setContactServices({
            heading: data.contact_heading ?? "",
            subheading: data.contact_sub_heading ?? "",
            services: data.contact_service_role?.length
              ? data.contact_service_role.map(s => ({ service: s.service ?? "" }))
              : [{ service: "" }]
          });
          setContact({
            mobile_number: data.mobile_number ?? "",
            email: data.email ?? "",
            address: data.address ?? "",
          });
          setBusinessHours(data.business_hours?.length
            ? data.business_hours.map(bh => ({ day: bh.day ?? "", inTime: bh.inTime ?? "", outTime: bh.outTime ?? "" }))
            : [{ day: "", inTime: "", outTime: "" }]
          );
          setSocial({
            twitter: data.social_media?.twitter ?? "",
            instagram: data.social_media?.instagram ?? "",
            youtube: data.social_media?.youtube ?? "",
            linkedin: data.social_media?.linkedin ?? ""
          });
        }
      } catch (error) {
        console.error("Error fetching About data:", error);
      }
    };
    fetchData();
  }, []);


  // ------------------- FORM SUBMIT -------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: 1, // always updating first record
      heading: heading,
      sub_heading: subHeading,
      story_heading: story.heading,
      story_description: story.text,
      mission_heading: mission.heading,
      mission_description: mission.text,
      core_values: coreValues,
      contact_heading: contactServices.heading,
      contact_sub_heading: contactServices.subheading,
      contact_service_role: contactServices.services,
      mobile_number: contact.mobile_number,
      email: contact.email,
      address: contact.address,
      business_hours: businessHours,
      social_media: social,
    };

    try {
      const res = await submitAboutData(payload);
      alert(res.message || "Data submitted successfully!");
    } catch (error) {
      alert(error.message || "Something went wrong!");
    }
  };

  // ------------------- HANDLERS FOR DYNAMIC FIELDS -------------------
  const addCoreValue = () => setCoreValues([...coreValues, { name: "", text: "" }]);
  const removeCoreValue = (index) => {
    if (coreValues.length > 1) {
      const newValues = [...coreValues];
      newValues.splice(index, 1);
      setCoreValues(newValues);
    }
  };

  const addService = () =>
    setContactServices({ ...contactServices, services: [...contactServices.services, { service: "" }] });
  const removeService = (index) => {
    if (contactServices.services.length > 1) {
      const newServices = [...contactServices.services];
      newServices.splice(index, 1);
      setContactServices({ ...contactServices, services: newServices });
    }
  };

  const addBusinessHour = () => setBusinessHours([...businessHours, { day: "", inTime: "", outTime: "" }]);
  const removeBusinessHour = (index) => {
    if (businessHours.length > 1) {
      const newHours = [...businessHours];
      newHours.splice(index, 1);
      setBusinessHours(newHours);
    }
  };

  // ------------------- JSX -------------------
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center p-4 sm:p-6 lg:p-10">
      <form className="w-full max-w-5xl space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-bold text-center">About Admin Panel</h1>

        {/* Heading & Subheading */}
        <div className="bg-white shadow-lg rounded-xl p-4 space-y-3">
          <input
            type="text"
            placeholder="Heading"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Subheading"
            value={subHeading}
            onChange={(e) => setSubHeading(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Story & Mission */}
        <div className="bg-white shadow-lg rounded-xl p-4 space-y-3">
          <h2 className="font-semibold">Story</h2>
          <input
            type="text"
            placeholder="Story Heading"
            value={story.heading}
            onChange={(e) => setStory({ ...story, heading: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <textarea
            placeholder="Story Text"
            value={story.text}
            onChange={(e) => setStory({ ...story, text: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <h2 className="font-semibold mt-3">Mission</h2>
          <input
            type="text"
            placeholder="Mission Heading"
            value={mission.heading}
            onChange={(e) => setMission({ ...mission, heading: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <textarea
            placeholder="Mission Text"
            value={mission.text}
            onChange={(e) => setMission({ ...mission, text: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>

        {/* Core Values */}
        <div className="bg-white shadow-lg rounded-xl p-4 space-y-3">
          <h2 className="font-semibold">Core Values</h2>
          {coreValues.map((value, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Name"
                value={value.name}
                onChange={(e) => {
                  const newValues = [...coreValues];
                  newValues[index].name = e.target.value;
                  setCoreValues(newValues);
                }}
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <input
                type="text"
                placeholder="Text"
                value={value.text}
                onChange={(e) => {
                  const newValues = [...coreValues];
                  newValues[index].text = e.target.value;
                  setCoreValues(newValues);
                }}
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-1">
                {index === coreValues.length - 1 && (
                  <button type="button" onClick={addCoreValue} className="px-2 py-1 bg-green-500 text-white rounded">
                    +
                  </button>
                )}
                {coreValues.length > 1 && (
                  <button type="button" onClick={() => removeCoreValue(index)} className="px-2 py-1 bg-red-500 text-white rounded">
                    -
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Services */}
        <div className="bg-white shadow-lg rounded-xl p-4 space-y-3">
          <h2 className="font-semibold">Contact Services</h2>
          <input
            type="text"
            placeholder="Heading"
            value={contactServices.heading}
            onChange={(e) => setContactServices({ ...contactServices, heading: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Subheading"
            value={contactServices.subheading}
            onChange={(e) => setContactServices({ ...contactServices, subheading: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {contactServices.services.map((item, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Service Name"
                value={item.service}
                onChange={(e) => {
                  const newServices = [...contactServices.services];
                  newServices[index].service = e.target.value;
                  setContactServices({ ...contactServices, services: newServices });
                }}
                className="flex-1 px-4 py-2 border rounded-lg"
              />
              <div className="flex gap-1">
                {index === contactServices.services.length - 1 && (
                  <button type="button" onClick={addService} className="px-2 py-1 bg-green-500 text-white rounded">+</button>
                )}
                {contactServices.services.length > 1 && (
                  <button type="button" onClick={() => removeService(index)} className="px-2 py-1 bg-red-500 text-white rounded">-</button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Info, Business Hours & Social Media */}
        <div className="bg-white shadow-lg rounded-xl p-4 space-y-3">
          <h2 className="font-semibold">Contact Info</h2>
          <input type="text" placeholder="Mobile Number" value={contact.mobile_number} onChange={(e) => setContact({ ...contact, mobile_number: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          <input type="email" placeholder="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          <textarea placeholder="Address" value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} className="w-full px-4 py-2 border rounded-lg" rows={2} />

          <h2 className="font-semibold mt-2">Business Hours</h2>
          {businessHours.map((hour, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input type="text" placeholder="Day" value={hour.day} onChange={(e) => { const newHours = [...businessHours]; newHours[index].day = e.target.value; setBusinessHours(newHours); }} className="px-2 py-1 border rounded" />
              <input type="time" value={hour.inTime} onChange={(e) => { const newHours = [...businessHours]; newHours[index].inTime = e.target.value; setBusinessHours(newHours); }} className="px-2 py-1 border rounded" />
              <input type="time" value={hour.outTime} onChange={(e) => { const newHours = [...businessHours]; newHours[index].outTime = e.target.value; setBusinessHours(newHours); }} className="px-2 py-1 border rounded" />
              <div className="flex gap-1">
                {index === businessHours.length - 1 && <button type="button" onClick={addBusinessHour} className="px-2 py-1 bg-green-500 text-white rounded">+</button>}
                {businessHours.length > 1 && <button type="button" onClick={() => removeBusinessHour(index)} className="px-2 py-1 bg-red-500 text-white rounded">-</button>}
              </div>
            </div>
          ))}

          <h2 className="font-semibold mt-2">Social Media</h2>
          {["twitter", "instagram", "youtube", "linkedin"].map((platform) => (
            <input key={platform} type="text" placeholder={platform} value={social[platform]} onChange={(e) => setSocial({ ...social, [platform]: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
          ))}
        </div>

        <div className="flex justify-center">
          <button type="submit" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Save About Page</button>
        </div>
      </form>
    </div>
  );
}