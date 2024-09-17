import { Dribbble } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="min-h-[85vh] w-full flex flex-col justify-center items-center space-y-4 bg-gray-50 dark:bg-[#0f0f0f]">
      <Dribbble className="text-green-400 animate-bounce" size={54} />
      <p className="text-sm text-gray-800 animate-pulse font-mono dark:text-white">
        Loading, please wait...
      </p>
    </div>
  );
}
