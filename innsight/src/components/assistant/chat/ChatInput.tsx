import { memo } from "react";
import { useReduxDispatch, useReduxSelector } from "~/hooks/reduxHooks"
import { updateMessageValue } from "~/redux/slices/messagingSlice";

export const ChatInput: React.FC = memo(() => {
  const dispatch = useReduxDispatch();
  const {messageValue} = useReduxSelector(st=>st.messagingReducer);

  return (
    <textarea maxLength={1000} value={messageValue} onChange={(e) => dispatch(updateMessageValue(e.target.value))} className="bg-gray-700 px-3 py-1 border-none outline-none w-full resize-none text-lg rounded-lg" placeholder="Send message" aria-label="Send message" />
  )
}
)