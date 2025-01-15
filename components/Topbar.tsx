'use client'
import { AuthContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

const Topbar = () => {
  const router = useRouter()
  const {mutateAsync:signOut,isSuccess} = useSignOutAccount()
  const {user} = useContext(AuthContext)
  const handleSignOut = ()=>{
    signOut()
  }
  useEffect(()=>{
    if(isSuccess){
      router.push('/auth/sign-in')
    }
  },[isSuccess])
  return (
    <div className=" md:hidden flex bg-gray-900 justify-between w-full py-3 px-5">
      <div className="bg-gray-900 ">
        <Link href={"/"}>
          <Image src={"/images/logo.svg"} className="bg-gray-900"  alt="" width={170} height={140} />
        </Link>
      </div>
      <div className="flex bg-gray-900 gap-4">
        <button >
          <Link href={`/update-profile/${user.id}`} className="flex items-center  bg-gray-900 justify-center">
          
                <Image src={user.imageUrl || '/icons/profile-placeholder.svg'} alt="" width={25} height={25} className="rounded-full bg-gray-900">
          </Image>
                
          </Link>
        </button>
        <button onClick={handleSignOut}>
          <Image src={"/icons/logout.svg"} className="bg-gray-900" alt="" width={25} height={25} />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
