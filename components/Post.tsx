import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { Models } from "appwrite";
import { AuthContext } from "@/context/AuthContext";

import { FiEdit } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import PostStats from "./PostStats";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const {user} = useContext(AuthContext)
  return (
    <div className="p-6 border border-gray-700 rounded-lg max-w-md mb-10 sm:max-w-lg md:max-w-3xl w-full shadow-lg bg-gray-950">
      {/* Creator Info */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.creator.name}`}>
            <div className="relative w-12 h-12">
              <Image
                src={
                  post.creator?.imageUrl ||
                  "/assets/icons/profile-placeholder.svg"
                }
                alt="creator"
                className="rounded-full "
                fill
                objectFit="cover"
              />
            </div>
          </Link>

          <div>
            <p className="text-lg font-semibold text-gray-100 hover:text-blue-400 transition duration-300">
              {post.creator.name}
            </p>
            <div className="text-sm text-gray-400 flex gap-2">
              <span className="font-medium">
                {new Date(post.$createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>•</span>
              <span className="italic">{post.location}</span>
            </div>
          </div>
        </div>
        {post.creator.$id === user.id && (
  <Link href={`/update-post/${post.$id}`} className="flex items-center space-x-1 text-blue-500 hover:text-blue-700">
    <Image src={'/icons/edit.svg' } alt="" height={20} width={20}/>
    
  </Link>
)}
      </div>
      <Link href={`/posts/${post.caption}`}>
        <div className="mb-6">
          <ul className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag: string, index: number) => (
              <li
                key={index}
                className="text-blue-400 text-sm font-semibold hover:underline"
              >
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Post Image */}
        
      </Link>
      {post.imageUrl && (
          <div className="relative my-4 w-full h-64 rounded-lg overflow-hidden shadow-md">
            <Image
              src={post.imageUrl}
              alt="post"
              className="rounded-lg hover:scale-105 transition-transform duration-500"
              fill
              objectFit="cover"
            />
          </div>
        )}
      {/* Post Content */}
          <p className="text-gray-300 text-sm hover:text-gray-100 transition duration-300">
            {post.caption || "Exploring the beauty of nature!"}
          </p>
        <div>
          <PostStats post={post} userId = {user.id}/>
        </div>
    </div>
  );
};

export default PostCard;
