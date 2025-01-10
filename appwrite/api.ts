import { account, appwriteConfig, avatars, databases } from "@/appwrite";
import { INewUser } from "@/types";
import {  ID } from "appwrite";
import { Url } from "next/dist/shared/lib/router/router";


export async function createUserAccount({ user }: { user: INewUser }) {
    try {

        // user authientication
        const newAccount = await account.create(
            ID.unique(),
            user.email,  // Now you can access `email`, `password`, etc.
            user.password,
            user.name   
        );
        if(!newAccount){
            throw Error
        }
        const avatarUrl = avatars.getInitials(user.name)
        // creating a new user to db,into users collections
        const newUser = await saveUserToDB({
            accountId:newAccount?.$id,
            name:newAccount.name,
            email:newAccount.email,
            username:user.username,
            imageUrl: new URL(avatarUrl),
})

        return newUser
    } catch (error: any) {
        console.log("cannot create user ", error?.message);
        return error.message
    }
}
export async function saveUserToDB(user:{
    accountId:string,
    email:string ,
    name:string,
    imageUrl:URL,
    username?:string
}){
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user 
        )
        return newUser
    } catch (error:any) {
        console.log(error.message)
    }
}

export async function  signInAccount(user:{email:string,password:string}) {
    try {
        const session = await account.createEmailPasswordSession(user.email,user.password)
        return session
    } catch (error) {
        console.log("unable to to create session")
    }
}