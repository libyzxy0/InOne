import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from '@/components/theme-toggle'
import { useAuth } from '@/hooks/useAuth'
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
import { CirclePlus } from "lucide-react";
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
  const { user } = useAuth();
  const [threadList, setThreadList] = useState<ThreadType[] | null>(null);
  const navigate = useNavigate();
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
    <header className="w-full text-gray-100 py-2 px-6 flex items-center justify-between md:px-8 lg:px-10 fixed top-0 z-40 bg-white dark:bg-[#0f0f0f] backdrop-filter backdrop-blur-md bg-opacity-30">
      <nav className="flex items-center gap-4">
        <Link to="#" className="font-bold text-lg text-gray-800 font-mono dark:text-white">
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
                threadList.map((threadData, index) => (
                  <DropdownMenuRadioItem
                    key={index}
                    value={threadData.id}
                    className={`${threadData.id == thread && "font-mono font-semibold text-green-400"}`}
                  >
                    {threadData.name}
                  </DropdownMenuRadioItem>
                ))}
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate("/new-thread")}
              className="flex flex-row space-x-2 bg-green-400 text-white"
            >
              <CirclePlus className="h-4 w-4" />
              <span className="font-mono font-semibold">Create Group</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="w-9 h-9 border-2 border-green-400">
                <AvatarImage
                  src={user?.avatar_url || "https://http.cat/404"}
                  alt="User Avatar"
                  className="object-cover"
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
