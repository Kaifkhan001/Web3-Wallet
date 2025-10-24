import { useEffect } from "react"


const Button = ({ text, onClick, className, disabled=true } : { text: string, onClick?: () => void, className?: string, disabled?: boolean }) => {
  useEffect(() => {
   console.log("Disabled:- ", disabled);
  }, [disabled]);
  
  return (
    <button disabled={!disabled}  onClick={onClick} type="button" className={`text-white  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none dark:focus:ring-blue-800 mt-2 ${className} ${!disabled ? "cursor-not-allowed bg-blue-500" : "cursor-pointer bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"}`}>{text}</button>
  )
}

export default Button
