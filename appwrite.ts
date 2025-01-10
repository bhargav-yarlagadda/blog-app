import { Account, Avatars, Client, Databases,Storage } from "appwrite"


export const appwriteConfig = {
    projectId:process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
    url:process.env.NEXT_PUBLIC_APPWRITE_PROJECT_URl || '', 
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '', 
    storageId:  process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID || '', 
    userCollectionId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_USERS_COLLECTION_ID || '', 
    postCollectionId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_POSTS_COLLECTION_ID || '', 
    savesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_SAVES_COLLECTION_ID || '', 
    
}

export const client = new Client()

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)
export const account = new Account(client)
