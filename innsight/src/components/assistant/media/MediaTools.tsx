import { MediaToolItem } from "./MediaToolItem"
import { ShareChatBtn } from "../buttons/ShareChatBtn"
import { ToggleAIVoice } from "../buttons/ToggleAIVoice"

export const MediaTools: React.FC = () => {
    const tools = [ 
        (<ToggleAIVoice />),
        (<ShareChatBtn />)]
    return (
        <ul className="flex gap-4 items-center">
            {tools.map((tool,index) => (
                <MediaToolItem key={index}>{tool}</MediaToolItem>
            ))}
        </ul>
    )
}
