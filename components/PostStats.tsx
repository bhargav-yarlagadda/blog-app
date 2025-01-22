"use client";

import { Models } from "appwrite";
import { useState, useEffect } from "react";
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutations";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const checkIsLiked = (likeList: string[], userId: string) => {
  return likeList.includes(userId);
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavePost, isPending: isDeletingSavedPost } =
    useDeleteSavedPost();
  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [savedPostRecord]);

  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const updatedLikes = likes.includes(userId)
      ? likes.filter((id) => id !== userId)
      : [...likes, userId];

    setLikes(updatedLikes);
    likePost({ postId: post.$id, likesArray: updatedLikes });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (isSaved) {
      deleteSavePost(savedPostRecord.$id, {
        onSuccess: () => setIsSaved(false),
      });
    } else {
      savePost({ userId, postId: post.$id }, { onSuccess: () => setIsSaved(true) });
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      {/* Likes Section */}
      <div className="flex gap-2 mr-5">
        <img
          src={`${
            checkIsLiked(likes, userId) ? "/icons/liked.svg" : "/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      {/* Save Section */}
      <div className="flex gap-2">
        {isSavingPost || isDeletingSavedPost ? (
          <Loader />
        ) : (
          <img
            src={isSaved ? "/icons/saved.svg" : "/icons/save.svg"}
            alt="save"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;

// Loader Component
const Loader = () => (
  <div className="w-5 h-5 border-2 border-white border-t-blue-500 rounded-full animate-spin"></div>
);
