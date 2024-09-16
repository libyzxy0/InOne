import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import axios from "axios";
import { API_BASE } from "@/constants";
import Cookies from "js-cookie";

type Props = {
  onChangeThread: (v: string) => void;
  thread: string;
};
type ThreadType = {
  id: string;
  name: string;
  photo: string;
};

export function Header({ onChangeThread, thread }: Props) {
  const [threadList, setThreadList] = useState<ThreadType[] | null>(null);

  useEffect(() => {
    const handleThreadFetch = async () => {
      const response = await axios.get(API_BASE + "/get-all-thread");
      setThreadList(response.data);
      const thread = Cookies.get("thread");
      onChangeThread(thread || response.data[0].id);
    };
    handleThreadFetch();
  }, []);

  return (
    <header className="w-full text-gray-100 py-2 px-6 flex items-center justify-between md:px-8 lg:px-10 fixed top-0 z-40 bg-white backdrop-filter backdrop-blur-md bg-opacity-30">
      <nav className="flex items-center gap-4">
        <Link to="#" className="font-bold text-lg text-gray-800 font-mono">
          InOne
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="font-bold text-lg text-gray-800 font-mono">
              <i className="text-green-400 capitalize">
                {threadList && threadList.find((t) => t.id === thread)?.name}
              </i>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Select Group</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={thread}
              onValueChange={onChangeThread}
            >
              {threadList &&
                threadList.map((thread, index) => (
                  <DropdownMenuRadioItem key={index} value={thread.id}>
                    {thread.name}
                  </DropdownMenuRadioItem>
                ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
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
