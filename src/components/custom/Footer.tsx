import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative border-t flex justify-center border-white/10 text-black">
      <div className="container flex flex-col sm:flex-row items-center justify-between py-8 gap-4">
        <Link href="/" className="text-xl font-bold">
          AML
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/" className="text-base   font-medium hover/80">
            Home
          </Link>
          <Link href="/search" className="text-base  font-medium hover/80">
            Search
          </Link>
          <Link href="/dashboard" className="text-base   font-medium hover/80">
            Dashboard
          </Link>
          <Link href="/login" className="text--base  font-medium hover/80">
            Login
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
