import {
  account,
  appwriteConfig,
  avatars,
  storage,
  databases,
} from "@/appwrite";
import { INewPost,IUpdatePost, INewUser } from "@/types";
import { Query } from "appwrite";
import { ID } from "appwrite";
import { use } from "react";

export async function createUserAccount({ user }: { user: INewUser }) {
  try {
    // user authientication
    console.log(user);
    const newAccount = await account.create(
      ID.unique(),
      user.email, // Now you can access `email`, `password`, etc.
      user.password,
      user.name
    );
    if (!newAccount) {
      throw Error;
    }
    const avatarUrl = avatars.getInitials(user.name);
    // creating a new user to db,into users collections
    const newUser = await saveUserToDB({
      accountId: newAccount?.$id,
      name: newAccount?.name,
      email: newAccount?.email,
      username: user?.username,
      imageUrl: new URL(avatarUrl) || "",
    });

    return newUser;
  } catch (error: any) {
    console.log("cannot create user ", error?.message);
    return error.message;
  }
}
export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return session;
  } catch (error) {
    console.log("unable to to create session");
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw Error;
    }
    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) {
      throw Error;
    }
    return currentUser.documents[0];
  } catch (error: any) {
    console.log("unable to find the user", error.message);
  }
}
export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
  } catch (error: any) {
    console.log("error in signing out ", error.message);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET FILE URL
export function getFilePreview(fileId: string) {
  try {
    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      undefined,
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(post: INewPost) {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Create post
    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}

export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );
    if (!posts) {
      throw Error;
    }
    return posts;
  } catch (error) {
    console.log("Cannot Retrive posts in getRecentPosts");
  }
}


export async function likePost(postId:string,likesArray:string[]){
  try {
    const updatedPost = await databases.updateDocument(appwriteConfig.databaseId,appwriteConfig.postCollectionId,postId,{
      likes:likesArray
    })
    if(!updatedPost){
      throw Error
    }
    return updatedPost
  } catch (error:any) {
    console.log("could not like post ",error.message)
  }
}
export async function savePost(userId:string,postId:string){
  console.log(postId,userId)
  try {
    const updatedPost = await databases.createDocument (appwriteConfig.databaseId,appwriteConfig.savesCollectionId,ID.unique(),
    {
      user:userId,
      post:postId
    })
    if(!updatedPost){
      throw Error
    }
    return updatedPost
  } catch (error:any) {
    console.log("could not like post ",error.message)
  }
}

export async function deleteSavePost(savedRecordId:string ){
  try {
    const statusCode = await databases.deleteDocument (appwriteConfig.databaseId,appwriteConfig.savesCollectionId,savedRecordId)
    if(!statusCode){
      throw Error
    }
    return {status:"ok"}
    } catch (error:any) {
    console.log("could not like post ",error.message)
  }
}


export async function getPostById(postId:string){
  try {
    const post = databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId 
    )
    return post
  } catch (error) {
      console.log(error)
  }
}

// ============================== UPDATE POST

export async function updatePost(post: IUpdatePost) {
  const hasFileToUpdate = post.file.length > 0;

  try {
    let image = {
      imageUrl: new URL(post.imageUrl), // Convert string to URL
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) throw new Error("File upload failed");

      // Get new file URL
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw new Error("Failed to get file preview");
      }

      image = { 
        ...image, 
        imageUrl: new URL(fileUrl), // Convert string to URL
        imageId: uploadedFile.$id 
      };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Update post
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl.toString(), // Save as string in database
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    // Failed to update
    if (!updatedPost) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }

      throw new Error("Failed to update post");
    }

    // Safely delete old file after successful update
    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}
