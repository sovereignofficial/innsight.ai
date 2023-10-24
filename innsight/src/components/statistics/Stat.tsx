import { ReactNode } from "react"
import { LoadingPage } from "../LoadingPage"

export const Stat: React.FC<{
    title: string,
    data: string,
    icon: ReactNode,
    bgColor: string,
    isLoading:boolean
}> = ({
    title,
    data,
    icon,
    bgColor,
    isLoading
}) => {
        return (
            <div className="relative overflow-hidden col-span-1 grid grid-flow-col  h-[100px] rounded-xl  shadow-md dark:bg-secondary dark:shadow-none">
                {isLoading && <LoadingPage/>}
                <div className={` col-span-3 place-items-center grid `}>
                    <div className={` ${bgColor} w-16 h-16 rounded-full flex justify-center items-center`}>
                        {icon}

                    </div>
                </div>

                <div className="col-span-9 grid place-items-center p-2">
                    <div className="flex flex-col justify-center items-start space-y-2 w-full h-full">
                        <p className="uppercase text-xs font-bold tracking-wider">{title}</p>
                        <p className="text-xl font-bold">{data}</p>
                    </div>
                </div>
            </div>
        )
    }
