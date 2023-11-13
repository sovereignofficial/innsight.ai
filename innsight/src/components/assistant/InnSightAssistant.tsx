import { MicBtn } from "./buttons/MicBtn"
import { SendMessageBtn } from "./buttons/SendMessageBtn"
import { Chat } from "./chat/Chat"
import { ChatFeed } from "./chat/ChatFeed"
import { ChatInput } from "./chat/ChatInput"
import { ChatToolItem } from "./chat/ChatToolItem"
import { ChatTools } from "./chat/ChatTools"
import { useReduxSelector } from "~/hooks/reduxHooks"
import { OthersMessage } from "./messages/OthersMessage"
import { UserMessage } from "./messages/UserMessage"
import { LoadingPage } from "../LoadingPage"
import { useChats } from "~/hooks/useChats"
import { HistoryList } from "./chat/HistoryList"
import { useUser } from "~/hooks/useUser"
import { useAssistantMessages } from "~/hooks/useAssistantMessages"
import React, { useEffect } from "react"
import { HistoryListItem } from "./chat/HistoryListItem"
import { Logo } from "../Logo"

export const InnSightAssistant: React.FC = () => {
  const { messages, currentChat } = useReduxSelector(st => st.messagingReducer);
  const { isMessagesLoading, isChatsLoading, chatHistory } = useChats();
  const { user } = useUser();
  const { detectIfUserSendMessage } = useAssistantMessages();
  const currentChatIndex = chatHistory?.findIndex(item => item.id == currentChat?.id)!
  const chatHistoryItem = currentChatIndex < 2 ? chatHistory![currentChatIndex + 1] : chatHistory && chatHistory[0];

  useEffect(() => {
    if (messages.length > 0) {
      detectIfUserSendMessage(messages)
    }
  }, [messages?.length, messages])

  const userData = {
    id: user?.id!,
    email: user?.email!,
    fullName: user?.user_metadata.fullName,
    avatar: user?.user_metadata.avatar
  }
  const chatTools = [
    (<ChatInput />),
    (<SendMessageBtn userData={userData} messages={messages!} />),
    (<MicBtn />)
  ]

  return (
    <Chat >
      <div className="h-full w-full bg-gradient-to-tr  dark:from-black to-primary-600 dark:to-primary-900 rounded-xl max-w-screen ">
        <ChatFeed>
          {
            isMessagesLoading
              ? <LoadingPage />
              : (
                messages!?.length > 0 ? (
                  <div className="space-y-3">
                    <h2>Chat #{currentChat?.id}</h2>
                    <div>You may want to resume the conversation with {chatHistoryItem ? <HistoryListItem chat={chatHistoryItem} /> : 'No more chat found.'}  </div>
                    {
                      messages!?.map((message, index) => (
                        <>
                          {message?.sendBy?.email !== user?.email ? <OthersMessage key={index+5} message={message} /> : <UserMessage key={index+20} message={message} />}
                        </>
                      ))
                    }
                  </div>
                )
                  : (
                    <div className="dark:text-white text-black space-y-3 flex flex-col justify-center items-center">
                      <Logo size={40} />
                      <h2>Welcome to InnSight AI assistant!</h2>
                      {
                        chatHistory && chatHistory.length > 0
                          ? (<div>You can either continue the conversation with <HistoryList chatHistory={chatHistory!.slice(0, 2)} isChatsLoading={isChatsLoading} /> or start a new conversation by sending a new message.</div>)
                          : (<p>You can initiate a new conversation by sending the first message!</p>)
                      }
                    </div>
                  )

              )
          }
        </ChatFeed>
        <ChatTools>
          {chatTools.map((tool, index) => (
            <ChatToolItem key={index} className={`${index === 0 ? 'sm:col-span-9 md:col-span-10' : 'sm:col-span-3 md:col-span-1'}`} >{tool}</ChatToolItem>
          ))}
        </ChatTools>
      </div>
    </Chat>
  )
}
