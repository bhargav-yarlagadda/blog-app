
const Loading = () => {
    return (
        <div className='flex space-x-2 absolute inset-0  justify-center items-center h-screen bg-gray-900 bg-opacity-75'>
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 bg-white rounded-full animate-bounce'></div>
        </div>
    )
}

export default Loading