import { MessageSquareHeart } from "lucide-react";
export function ThreadMessageLoading() {
  return (
    <div className="w-full mt-56 flex items-center justify-center bg-white py-10">
      <div className="flex flex-col items-center space-y-4">
        <MessageSquareHeart
          size={80}
          className="text-green-400 animate-bounce"
        />
        <h1 className="font-mono font-medium text-xl text-gray-900 animate-pulse">
          Loading messages
        </h1>
        <p className="text-gray-600 text-sm">
          Magkape ka muna pare, wait lang...
        </p>
      </div>
    </div>
  );
}
