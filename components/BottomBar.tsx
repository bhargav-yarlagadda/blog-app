'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";

const BottomBar = () => {


  return (
    <div className="fixed flex bottom-0 w-full px-2 sm:px-6 max-h-[80px] bg-gray-950 text-gray-200 md:hidden  justify-between">
      {/* Navigation Links */}
      {sidebarLinks.map((link: any) => {
        const isActive = link.pathname === link.route;

        return (
          <div className="flex flex-col items-center" key={link.label}>
            <Link
              href={link.route}
              className={`flex items-center justify-center flex-1 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-primary-500 text-gray-900"
                  : "hover:bg-blue-600 hover:text-white"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={25}
                height={20}
                className={`rounded-md  transition-all  duration-300 ${
                  isActive ? "bg-blue-600" : "bg-transparent"
                }`}
              />
            </Link>
            <span
              className={`text-xs mt-1 ${
                isActive ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {link.label}
            </span>
          </div>
        );
      })}

      {/* Logout Section */}
    </div>
  );
};

export default BottomBar;
