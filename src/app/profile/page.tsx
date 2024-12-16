"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProfileNav from "@/components/custom/Profilenav";
import Header from "@/components/custom/Header";

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState({ full_name: "", email: "", password: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch("http://localhost:4000/api/useraccountinfo", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user information.");
        }

        const data = await response.json();
        setUserInfo(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
<div>
<Header isLoggedIn />

  <ProfileNav/>
<div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <div className="mb-2">
        <strong>Full Name:</strong> {userInfo.full_name}
      </div>
      <div className="mb-2">
        <strong>Email:</strong> {userInfo.email}
      </div>
      <div className="mb-2">
        <strong>Password:</strong> {userInfo.password}
      </div>
    </div>

</div>
  );
}
