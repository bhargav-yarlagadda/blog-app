
const Loading = () => {
    return (
        <div className='flex space-x-8 absolute z-50 inset-0 w-screen justify-center items-center h-screen bg-gray-900 bg-opacity-85'>
            <span className='sr-only'>Loading...</span>
            <div className='h-10 w-10  bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-10 w-10  bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-10 w-10  bg-black rounded-full animate-bounce'></div>
        </div>
    )
} 

export default Loading