import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Copy, Pencil, MessageSquareOff } from "lucide-react";
import { useMergeReactions } from '@/hooks/useMergeReactions'
import { useState, useEffect } from "react";
import { cn } from '@/lib/utils'
import useLongPress from "@/hooks/useLongPress";
const reactions = [
  { reaction: "💙", userID: "123456789", fullName: "Jan Liby Dela Costa" },
  { reaction: "💙", userID: "123456782", fullName: "Jhennie Rose Salvador" },
  { reaction: "😢", userID: "123456784", fullName: "Rey Jhon Capito" },
  { reaction: "😡", userID: "123456788", fullName: "Yanna Torres" },
  { reaction: "💙", userID: "123456779", fullName: "Alexander Polo" },
  { reaction: "🤣", userID: "123456389", fullName: "Rens Belga Acuña" },
]

import {
  Drawer,
  DrawerFooter,
  DrawerContent,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React from "react";

type ReactionType = {
  reaction: string;
  userID: string;
  fullName: string;
}

type MessageSelfProps = {
  children: React.ReactNode;
  time: string;
};

type MessageProps = {
  children: React.ReactNode;
  time: string;
  name: string;
  avatarUrl: string;
};

type MessageAttachmentProps = {
  fileUrl: string;
  time: string;
  name: string;
  avatarUrl: string;
};

type MessageSelfAttachmentProps = {
  fileUrl: string;
  time: string;
};

export function MessageSelf({ children, time }: MessageSelfProps) {
  return (
    <div className="w-full flex justify-end">
    <div className="flex justify-end items-start gap-3 select-none max-w-[90%]">
      <div className="flex flex-col items-end max-w-full">
        <div className="text-xs text-gray-600 mb-1 font-mono text-right">
          {time}
        </div>
        <MessageBubbleEventWrapper className="w-fit">
          <div className="relative bg-green-500 text-gray-100 rounded-2xl p-3 rounded-br-none inline-block max-w-max">
            <p className="break-words text-sm">{children}</p>
            <div className="absolute -bottom-3 left-0 bg-gray-200 rounded-full px-2 space-x-1 text-sm py-1 flex flex-row justify-center items-center text-xs">
              <span>💙</span>
              <span className="text-gray-800">3</span>
            </div>
          </div>
        </MessageBubbleEventWrapper>
      </div>
    </div>
    </div>
  );
}

export function Message({ children, time, name, avatarUrl }: MessageProps) {
  return (
    <div className="flex items-start gap-3 select-none">
      <Avatar className="w-8 h-8 border">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="flex flex-col max-w-full">
        <div className="text-xs text-gray-600 mb-1 flex flex-row space-x-2">
          <p className="font-mono font-semibold">{name}</p>
          <span>•</span>
          <span className="font-mono">{time}</span>
        </div>
        <MessageBubbleEventWrapper className="w-fit">
          <div className="relative bg-gray-200 text-gray-800 rounded-2xl p-3 rounded-tl-none inline-block max-w-max">
            <p className="break-words text-sm">{children}</p>
            <div className="absolute -bottom-3 right-0 bg-green-400 rounded-full px-2 space-x-1 text-sm py-1 flex flex-row justify-center items-center text-xs">
              <span>😂</span> <span>💙</span>
              <span className="text-gray-800">3</span>
            </div>
          </div>
        </MessageBubbleEventWrapper>
      </div>
    </div>
  );
}

export function MessageAttachment({
  fileUrl,
  time,
  name,
  avatarUrl,
}: MessageAttachmentProps) {
  return (
      <div className="flex items-start gap-3 select-none">
        <Avatar className="w-8 h-8 border">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col max-w-full">
          <div className="text-xs text-gray-600 mb-1">
            <p className="font-mono font-semibold">{name}</p>
            <span>•</span>
            <span className="font-mono">{time}</span>
          </div>
          <MessageBubbleEventWrapper>
          <div className="relative text-gray-800 rounded-2xl rounded-tl-none inline-block max-w-max">
            <img
              onContextMenu={(e)=> e.preventDefault()}
              src={fileUrl}
              alt="attachment"
              className="max-w-[250px] max-h-[250px] object-cover rounded-lg"
            />
            <div className="absolute -bottom-3 right-0 bg-green-400 rounded-full px-2 space-x-1 text-sm py-1 flex flex-row justify-center items-center text-xs">
              <span>😂</span> <span>💙</span>
              <span className="text-gray-800">3</span>
            </div>
          </div>
          </MessageBubbleEventWrapper>
        </div>
      </div>
  );
}

export function MessageSelfAttachment({
  fileUrl,
  time,
}: MessageSelfAttachmentProps) {
  return (
      <div className="flex items-start gap-3 justify-end select-none w-full">
        <div className="flex flex-col items-end max-w-[70%]">
          <div className="text-xs text-gray-600 mb-1 text-right font-mono">
            {time}
          </div>
          <MessageBubbleEventWrapper>
          <div className="relative text-gray-100 rounded-2xl rounded-br-none inline-block max-w-max">
            <img
              onContextMenu={(e)=> e.preventDefault()}
              src={fileUrl}
              alt="attachment"
              className="max-w-[250px] max-h-[250px] object-cover rounded-lg"
            />
            <div className="absolute -bottom-3 left-0 bg-gray-200 rounded-full px-2 space-x-1 text-sm py-1 flex flex-row justify-center items-center text-xs">
              <span>💙</span>
              <span className="text-gray-800">3</span>
            </div>
          </div>
          </MessageBubbleEventWrapper>
        </div>
      </div>
  );
}

const MessageBubbleEventWrapper = ({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [popup, setPopup] = useState(false);
  
  const onLongPress = () => {
    setPopup(true);
  };

  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const dummyFunc = () => {};

  const longPressEvent = useLongPress(onLongPress, dummyFunc, defaultOptions);

  useEffect(() => {
    const data = useMergeReactions(reactions);
console.log(data);
    if (!popup) {
      setPopup(false);
    }
  }, [popup]);

  return (
    <>
      <div {...longPressEvent} className={cn("w-fit", className)}>
        {children}
      </div>

      <Drawer open={popup} onOpenChange={setPopup}>
        <DrawerContent>
          <DrawerHeader className="grid grid-cols-6">
            <Button variant="ghost" className="text-2xl">
              💙
            </Button>
            <Button variant="ghost" className="text-2xl">
              😂
            </Button>
            <Button variant="ghost" className="text-2xl">
              😢
            </Button>
            <Button variant="ghost" className="text-2xl">
              😡
            </Button>
            <Button variant="ghost" className="text-2xl">
              👍
            </Button>
            <Button variant="ghost" className="text-2xl">
              👎
            </Button>
          </DrawerHeader>

          <div className="mx-7">
            <Separator />
          </div>

          <div className="flex justify-start">
            <DrawerFooter className="grid grid-cols-3">
              <Button
                variant="ghost"
                className="space-x-3 flex justify-center items-center"
              >
                <Copy className="w-5 h-5" />
                <span>Copy</span>
              </Button>
              <Button
                variant="ghost"
                className="space-x-3 flex justify-center items-center"
              >
                <Pencil className="w-5 h-5" />
                <span>Edit</span>
              </Button>
              <Button
                variant="ghost"
                className="space-x-3 flex justify-center items-center"
              >
                <MessageSquareOff className="w-5 h-5" />
                <span>Unsend</span>
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
