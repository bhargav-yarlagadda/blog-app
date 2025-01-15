'use client';

import React, { useContext, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const BottomBar = () => {
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
    <div className="fixed bottom-0 w-full max-h-[100px] bg-gray-950 text-gray-200 flex md:hidden justify-around items-center px-4 py-2">

      {/* Navigation Links */}
      {sidebarLinks.map((link: any) => {
        const isActive = link.pathname === link.route;

        return (
          <div className="flex flex-col items-center" key={link.label}>
            <Link
              href={link.route}
              className={`flex items-center justify-center px-2 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-primary-500 text-gray-900"
                  : "hover:bg-blue-600 hover:text-white"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={30}
                height={30}
                className={`rounded-md transition-all duration-300 ${
                  isActive ? "bg-blue-600 text-white" : "bg-transparent"
                }`}
              />
            </Link>
            <span
              className={`text-sm font-medium mt-1 ${
                isActive ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {link.label}
            </span>
          </div>
        );
      })}

     
    </div>
  );
};

export default BottomBar;
