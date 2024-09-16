import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Image, Paperclip, Send, ChevronRight, LoaderCircle } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useSocket } from "@/hooks/useSocket";
import FileUpload from '@/components/FileUpload'

export function MessageBox({ threadID }: { threadID: string }) {
  const token = Cookies.get("authtoken") ? Cookies.get("authtoken") : null;
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);
  const [hideActions, setHideActions] = useState(false);

  const { sendMessage } = useSocket(threadID);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSend = async () => {
    if (token) {
   
      await sendMessage(
        {
          text: message !== "" ? message : null,
          attachment_url: attachmentUrl,
        },
        token,
      );

      /* Reset the message box */
      setMessage("");
      setAttachmentUrl(null)
      const textarea = textareaRef.current;
      textarea!.style.height = "auto";
    }
  };
  
  const handleUploadResponse = (data: { error: string | null; file_url: string | null; }) => {
    setLoading(false)
    if(!data.error) {
      setAttachmentUrl(data.file_url)
    }
  };
  
  useEffect(() => {
    if (message !== "") {
      setHideActions(true);
    } else {
      setHideActions(false);
    }
  }, [message]);

  useEffect(() => {
    const textarea = textareaRef.current;
    
    const adjustHeight = () => {
      if (textarea !== null) {
        textarea!.style.height = "auto";
        textarea!.style.height = `${textarea.scrollHeight}px`;
      }
    };

    if (textarea !== null) {
      textarea!.addEventListener("input", adjustHeight);
    }

    return () => {
      if (textarea != null) {
        textarea!.removeEventListener("input", adjustHeight);
      }
    };
  }, []);

  return (
    <div className="bg-white border-t px-4 py-3 flex items-center gap-3 md:px-6 lg:px-8 fixed bottom-0 w-full md:w-[60%]">
      {hideActions ? (
        <div className="flex text-gray-800">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setHideActions(false)}
          >
            <ChevronRight className="w-6 h-6" />
            <span className="sr-only">See Actions</span>
          </Button>
        </div>
      ) : (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon">
            <Paperclip className="w-5 h-5 text-gray-800" />
            <span className="sr-only">Attach file</span>
          </Button>
          <FileUpload onUploadResponse={handleUploadResponse} onUploadStart={() => setLoading(true)}>
          <Button variant="ghost" size="icon">
            {loading ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Image className={`w-5 h-5 text-gray-800 ${attachmentUrl ? 'text-green-400' : 'text-gray-800'}`} />}
            <span className="sr-only">Upload image</span>
          </Button>
          </FileUpload>
        </div>
      )}

      <Textarea
        ref={textareaRef}
        placeholder="Type what you think..."
        className="flex-1 rounded-lg bg-gray-100 text-gray-800 border-none focus:ring-0 focus:outline-none resize-none min-h-[40px] max-h-[90px] overflow-auto focus-visible:ring-green-400 pt-2.5"
        rows={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div>
        <Button
          onClick={handleSend}
          className="disabled:opacity-50 hover:text-green-400 text-gray-800"
          variant="ghost"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
