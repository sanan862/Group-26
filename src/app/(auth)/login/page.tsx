"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Component() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  
    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error);
      }
  
      // Save the token in localStorage
      localStorage.setItem('authToken', data.token);
  
      alert('Login successful!');
    } catch (error: any) {
      console.error("Error during login:", error);
      setError(error.message); // Properly update the error state
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Log In</h1>
          <p className="text-gray-500">Login With Your Email And Password</p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500">{error}</p>}
          <div>
            <Input
              className="w-full"
              id="email"
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Input
              className="w-full"
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            className="w-full bg-black text-white hover:bg-gray-900"
            type="submit"
          >
            Log In
          </Button>
        </form>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
        </div>
        <div className="space-y-2 text-center">
          <Link className="text-sm text-gray-500 hover:text-gray-900" href="/">
            Forgot your password?
          </Link>
          <div className="text-sm">
            {"Don&quot;t have an account? "}
            <Link className="font-medium hover:text-gray-900" href="/signup">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
