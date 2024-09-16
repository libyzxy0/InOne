import { MessageSquareDashed } from 'lucide-react'
export function ThreadMessageEmpty() {
  return (
    <div className="w-full mt-56 flex items-center justify-center bg-white py-10">
      <div className="flex flex-col items-center space-y-4">
        <MessageSquareDashed size={80} className="text-gray-500" />
        <h1 className="font-mono font-medium text-xl text-gray-600">There's no messages yet.</h1>
        <p className="text-gray-600 text-sm">Be the first one to chat!</p>
      </div>
    </div>
  )
}