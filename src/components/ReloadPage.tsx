

const ReloadPage = ({ handleClick, isLoading }: { handleClick : () => void; isLoading: boolean;}) => {
  return (
    <div className='w-full h-screen flex items-center justify-center gap-6 flex-col'>
      <h5 className='text-center text-2xl font-semibold '>Seems, Something went wrong while loading the details!!</h5>
       <button
       onClick={handleClick}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md px-3 cursor-pointer font-semibold"
            >
              {isLoading ? "Processing..." : "Try Reloading..."}
            </button>
    </div>
  )
}

export default ReloadPage
