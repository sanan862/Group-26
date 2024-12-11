"use client";

import Header from "@/components/custom/Header";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const AdminAuthPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize the Next.js router for navigation

  // Handle form submission (login)
  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Validate input
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/adminlogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed.');
      }

      // Save the token and redirect to the dashboard
      localStorage.setItem('authToken', data.token);
      setEmail('');  // Clear email field
      setPassword('');  // Clear password field
      setError('');  // Clear any previous error

      alert("Login successful");

      // Use Next.js router for navigation
      router.push('/admin/books'); // Redirect to admin dashboard

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">Admin Log In</h1>
              {error && <p className="text-red-500">{error}</p>}
              <p className="text-gray-500">
                Login with your email and password provided by admin
              </p>
            </div>

            {/* Form for Login */}
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                className="w-full bg-black text-white hover:bg-gray-900"
                type="submit"
              >
                Log In
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-3">
              {/* Facebook, Google, and Apple login buttons */}
              {/* Social Login buttons are kept the same */}
            </div>

            <div className="space-y-2 text-center">
              <Link
                className="text-sm text-gray-500 hover:text-gray-900"
                href="/"
              >
                Forgot your password?
              </Link>
              <div className="text-sm">
                {"Don't have an account? "}
                <Link
                  className="font-medium hover:text-gray-900"
                  href="/signup"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAuthPage;
