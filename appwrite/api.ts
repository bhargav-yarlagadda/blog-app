import { account } from "@/appwrite";
import { INewUser } from "@/types";
import { ID } from "appwrite";


export async function createUserAccount({ user }: { user: INewUser }) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,  // Now you can access `email`, `password`, etc.
            user.password,
            user.name   
        );

        return newAccount
    } catch (error: any) {
        console.log("cannot create user ", error?.message);
        return error.message
    }
}
