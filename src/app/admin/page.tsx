import Header from "@/components/custom/Header";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const AdminAuthPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tight">
                Admin Log In
              </h1>
              <p className="text-gray-500">
                Login With Your Email And Password provided by admin
              </p>
            </div>
            <form className="mt-8 space-y-4" action="/admin/books">
              <div>
                <Input
                  className="w-full"
                  id="email"
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div>
                <Input
                  className="w-full"
                  id="password"
                  placeholder="Password"
                  type="password"
                />
              </div>
              <Button
                className="w-full bg-black text-white hover:bg-gray-900"
                type="submit"
              >
                <a href="/admin/books">Log In</a>
              </Button>
            </form>
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
            </div>
            <div className="space-y-3">
              <Button
                className="flex w-full items-center justify-center gap-2 border"
                variant="outline"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 48 48"
                >
                  <path d="M24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4ZM24 7C33.3888 7 41 14.6112 41 24C41 32.9056 34.0533 40.2122 25.3657 40.9307L25.3636 29.6801H30.2161L30.9353 24.0972H25.3636V20.4882C25.3636 18.9117 26.0278 17.3797 28.5399 17.3797H31.1818V12.5966C31.1818 12.5966 28.8528 12.2072 26.6218 12.2072C21.9661 12.2072 18.9091 14.9014 18.9091 19.8449V24.0972H13.7273V29.6801H18.9091V40.9307C10.2215 40.2122 3.27273 32.9056 3.27273 24C3.27273 14.6112 10.8839 7 20.2727 7H24Z" />
                </svg>
                Log in with Facebook
              </Button>
              <Button
                className="flex w-full items-center justify-center gap-2 border"
                variant="outline"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Log in with Google
              </Button>
              <Button
                className="flex w-full items-center justify-center gap-2 border"
                variant="outline"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Log in with Apple
              </Button>
            </div>
            <div className="space-y-2 text-center">
              <Link
                className="text-sm text-gray-500 hover:text-gray-900"
                href="/"
              >
                Forgot your password?
              </Link>
              <div className="text-sm">
                {"Don&quot;t have an account? "}
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
