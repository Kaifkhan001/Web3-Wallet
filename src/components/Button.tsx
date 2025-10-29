const colorThemes = {
  blue: 'focus:ring-blue-300 bg-blue-500 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700',
  red: 'focus:ring-red-300 bg-red-500 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700',
  green: 'focus:ring-green-300 bg-green-500 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700',
};

const Button = ({ text, onClick, className, disabled = true, themeColor = 'blue' }: { text: string, onClick?: () => void, className?: string, disabled?: boolean,themeColor?: 'blue' | 'red' | 'green'  }) => {
  const themeClasses = colorThemes[themeColor] || colorThemes.blue;

  return (
    <button
      disabled={!disabled}
      onClick={onClick}
      className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none mt-2
        ${!disabled ? 'cursor-not-allowed' : 'cursor-pointer'}
        ${themeClasses} ${className}`}
    >
      {text}
    </button>
  );
};


export default Button;

