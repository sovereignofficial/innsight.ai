import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

const pollyClient = new PollyClient({
    region: import.meta.env.VITE_AMAZON_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_AMAZON_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AMAZON_SECRET_ACCESS_KEY,
    },
})

async function streamToBuffer(stream:any) {
    const reader = stream.getReader();
    const chunks = [];
  
    while (true) {
      const { done, value } = await reader.read();
  
      if (done) {
        break;
      }
  
      chunks.push(value);
    }
  
    const concatenated = new Uint8Array(
      chunks.reduce((totalLength, chunk) => totalLength + chunk.length, 0)
    );
  
    let offset = 0;
    for (const chunk of chunks) {
      concatenated.set(chunk, offset);
      offset += chunk.length;
    }
  
    const arrayBuffer = concatenated.buffer;
    return arrayBuffer;
  }
  

async function playAudioFromStream(stream: ReadableStream | any): Promise<void> {
    // Convert the audioData to an ArrayBuffer
    const arrayBuffer = await streamToBuffer(stream);

    // Create a new AudioContext
    const audioContext = new window.AudioContext();

    // Decode the arrayBuffer into an AudioBuffer
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // Create a new AudioBufferSourceNode
    const sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;

    // Connect the sourceNode to the destination (e.g., speakers)
    sourceNode.connect(audioContext.destination);

    // Start playing the audio
    sourceNode.start();
}



export async function playPollySpeech(text:string) {

    const command = new SynthesizeSpeechCommand({
        OutputFormat: "mp3",
        Text: text,
        VoiceId: "Joanna",
    });

    try {
        const response = await pollyClient.send(command);
        const audioData = response.AudioStream;

        await playAudioFromStream(audioData);

    } catch (error) {
        console.error("Error:", error);
    }
}


