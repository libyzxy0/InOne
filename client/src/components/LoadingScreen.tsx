import { LoaderCircle } from "lucide-react";

export function LoadingScreen() {
  return (
    <div className="min-h-[85vh] w-full flex justify-center items-center">
      <LoaderCircle className="text-gray-800 animate-spin" size={40} />
    </div>
  )
}