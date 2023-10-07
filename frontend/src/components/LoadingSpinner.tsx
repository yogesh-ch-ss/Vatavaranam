const LoadingSpinner = (): JSX.Element => {
  return (
    // <div className="flex items-center justify-center min-h-screen">
    //   <div className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"></div>
    //   <h1 className="ml-2 text-lg">Loading...</h1>
    //   <p className="ml-2 text-sm">(Fetching Data from API)</p>
    // </div>

    <div className="flex items-center justify-center min-h-screen">
      <button
        type="button"
        className="h-max w-max rounded-lg text-white font-bold hover:cursor-not-allowed duration-[500ms,800ms]"
        disabled
      >
        <div className="flex items-center justify-center m-[10px]">
          <div className="h-10 w-10 border-t-transparent border-solid animate-spin rounded-full border-violet-700 border-4" />
        </div>
      </button>
    </div>
  )
}

export default LoadingSpinner
