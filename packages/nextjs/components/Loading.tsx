import React from "react";

type LoadingProps = {
  size?: "small" | "medium" | "large";
  color?: string;
};

const Loading: React.FC<LoadingProps> = ({ size = "medium", color = "text-blue-500" }) => {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} ${color} border-4 border-solid border-current border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default Loading;
