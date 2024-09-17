import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

/* Tenks to this f*cking library https://usehooks.com/uselongpress 🙏 */
import { useLongPress } from "@uidotdev/usehooks";

import {
  Copy,
  Pencil,
  MessageSquareOff,
  MessageSquareReply,
} from "lucide-react";
import { useMergeReactions } from "@/hooks/useMergeReactions";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useReaction } from "@/hooks/useSocket";
import Cookies from "js-cookie";
import {
  Drawer,
  DrawerFooter,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import React from "react";

type ReactionType = {
  reaction: string;
  userID: string;
  fullName: string;
};

type MessageSelfProps = {
  children: React.ReactNode;
  time: string;
  reactions: ReactionType[];
  messageID: string;
  threadID: string;
};

type MessageProps = {
  children: React.ReactNode;
  time: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  reactions: ReactionType[];
  messageID: string;
  threadID: string;
};

type MessageAttachmentProps = {
  fileUrl: string;
  time: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  reactions: ReactionType[];
  messageID: string;
  threadID: string;
};

type MessageSelfAttachmentProps = {
  fileUrl: string;
  time: string;
  reactions: ReactionType[];
  messageID: string;
  threadID: string;
};

type MergeReactionsReturnType = {
  length: number;
  topReaction: string;
  uniqueReactions: ReactionType[];
  reactions: ReactionType[];
} | null;

export function MessageSelf({
  messageID,
  threadID,
  children,
  time,
  reactions,
}: MessageSelfProps) {
  const reactsData: MergeReactionsReturnType | null =
    useMergeReactions(reactions);
  return (
    <div className="w-full flex justify-end">
      <div className="flex justify-end items-start gap-3 select-none max-w-[90%]">
        <div className="flex flex-col items-end max-w-full">
          <div className="text-xs text-gray-600 mb-1 flex flex-row space-x-2">
            <p className="font-mono font-semibold">You</p>
            <span>•</span>
            <span className="font-mono">{time}</span>
          </div>
          <MessageBubbleEventWrapper
            isSelf={true}
            messageID={messageID}
            threadID={threadID}
            className="w-fit"
          >
            <div className="relative bg-green-500 text-gray-100 rounded-2xl p-3 rounded-br-none inline-block max-w-max">
              <p className="text-sm">
                {children &&
                  typeof children == "string" &&
                  children.split("\n").map((line: string, index: number) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
              </p>
              {!!reactions && reactions.length > 0 && (
                <div className="absolute -bottom-3 left-0 bg-gray-200 rounded-full px-2 space-x-1 text-sm py-1 flex flex-row justify-center items-center text-xs">
                  {reactions &&
                    reactsData &&
                    reactsData.uniqueReactions.map((reacts, index) => (
                      <span key={index}>{reacts.reaction}</span>
                    ))}
                  <span className="text-gray-800">
                    {reactsData && reactsData.length}
                  </span>
                </div>
              )}
            </div>
          </MessageBubbleEventWrapper>
        </div>
      </div>
    </div>
  );
}

export function Message({
  messageID,
  threadID,
  children,
  time,
  firstName,
  lastName,
  avatarUrl,
  reactions,
}: MessageProps) {
  const reactsData: MergeReactionsReturnType | null =
    useMergeReactions(reactions);
  return (
    <div className="w-full flex justify-start">
      <div className="flex items-start gap-3 select-none max-w-[90%]">
        <Avatar className="w-8 h-8 border">
          <AvatarImage
            src={avatarUrl ? avatarUrl : "https://http.cat/404"}
            alt={firstName || "Avatar"}
            className="object-cover"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col max-w-full">
          <div className="text-xs text-gray-600 mb-1 flex flex-row space-x-2">
            <p className="font-mono font-semibold">
              {firstName + " " + lastName}
            </p>
            <span>•</span>
            <span className="font-mono">{time}</span>
          </div>
          <MessageBubbleEventWrapper
            messageID={messageID}
            threadID={threadID}
            isSelf={false}
            className="w-fit"
          >
            <div className="relative bg-gray-200 text-gray-800 rounded-2xl p-3 rounded-tl-none inline-block max-w-max">
              <p className="break-words text-sm">
                {children &&
                  typeof children == "string" &&
                  children.split("\n").map((line: string, index: number) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
              </p>
              {!!reactions && reactions.length > 0 && (
                <div className="absolute -bottom-3 right-0 bg-green-400 rounded-full px-2 space-x-1 text-sm py-1 flex flex-row justify-center items-center text-xs">
                  {reactions &&
                    reactsData &&
                    reactsData.uniqueReactions.map((reacts, index) => (
                      <span key={index}>{reacts.reaction}</span>
                    ))}
                  <span className="text-gray-800">
                    {reactsData && reactsData.length}
                  </span>
                </div>
              )}
            </div>
          </MessageBubbleEventWrapper>
        </div>
      </div>
    </div>
  );
}

export function MessageAttachment({
  fileUrl,
  time,
  firstName,
  lastName,
  avatarUrl,
  reactions,
  messageID,
  threadID,
}: MessageAttachmentProps) {
  const reactsData: MergeReactionsReturnType | null =
    useMergeReactions(reactions);
  return (
    <div className="flex items-start gap-3 select-none">
      <Avatar className="w-8 h-8 border">
        <AvatarImage
          src={avatarUrl ? avatarUrl : "https://http.cat/404"}
          alt={firstName || "Avatar"}
          className="object-cover"
        />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="flex flex-col max-w-full">
        <div className="text-xs text-gray-600 mb-1">
          <p className="font-mono font-semibold">
            {firstName + " " + lastName}
          </p>
          <span>•</span>
          <span className="font-mono">{time}</span>
        </div>
        <MessageBubbleEventWrapper
          messageID={messageID}
          threadID={threadID}
          isSelf={false}
        >
          <div className="relative text-gray-800 rounded-2xl rounded-tl-none inline-block max-w-max">
            <img
              onContextMenu={(e) => e.preventDefault()}
              src={fileUrl}
              alt="attachment"
              className="max-w-[250px] max-h-[250px] object-cover rounded-lg"
            />
            {reactions && reactions.length > 0 && (
              <div className="absolute -bottom-3 right-0 bg-green-400 rounded-full px-2 space-x-1 text-sm py-1 flex flex-row justify-center items-center text-xs">
                {reactions &&
                  reactsData &&
                  reactsData.uniqueReactions.map((reacts, index) => (
                    <span key={index}>{reacts.reaction}</span>
                  ))}
                <span className="text-gray-800">
                  {reactsData && reactsData.length}
                </span>
              </div>
            )}
          </div>
        </MessageBubbleEventWrapper>
      </div>
    </div>
  );
}

export function MessageSelfAttachment({
  fileUrl,
  time,
  reactions,
  messageID,
  threadID,
}: MessageSelfAttachmentProps) {
  const reactsData: MergeReactionsReturnType | null =
    useMergeReactions(reactions);
  return (
    <div className="flex items-start gap-3 justify-end select-none w-full">
      <div className="flex flex-col items-end max-w-[70%]">
        <div className="text-xs text-gray-600 mb-1 text-right font-mono">
          {time}
        </div>
        <MessageBubbleEventWrapper
          messageID={messageID}
          threadID={threadID}
          isSelf={true}
        >
          <div className="relative text-gray-100 rounded-2xl rounded-br-none inline-block max-w-max">
            <img
              onContextMenu={(e) => e.preventDefault()}
              src={fileUrl}
              alt="attachment"
              className="max-w-[250px] max-h-[250px] object-cover rounded-lg"
            />
            {reactions && reactions.length > 0 && (
              <div className="absolute -bottom-3 left-0 bg-gray-200 rounded-full px-2 space-x-1 text-sm py-1 flex flex-row justify-center items-center text-xs">
                {reactions &&
                  reactsData &&
                  reactsData.uniqueReactions.map((reacts, index) => (
                    <span key={index}>{reacts.reaction}</span>
                  ))}
                <span className="text-gray-800">
                  {reactsData && reactsData.length}
                </span>
              </div>
            )}
          </div>
        </MessageBubbleEventWrapper>
      </div>
    </div>
  );
}

const MessageBubbleEventWrapper = ({
  children,
  className,
  messageID,
  threadID,
  isSelf,
}: {
  children: React.ReactNode;
  className?: string;
  messageID: string;
  threadID: string;
  isSelf: boolean;
}) => {
  const token = Cookies.get("authtoken");
  const [popup, setPopup] = useState(false);
  const { makeReact } = useReaction(threadID);

  const bindLongPress = useLongPress(
    () => {
      setPopup(true);
    },
    { threshold: 400 },
  );

  const makeReaction = async (reaction: string) => {
    if (token) {
      setPopup(false);
      makeReact(reaction, messageID, token);
    }
  };

  useEffect(() => {
    if (!popup) {
      setPopup(false);
    }
  }, [popup]);

  return (
    <>
      <div {...bindLongPress} className={cn("w-fit", className)}>
        {children}
      </div>

      <Drawer open={popup} onOpenChange={setPopup}>
        <DrawerContent>
          <DrawerHeader className="grid grid-cols-7">
            <DrawerTitle className="hidden"></DrawerTitle>
            <DrawerDescription className="hidden"></DrawerDescription>
            <Button
              variant="ghost"
              className="text-2xl"
              onClick={() => makeReaction("💙")}
            >
              💙
            </Button>
            <Button
              variant="ghost"
              className="text-2xl"
              onClick={() => makeReaction("😂")}
            >
              😂
            </Button>
            <Button
              variant="ghost"
              className="text-2xl"
              onClick={() => makeReaction("😢")}
            >
              😢
            </Button>
            <Button
              variant="ghost"
              className="text-2xl"
              onClick={() => makeReaction("😮")}
            >
              😮
            </Button>
            <Button
              variant="ghost"
              className="text-2xl"
              onClick={() => makeReaction("😡")}
            >
              😡
            </Button>
            <Button
              variant="ghost"
              className="text-2xl"
              onClick={() => makeReaction("👍")}
            >
              👍
            </Button>
            <Button
              variant="ghost"
              className="text-2xl"
              onClick={() => makeReaction("👎")}
            >
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
                className="space-x-2 flex justify-center items-center"
              >
                <Copy className="w-5 h-5" />
                <span>Copy</span>
              </Button>
              <Button
                variant="ghost"
                className="space-x-2 flex justify-center items-center"
              >
                {isSelf ? (
                  <>
                    <Pencil className="w-5 h-5" />
                    <span>Edit</span>
                  </>
                ) : (
                  <>
                    <MessageSquareReply className="w-5 h-5" />
                    <span>Reply</span>
                  </>
                )}
              </Button>
              <Button
                variant="ghost"
                className="space-x-2 flex justify-center items-center"
              >
                <MessageSquareOff className="w-5 h-5" />
                {isSelf ? <span>Unsend</span> : <span>Remove</span>}
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
