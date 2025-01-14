"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const LeftSideBar = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { mutateAsync: signOut, isSuccess } = useSignOutAccount();
  const handleSignOut = () => {
    signOut();
  };
  useEffect(() => {
    if (isSuccess) {
      router.push("/auth/sign-in");
    }
  }, [isSuccess]);
  return (
    <div className="hidden md:flex h-screen max-w-[290px]  flex-col justify-between w-full px-4 py-6 bg-gray-950 text-gray-200">
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
      <div className="bg-gray-950 rounded-lg w-full mx-auto p-3 flex flex-col items-start shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-2 mb-3">
          <Image
            src={user?.imageUrl || "/icons/profile-placeholder.svg"}
            className="rounded-full border-2 border-gray-100"
            alt="Profile picture"
            height={40}
            width={40}
          />
          <div className="flex flex-col justify-center items-start">
          <span className="text-white text-lg font-semibold">
            {user?.name}
          </span>
          <span className="text-gray-300 text-sm">
            @{user?.username || "anonymous user" } 
          </span>
          </div>
        </div>

        <p className="text-white text-center text-sm font-medium max-w-xs opacity-80">
          {user?.bio || "Explore, Learn, Share!"}
        </p>

        <button className="mt-3 w-full py-1 px-4 bg-gray-800 text-white text-sm rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 focus:outline-none">
          Edit Profile
        </button>
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
      <button
        onClick={handleSignOut}
        className="bg-gray-950 flex px-3 items-center gap-3 "
      >
        <Image
          src={"/icons/logout.svg"}
          className="bg-gray-950"
          alt=""
          height={35}
          width={35}
        />
        <span className="bg-gray-950">Logout</span>
      </button>
    </div>
  );
};

export default LeftSideBar;
