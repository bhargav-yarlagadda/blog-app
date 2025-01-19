import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Models } from "appwrite";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="p-6 border border-gray-700 rounded-lg max-w-md mb-10 sm:max-w-lg md:max-w-3xl w-full shadow-lg bg-gray-900">
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
      </div>

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
    </div>
  );
};

export default PostCard;
