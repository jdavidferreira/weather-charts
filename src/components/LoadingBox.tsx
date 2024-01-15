export const LoadingBox = ({ text = 'Loading...' }) => {
  return (
    <div className="w-full h-full dark:bg-gray-800 animate-pulse rounded-md flex items-center justify-center">
      {text}
    </div>
  )
}
