import React, { useState } from "react";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submittedData, setSubmittedData] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData(formData);
  };
  return (
    <div className="border border-gray-200 rounded-md p-4 mt-5">
      <div>
        <h2 className="text-2xl font-bold">Contact Form</h2>
        <p className="text-gray-500 text-sm">
          A simple contact form with basic validation.
        </p>
      </div>
      <div className="flex-1">
        <form className="mt-5 flex flex-col gap-4" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border border-gray-200 rounded-md p-2"
            value={formData.name}
            required
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border border-gray-200 rounded-md p-2"
            value={formData.email}
            required
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            className="border border-gray-200 rounded-md p-2"
            value={formData.subject}
            required
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
          />
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            className="border border-gray-200 rounded-md p-2"
            rows={4}
            value={formData.message}
            required
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          ></textarea>
          <button
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              setSubmittedData(formData);
              console.log(formData);
            }}
          >
            Submit
          </button>
        </form>
      </div>
      <div className="mt-5">
        <h2>Submitted Data</h2>
        {submittedData && <pre className="bg-gray-100 p-2 rounded-md mt-2 overflow-auto text-sm">{JSON.stringify(submittedData, null, 2)}</pre>}
      </div>
    </div>
  );
}

export default ContactForm;
