"use client";
import { useState } from "react";
import './contact.css'
import FloatingSocialHandle from "../components/FloatingSocialHandle";
const ContactForm = () => {
  const initialFormData = {
    name: "",
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState({ ...initialFormData });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("");

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmissionStatus("Sent");
        setFormData({ ...initialFormData }); // Reset form fields
        setTimeout(() => setSubmissionStatus(""), 3000); // Clear status after 3 seconds
      } else {
        setSubmissionStatus("Failed");
      }
    } catch (error) {
      console.log(error);
      setSubmissionStatus("Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-light text-gray-900 dark:text-gray-100 sm:text-4x sm:leading-10 md:text-6xl md:leading-14">
          Ask me anything !
        </h1>
      </div>
      <FloatingSocialHandle />
      <div className="w-full">
        <div className="max-w-[500px] mx-auto mt-8">
          <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
            <div className="mb-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full p-2 focus:ring-teal-500 focus:border-teal-500 block border-neutral-300 rounded bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 my-input"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full p-2 focus:ring-teal-500 focus:border-teal-500 block border-neutral-300 rounded bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 my-input"
              />
            </div>
            <div className="mb-6">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full p-2 focus:ring-teal-500 focus:border-teal-500 block border-neutral-300 rounded bg-gray-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 my-input"
                rows={4}
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-teal-500 dark:bg-teal-800 text-neutral-900 dark:text-neutral-100 font-semibold p-3 rounded focus:outline-none focus:bg-teal-500 focus:text-white ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "Pending" : "Submit"}
              </button>
            </div>
          </form>
          {submissionStatus === "Sent" && (
            <div className="bg-green-200 dark:bg-green-700 text-green-700 dark:text-green-100 p-2 rounded mt-2">
              Message sent successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
