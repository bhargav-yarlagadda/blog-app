import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";

const LeftSideBar = () => {
  return (
    <div className="h-screen max-w-[290px] w-full px-4 py-6 bg-gray-950 text-gray-200">
      {/* Logo Section */}
      <div className="flex justify-center bg-gray-950 items-center mb-8">
        <Image
          src="/images/logo.svg"
          alt="Logo"
          height={80}
          width={200}
          className="object-contain bg-gray-950"
        />
      </div>

      <div>
        
      </div>

      {/* Navigation Links */}
      <ul className="flex flex-col bg-transparent gap-4">
        {sidebarLinks.map((link: any) => {
          const isActive = link.pathname === link.route;

          return (
            <li className="bg-gray-950" key={link.label}>
              <Link
                href={link.route}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-primary-500 text-gray-900"
                    : "bg-gray-950 hover:bg-blue-600 hover:text-white"
                }`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={30}
                  height={30}
                  className={`rounded-md bg-transparent transition-all duration-300 ${
                    isActive ? "bg-blue-600" : "bg-gray-900"
                  }`}
                />
                <span
                  className={`text-sm font-medium  bg-transparent ${
                    isActive ? "text-gray-900" : "text-gray-400"
                  } group-hover:text-white`}
                >
                  {link.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSideBar;
