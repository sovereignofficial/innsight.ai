import { FaLink } from 'react-icons/fa'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { initiateToast } from "~/utils/helpers";
import { toastStates } from "~/types/toast.d";

export const ShareChatBtn: React.FC= () => {

    return (
        <CopyToClipboard text={window.location.href}>
            <button className='bg-gray-400/20 hover:bg-gray-400 p-2 rounded-full' onClick={() => initiateToast({ state: toastStates.SUCCESS, message: 'Link copied to clipboard.' })}><FaLink size={20}/></button>
        </CopyToClipboard>
    )
}
