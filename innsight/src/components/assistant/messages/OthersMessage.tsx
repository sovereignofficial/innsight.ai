import { format } from "date-fns"
import { Message } from "~/types/messaging.d"

export const OthersMessage: React.FC<{ message: Message }> = ({ message }) => {
    return (
        <div className="w-full flex justify-start items-center">
            <div className="p-5 w-[300px] space-y-4 bg-slate-100  dark:bg-slate-900 dark:text-white text-black rounded-xl ">
                <div className="flex justify-start items-center gap-2">
                    <div className="w-7 h-7 rounded-full flex justify-center items-center overflow-hidden ">
                        <img className="w-full h-full object-cover" src={message.sendBy.avatar} />
                    </div>
                    <p className="font-medium">{message.sendBy.fullName}</p>
                </div>
                <div className="text-start whitespace-pre-wrap w-full">
                    <p>{message.message}</p>
                </div>
                <div className="text-end">
                    <p className="dark:text-gray-300 text-gray-500 text-xs">{format(new Date(message.createdDate), 'eee dd MMMM yyyy HH:mm')}</p>
                </div>
            </div>
        </div>
    )
}
