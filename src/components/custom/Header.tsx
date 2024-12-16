import Link from "next/link";

import React from "react";
import { Button } from "../ui/button";

const Header = ({ isLoggedIn = false }: { isLoggedIn?: boolean }) => {
  return (
    <header className="flex justify-center top-0 w-full z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex items-center justify-between py-4">
        <Link href="/" className="text-4xl font-bold">
          AML
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium">
            Home
          </Link>
          <Link href="/search" className="text-sm font-medium">
            Search
          </Link>
          <Link href="/dashboard" className="text-sm font-medium">
            Dashboard
          </Link>
          {!isLoggedIn ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/signup">Signup</Link>
              </Button>
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
