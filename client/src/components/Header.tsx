import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="w-full text-gray-100 py-2 px-6 flex items-center justify-between md:px-8 lg:px-10 fixed top-0 z-40 bg-white backdrop-filter backdrop-blur-md bg-opacity-30">
      <nav className="flex items-center gap-4">
        <Link to="#" className="font-bold text-lg text-gray-800 font-mono">
          InOne
        </Link>
        <Link
          to="#"
          className="text-sm hover:underline font-mono text-gray-800"
        >
          Groups
        </Link>
        <Link
          to="#"
          className="text-sm hover:underline font-mono text-gray-800"
        >
          Updates
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="hidden md:block">
          <Search className="w-5 h-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="w-8 h-8 border">
                <AvatarImage
                  src="https://v0.dev/placeholder-user.jpg"
                  alt="User Avatar"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
