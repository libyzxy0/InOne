import { Header } from "@/components/Header";
import { MessagesLayout } from "@/layouts/MessagesLayout";
import {
  Message,
  MessageSelf,
  MessageAttachment,
  MessageSelfAttachment,
} from "@/components/MessageBubble";

export default function Chat() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <MessagesLayout>
        <MessageSelf time="2:30 PM">Hi</MessageSelf>

        <Message
          name="Jan Liby Dela Costa"
          avatarUrl="https://i.imgur.com/Xkqj1Da.jpeg"
          time="2:31 PM"
        >
          Hello
        </Message>

        <MessageSelf time="2:32 PM">
          I'm good, thanks! How about you?
        </MessageSelf>

        <Message
          name="Jan Liby Dela Costa"
          avatarUrl="https://i.imgur.com/Xkqj1Da.jpeg"
          time="2:33 PM"
        >
          Doing great! Just finished a project.
        </Message>

        <MessageSelf time="2:34 PM">
          That's awesome! What project were you working on?
        </MessageSelf>

        <Message
          name="Jan Liby Dela Costa"
          avatarUrl="https://i.imgur.com/Xkqj1Da.jpeg"
          time="2:35 PM"
        >
          I was working on a new chat application. It's almost ready to launch.
        </Message>

        <MessageSelf time="2:36 PM">
          That sounds cool! Can't wait to try it out.
        </MessageSelf>

        <Message
          name="Jan Liby Dela Costa"
          avatarUrl="https://i.imgur.com/Xkqj1Da.jpeg"
          time="2:37 PM"
        >
          I'll send you the link once it's live. By the way, check out this
          funny meme!
        </Message>

        <MessageAttachment
          time="2:38 PM"
          name="Jan Liby Dela Costa"
          avatarUrl="https://i.imgur.com/Xkqj1Da.jpeg"
          fileUrl="https://images.unsplash.com/photo-1561632120-79f92edbdc8d?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8MTYlM0E5fGVufDB8fDB8fHww"
        />

        <MessageSelfAttachment
          time="2:40 PM"
          fileUrl="https://i.imgur.com/Xkqj1Da.jpeg"
        />

        <MessageSelf time="2:59 PM">Kuapl kupal kupal kupal</MessageSelf>

        <Message
          name="Jan Liby Dela Costa"
          avatarUrl="https://i.imgur.com/Xkqj1Da.jpeg"
          time="3:00 PM"
        >
          Hahaha, that last one got me! 😂
        </Message>
      </MessagesLayout>
    </div>
  );
}
