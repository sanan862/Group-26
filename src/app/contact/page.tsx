"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import emailjs from "emailjs-com";

// Navbar component (from the first code)
function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">MySite</div>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-gray-400">
            Home
          </Link>
          <Link href="/about" className="text-white hover:text-gray-400">
            About
          </Link>
          <Link href="/contact" className="text-white hover:text-gray-400">
            Contact
          </Link>
          <Link href="/login" className="text-white hover:text-gray-400">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Simple validation
    if (!formData.fullName || !formData.email || !formData.message) {
      return setError("All fields are required.");
    }

    // EmailJS integration
    const serviceId = "service_410vvos"; // Your EmailJS service ID
    const templateId = "template_onyyr0j"; // Your EmailJS template ID
    const publicKey = "kRJdXdNBhEKSyn9cJ"; // Your EmailJS public key

    emailjs
      .send(
        serviceId,
        templateId,
        {
          fullName: formData.fullName,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      )
      .then(
        (response:any) => {
          console.log("Success:", response);
          setSuccess("Message sent successfully!");
          setFormData({ fullName: "", email: "", message: "" }); // Clear the form
        },
        (error:any) => {
          console.error("EmailJS Error:", error);

          // If error has a response, log it
          if (error.response) {
            console.error("Error Response:", error.response);
            setError(`Failed to send the message. ${error.response}`);
          } else {
            console.error("Error Message:", error.message);
            setError("Failed to send the message. Please try again later.");
          }
        }
      );
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Contact Form */}
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
            <p className="text-gray-500">We'd love to hear from you!</p>
          </div>
          <div className="space-y-4 text-center">
            <p className="text-sm text-gray-700">
              <strong>Phone:</strong> (123) 456-7890
            </p>
            <p className="text-sm text-gray-700">
              <strong>Email:</strong>{" "}
              <a
                href="mailto:eliasali570@gmail.com"
                className="text-blue-500 hover:underline"
              >
                eliasali570@gmail.com
              </a>
            </p>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <Input
                className="w-full"
                id="fullName"
                placeholder="Full Name"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Input
                className="w-full"
                id="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <textarea
                id="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>
            <Button
              className="w-full bg-black text-white hover:bg-gray-900"
              type="submit"
            >
              Send Message
            </Button>
          </form>
          <div className="text-center text-sm">
            <Link className="font-medium hover:text-gray-900" href="/">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
