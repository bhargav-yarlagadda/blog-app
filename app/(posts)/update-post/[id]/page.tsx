import React from 'react'
import EditPost from '@/components/EditPost'
const page = async ({params}:{params:{id:string}}) => {
    const id = (await params).id
  return (
    <div className='bg-gray-950 h-screen w-full text-wrap text-white'>
        <EditPost postId ={id} />
    </div>
  )
}

export default page