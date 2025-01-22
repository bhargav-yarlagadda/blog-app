"use client";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import React from "react";
import PostCard from "@/components/Post";

const Page = () => {
  const {
    data: posts,
    isPending: isRetrievingPosts,
    isError,
  } = useGetRecentPosts();

  return (
    <div
    style={{scrollbarWidth:"none"}}
      className="h-screen bg-gradient-to-b from-gray-900 to-black text-white items-center py-10 flex w-full flex-col overflow-y-scroll no-scrollbar"
    >
      {/* Show loading animation */}
      {(isRetrievingPosts || !posts) && <Loading />}

      {/* Title */}
      <h1 className="text-2xl font-light text-center mb-6">Home Feed</h1>

      {/* Posts */}
      <div className="w-full max-w-3xl flex flex-col gap-6 px-4">
        {posts?.documents.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="flex flex-col fixed z-50 inset-0 w-screen h-screen justify-center items-center bg-gray-800 bg-opacity-80">
      {/* Bouncing Dots */}
      <div className="flex gap-4">
        <div className="h-8 w-8 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-blue-500 rounded-full animate-bounce"></div>
      </div>

      {/* Loading Text */}
      <span className="text-white text-lg mt-6 font-medium">
        Please hold on while we fetch your feed...
      </span>
    </div>
  );
};

export default Page;
