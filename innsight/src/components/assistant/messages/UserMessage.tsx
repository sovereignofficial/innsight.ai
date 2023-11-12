import { format } from "date-fns"
import { Message } from "~/types/messaging.d"

export const UserMessage: React.FC<{ message: Message }> = ({ message }) => {
    return (
        <div className="w-full flex justify-end items-center">
            <div className="p-5 w-[300px] space-y-4 bg-primary-500 rounded-xl ">
                <div className="flex justify-end items-center gap-2">
                    <p className="font-medium">You</p>
                    <div className="w-7 h-7 rounded-full flex justify-center items-center overflow-hidden ">
                        <img className="w-full h-full object-cover" src={message.sendBy.avatar} />
                    </div>
                </div>
                <div className="text-start whitespace-pre-wrap w-full">
                    <p>{message.message}</p>
                </div>
                <div className="text-end">
                    <p className="text-gray-300 text-xs">{format(new Date(message.createdDate), 'eee dd MMMM yyyy HH:mm')}</p>
                </div>
            </div>
        </div>
    )
}
