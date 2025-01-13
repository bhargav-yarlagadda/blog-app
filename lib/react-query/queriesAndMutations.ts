import { createUserAccount, signInAccount, signOutAccount } from '@/appwrite/api'
import { INewUser } from '@/types'
import {
    useQueries,
    useMutation,
    useQueryClient,
    useInfiniteQuery
} from '@tanstack/react-query'



export const useCreateUserAccountMutation = ()=>{
    
    return useMutation(
        {
            mutationFn: (user: INewUser)=> createUserAccount({user})
        }
    )


}
export const useSignInAccount = ()=>{
    
    return useMutation(
        {
            mutationFn: (user: {email:string,password:string})=> signInAccount(user)
        }
    )


}
export const useSignOutAccount = ()=>{
    return useMutation(
        {
            mutationFn:signOutAccount
        }
    )   
}