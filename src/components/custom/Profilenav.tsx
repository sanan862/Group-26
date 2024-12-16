import React from "react";
import Link from "next/link";

const ProfileNav = () => {
  return (
    <header className="relative border-t flex justify-center border-white/10 text-black">
      <div className="container flex flex-col sm:flex-row items-center justify-between py-8 gap-4">
        <nav className="flex gap-4 sm:gap-6">
        
        <Link href="/profile" className="text-base hover:text-blue-500  font-medium hover/80">
          Profile
        </Link>

        <Link href="/dashboard" className="text-base hover:text-blue-500  font-medium hover/80">
           Dashboard
          </Link>

          <Link href="/borrowhistory" className="text-base hover:text-blue-500  font-medium hover/80">
           Borrowing History
          </Link>
          
          <Link href="/contact" className="text-base hover:text-blue-500  font-medium hover/80">
           Contact
          </Link>

        </nav>
      </div>
    </header>
  );
};

export default ProfileNav;
