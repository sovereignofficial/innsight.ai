import { Spinner } from "./Spinner"

export const LoadingPage:React.FC = () => {
  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 dark:bg-zinc-950/50 bg-zinc-200/50 backdrop-blur-sm rounded-xl flex justify-center items-center'>
        <Spinner/>
    </div>
  )
}
