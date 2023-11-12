import { NavigateFunction, useNavigate } from "react-router-dom";
import { Chat } from "~/types/messaging";
import { encryptChatURI } from "~/utils/helpers";

export const HistoryListItem:React.FC<{chat:Chat}> = ({chat}) => {
    const navigate = useNavigate();
  return (
    <button onClick={() => chat.id! && navigateToEncryptedChatUrl(chat.id,navigate)} className=" text-primary-500 hover:text-primary-400"
    >{chat.title}</button>
  )
}
export const encryptedChatIdCache = new Map();
export const navigateToEncryptedChatUrl = (destinationChatId:number,navigate:NavigateFunction) => {
  let encryptedChatId;
  if (encryptedChatIdCache.has(destinationChatId)) {
    encryptedChatId = encryptedChatIdCache.get(destinationChatId);
  } else {
    encryptedChatId = encryptChatURI(destinationChatId);
    encryptedChatIdCache.set(destinationChatId, encryptedChatId);
  }
  navigate(`/assistant?c=${encryptedChatId}`)
}
