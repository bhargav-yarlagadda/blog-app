"use client";

import { AuthContext } from "@/context/AuthContext";
import {
  useGetPostById,
  useUpdatePost,
} from "@/lib/react-query/queriesAndMutations";
import Loader from "@/components/Loader";
import Image from "next/image";
import React, { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const EditPost = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const { data, isPending } = useGetPostById(postId);

  const { mutateAsync: updatePost, isPending: isUpdatingPost } = useUpdatePost();

  // States
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState("");
  const [location, setLocation] = useState("");
  const [isMandatory, setIsMandatory] = useState({
    caption: false,
    image: false,
  });

  // Set initial state based on fetched data
  useEffect(() => {
    if (data) {
      setCaption(data.caption || "");
      setTags(data.tags?.join(", ") || "");
      setLocation(data.location || "");
      setImage(null); // Reset image since user input is required
    }
  }, [data]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedMandatory = {
      caption: !caption,
      image: !image && !data?.imageUrl, // Check if image exists in data or user uploaded a new one
    };
    setIsMandatory(updatedMandatory);

    if (updatedMandatory.caption || updatedMandatory.image) {
      return;
    }

    try {
      const fileArray = image ? [image] : [];
      const updatedPost = await updatePost({
        postId: postId,
        caption,
        file: fileArray,
        location,
        tags: tags,
        imageUrl: data?.imageUrl || "",
        imageId: data?.imageId || "",
      });

      if (updatedPost) {
        console.log("Post updated successfully:", updatedPost);
        router.push("/");
      } else {
        console.error("Failed to update post");
      }
    } catch (error) {
      console.error("Error during post update:", error);
    }
  };

  if (isPending || isUpdatingPost) return <Loader />;
  if (!data) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-500">Post does not exist.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-900 text-white flex justify-center py-10 md:pb-0">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl px-6 py-10 mb-6 md:py-4 bg-gray-800 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-center">Edit Post</h2>

        <div className="mb-4">
          <label htmlFor="caption" className="block text-sm font-medium mb-2">
            Caption
          </label>
          <textarea
            id="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={2}
            className={`w-full max-h-[100px] overflow-y-scroll px-4 py-2 bg-gray-700 text-white rounded-md border ${
              isMandatory.caption ? "border-red-500" : "border-gray-600"
            } focus:outline-none focus:border-blue-500`}
            placeholder="Enter your caption"
          />
          {isMandatory.caption && (
            <p className="text-red-500 text-xs mt-2">Caption is required</p>
          )}
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-white mb-4"
          >
            {!image && !data?.imageUrl ? (
              <div className="bg-gray-700 cursor-pointer border-dotted py-8 text-center rounded-xl">
                <div className="flex justify-center items-center">
                  <Image
                    src="/icons/add-post.svg"
                    alt="Upload Icon"
                    height={55}
                    width={55}
                  />
                </div>
                <span className="text-gray-300 font-semibold text-lg">
                  Upload Image
                </span>
                <p className="text-gray-500 text-xs mt-2">
                  Click or drag to upload an image
                </p>
              </div>
            ) : (
              <div className="relative flex flex-col justify-center items-center">
                <Image
                  src={image ? URL.createObjectURL(image) : data.imageUrl}
                  alt="Uploaded Image"
                  height={250}
                  width={300}
                  className="rounded-lg w-[90%] cursor-pointer max-h-[190px]"
                />
                <span className="text-sm font-normal mt-3 text-gray-300">
                  Click on image to replace the file
                </span>
              </div>
            )}
          </label>
          <input
            type="file"
            id="image"
            accept=".svg,.png,.jpg,.jpeg"
            onChange={handleImageChange}
            className="hidden"
          />
          {isMandatory.image && (
            <p className="text-red-500 text-xs mt-2">Image is required</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-sm font-medium mb-2">
            Tags (separated by commas)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter tags"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:outline-none focus:border-blue-500"
            placeholder="Enter location"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-1/3 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Update Post
          </button>
          <button
            type="reset"
            onClick={() => {
              setCaption(data?.caption || "");
              setTags(data?.tags?.join(", ") || "");
              setLocation(data?.location || "");
              setImage(null);
            }}
            className="w-1/3 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-700 focus:outline-none"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
