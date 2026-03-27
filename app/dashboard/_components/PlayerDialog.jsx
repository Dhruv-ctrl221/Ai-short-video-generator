"use client"
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import RemotionVideo from './RemotionVideo'
import { Player } from '@remotion/player';
import { Button } from '@/components/ui/button';
import { db } from '@/configs/db';
import { VideoData } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import CustomLoading from '../create-new/_components/CustomLoading';

function PlayerDialog({ playVideo, videoId }) {
  const [openDialog, setOpenDialog] = useState(true);
  const [videoData, setVideoData] = useState();
  const [durationInFrame, setDurationInFrame] = useState(100);
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const router = useRouter();

  // 🎥 EXPORT FUNCTION (STABLE VERSION)
  const startRecording = async () => {
    const videoEl = document.querySelector("video");

    if (!videoEl) {
      alert("Video not loaded yet. Wait a second and try again.");
      return;
    }

    try {
      await videoEl.play(); // ensure playback starts
    } catch (err) {
      alert("Click play once, then export.");
      return;
    }

    const stream = videoEl.captureStream();
    if (!stream) {
      alert("Failed to capture video stream.");
      return;
    }

    const recorder = new MediaRecorder(stream, {
      mimeType: "video/webm",
    });

    const chunks = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "video.webm";
      a.click();

      setIsRecording(false);
    };

    recorder.start();
    setIsRecording(true);

    // ⏱️ Use frame-based duration (important)
    const durationMs = (durationInFrame / 30) * 1000;

    setTimeout(() => {
      recorder.stop();
    }, durationMs);
  };

  // 📦 Fetch video data
  useEffect(() => {
    setOpenDialog(!openDialog);
    videoId && getVideoData();
  }, [playVideo]);

  const getVideoData = async () => {
    const result = await db.select().from(VideoData)
      .where(eq(VideoData.id, videoId));

    setVideoData(result[0]);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent className="bg-white flex flex-col items-center">

        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle className="text-3xl font-bold my-5 text-center">
            Your Video is ready
          </DialogTitle>
          <DialogDescription className="text-center">
            Preview your generated video and export it.
          </DialogDescription>
        </DialogHeader>

        {/* 🎬 Remotion Player */}
        <Player 
          component={RemotionVideo}
          durationInFrames={Number(durationInFrame.toFixed(0))} 
          compositionWidth={300}
          compositionHeight={450} 
          fps={30} 
          inputProps={{
            ...videoData,
            setDurationInFrame: (frameValue) => setDurationInFrame(frameValue)
          }}
          controls
          acknowledgeRemotionLicense
        />

        {/* 🎛️ Buttons */}
        <div className="flex gap-10 mt-10">
          <Button 
            variant="ghost" 
            onClick={() => {
              router.replace('/dashboard');
              setOpenDialog(false);
            }}
          >
            Cancel
          </Button>

          <Button 
            onClick={startRecording}
            disabled={isRecording}
          >
            {isRecording ? "Recording..." : "Export Video"}
          </Button>
        </div>

        {/* ⏳ Loading UI */}
        {(loading || isRecording) && (
          <CustomLoading 
            loading={true} 
            message={isRecording ? "Recording Video..." : "Preparing..."} 
          />
        )}

      </DialogContent>
    </Dialog>
  )
}

export default PlayerDialog;