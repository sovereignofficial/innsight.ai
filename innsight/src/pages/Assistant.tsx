import { InnSightAssistant } from "~/components/assistant/InnSightAssistant"
import { MediaTools } from "~/components/assistant/media/MediaTools"

const Assistant:React.FC = () => {
  return (
    <div className="page">
        <div className="page-header">
            <h1>Assistant</h1>
            <MediaTools/>

        </div>
        <div className="dark:bg-secondary dark:shadow-none shadow-lg w-full mx-auto rounded-xl ">
            <InnSightAssistant/>
        </div>
    </div>
  )
}

export default Assistant;