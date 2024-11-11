"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "@/components/custom/Header";
import bg from "@/../public/bg.png";
import Footer from "@/components/custom/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0">
          <Image
            src={bg}
            alt="Background"
            fill
            priority
            style={{
              backgroundAttachment: "fixed",
            }}
            className="object-cover brightness-50 "
          />
        </div>
        <div className="container relative flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center justify-center w-full gap-4 ">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Book Reading System Simplified
            </h1>
            <p className="text-xl text-white/80">
              Manage your book collection effortlessly with our intuitive book
              management system.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                variant="default"
                className="bg-white text-black"
              >
                Get started
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-black"
              >
                Learn more
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 bg-white text-black">
        <div className="container relative">
          <div className="flex flex-col gap-4 text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Explore the Key Features of Our Book Management Services
            </h2>
            <p className="text-xl text-black/80 mx-auto max-w-[800px]">
              Discover the ease of managing your book collection with our
              comprehensive services.
            </p>
          </div>
          <div className="flex gap-40 items-center justify-center">
            <div className="grid gap-4">
              <h3 className="text-xl font-bold text-black">
                Effortlessly Catalog Your Books
              </h3>
              <p className="text-black/80">
                Efficiently organize your books with ease.
              </p>
              <div className="flex gap-4">
                <Button>Get Started</Button>
                <Button>
                  Search
                  <span className="sr-only">Search feature</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
            <div className="grid gap-4">
              <h3 className="text-xl font-bold text-black">
                Track Your Books Seamlessly
              </h3>
              <p className="text-black/80">
                Effortlessly keep track of your books with our seamless tracking
                system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
