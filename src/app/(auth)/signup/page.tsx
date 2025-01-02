"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Component() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter(); // Initialize the router

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // some snippets of this function were found using chatgpt
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setSuccess(result.message || "Account created successfully!");

      // Redirect to login page after a short delay to show success message
      setTimeout(() => {
        router.push("/login");
      }, 2000); // Adjust delay as needed
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Sign Up</h1>
          <p className="text-gray-500">Create your account</p>
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
            <Input
              className="w-full"
              id="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              className="w-full"
              id="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <Button
            className="w-full bg-black text-white hover:bg-gray-900"
            type="submit"
          >
            Create Account
          </Button>
        </form>
        <div className="text-center text-sm">
          Already have an account?&nbsp;
          <Link className="font-medium hover:text-gray-900" href="/login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
