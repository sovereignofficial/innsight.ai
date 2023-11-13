import { LoadingPage } from "~/components/LoadingPage";
import { Chat } from "~/types/messaging.d";
import { HistoryListItem } from "./HistoryListItem";


export const HistoryList: React.FC<{ isChatsLoading: boolean, chatHistory: Chat[] }> = ({ isChatsLoading, chatHistory }) => {
  

  return (
    <ul className=" w-full h-full flex flex-col items-center ">
      {isChatsLoading
        ? (<LoadingPage />)
        : (chatHistory.map((chat, index) => (
          <HistoryListItem key={index} chat={chat}/>
        )))}
    </ul>
  )
}

