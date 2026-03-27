import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";
 
 export async function POST(req){
    try{
        const {audioFileUrl}=await req.json();
        const client = new AssemblyAI({
            apiKey: process.env.CAPTIONS_KEY,
        });


        const audioFile = audioFileUrl

        const params = {
            audio: audioFile,
            "language_detection": true,
            // Uses universal-3-pro for en, es, de, fr, it, pt. Else uses universal-2 for support across all other languages
            "speech_models": ["universal-3-pro", "universal-2"]
        };

        const transcript = await client.transcripts.transcribe(params);
        // console.log(transcript.words)
        return NextResponse.json({'result':transcript.words})
    }
    catch(e){
        return NextResponse.json({'error':e})
    }
};
