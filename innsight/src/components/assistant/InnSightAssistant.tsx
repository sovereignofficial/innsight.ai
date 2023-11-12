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
      <div className="col-span-2 space-y-4 p-4 dark:bg-secondary rounded-tl-xl rounded-bl-xl">
        <h3 className="text-black dark:text-white">History</h3>
        <HistoryList chatHistory={chatHistory!} isChatsLoading={isChatsLoading} />
      </div>
      <div className="col-span-10 h-full w-full bg-gradient-to-tr  dark:from-black to-primary-600 dark:to-primary-900 rounded-tr-xl rounded-br-xl ">
        <ChatFeed>
          <h2>{currentChat?.title}</h2>
          <React.Fragment>
            {
              isMessagesLoading
                ? <LoadingPage />
                : (
                  messages!?.length > 0 ?
                    messages!?.map((message, index) => (
                      <>
                        {message?.sendBy?.email !== user?.email ? <OthersMessage key={index} message={message} /> : <UserMessage key={index} message={message} />}
                      </>
                    ))
                    : (
                      <div className="dark:text-white text-black space-y-3 flex flex-col justify-center items-center">
                        <Logo size={40}/>
                        <h2>Welcome to InnSight AI assistant!</h2>
                        {
                          chatHistory && chatHistory.length > 0 
                          ?(<div>You can either continue the conversation with <HistoryListItem chat={chatHistory[0]}/> or start a new conversation by sending a new message.</div>)
                          :(<p>You can initiate a new conversation by sending the first message!</p>)
                        }
                      </div>
                    )
                )
            }
          </React.Fragment>
        </ChatFeed>
        <ChatTools>
          {chatTools.map((tool, index) => (
            <ChatToolItem key={index} className={`${index === 0 ? 'col-span-10' : 'col-span-1'}`} >{tool}</ChatToolItem>
          ))}
        </ChatTools>
      </div>
    </Chat>
  )
}
