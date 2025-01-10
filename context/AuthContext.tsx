'use client'
import { IUser } from '@/types'
import { Issue } from 'next/dist/build/swc/types'
import React,{createContext,useEffect,useState,useContext} from 'react'

export const INITIAL_USER = {
    id:'',
    name:'',
    username:'',
    email:'',
    imageUrl:'',
    bio:''
}
const INITIAL_STATE = {
    user:INITIAL_USER,
    isLoading:false, 
    isAuthenticated:false,
    setUser : ()=>{},
    setIsAuthenticated:()=>{},
    checkAuthUser:async ()=> false as boolean
}
type ContextType={
    user:IUser,
    isLoading:boolean,
    isAuthenticated:boolean,
    setUser:React.Dispatch<React.SetStateAction<IUser>>,
    setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>,
    checkAuthUser:()=>Promise<boolean>
}

export const AuthContext = createContext<ContextType>(INITIAL_STATE)
const AuthProvider = ({children}:{children:React.ReactNode}) => {

    const [user,setUser] =useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const checkAuthUser = async ()=>{
        try {
            // const currentAccount = await getCurrentUser()
            return true 
        } catch (error) {
            console.log(error)
            return false
        }finally{
            setIsLoading(false)
        }

    }
    const value={
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated, 
        checkAuthUser
    }
  return (
   <AuthContext.Provider value={value}>
        {
            children
        }
   </AuthContext.Provider>
  )
}

export default AuthProvider
