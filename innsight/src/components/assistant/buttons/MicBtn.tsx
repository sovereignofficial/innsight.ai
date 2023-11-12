import 'regenerator-runtime/runtime';
import { BsFillMicFill, BsStopCircle } from 'react-icons/bs';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useReduxDispatch, useReduxSelector } from '~/hooks/reduxHooks';
import { microphoneOff, microphoneOn, updateMessageValue } from '~/redux/slices/messagingSlice';
import { memo } from 'react';

export const MicBtn: React.FC = memo(() => {
  const dispatch = useReduxDispatch();
  const { isMicOpen } = useReduxSelector(st => st.messagingReducer);
  const { browserSupportsSpeechRecognition, transcript, resetTranscript } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <></>
  }
  const handleStartRecording = () => {
    resetTranscript();
    dispatch(microphoneOn());
    SpeechRecognition.startListening();

  }

  const handleStopRecording = async () => {
    dispatch(microphoneOff());
    SpeechRecognition.stopListening();
    dispatch(updateMessageValue(transcript))
  };


  return (
    <>
      {isMicOpen
        ? <button onClick={handleStopRecording} className='btn'><BsStopCircle size={20} /> </button>
        : <button onClick={handleStartRecording} className='btn'><BsFillMicFill size={20} /> </button>
      }
    </>
  )
}
)