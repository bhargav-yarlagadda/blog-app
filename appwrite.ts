import { Account, Avatars, Client, Databases,Storage } from "appwrite"


export const appwriteConfig = {
    projectId:process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
    url:process.env.NEXT_PUBLIC_APPWRITE_PROJECT_URl || '', 
}

export const client = new Client()

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)
export const account = new Account(client)
