import { Metadata } from 'next'
import React from 'react'

export const metadata:Metadata={
    title:'BlogVerse | Posts'
}
const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-full bg-gray-950'>
        {children}
    </div>
  )
}

export default layout