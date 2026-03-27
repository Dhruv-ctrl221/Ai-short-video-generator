"use client";
import React, { useContext, useEffect, useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import SelectDuration from "./_components/SelectDuration";
import { Button } from "@/components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuidv4 } from "uuid";
import VideoDataContext from "@/app/_context/VideoDataContext";
import { VideoData } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs/db";
import PlayerDialog from "../_components/PlayerDialog";



function CreateNew() {
  const {user}=useUser();
  const [formData, setFormData] = useState({});
  const [loading, setloading] = useState(false);
  const [videoScript, setVideoScript] = useState();
  const [audioUrl, setaudioUrl] = useState();
  const [captions, setCaptions] = useState();
  const [imagelist, setimageList] = useState();
  const [loadingMessage, setLoadingMessage] = useState("");

  

  const[playVideo,setPlayVideo]=useState(false);
  const[videoId,setVideoId]=useState(2);

  const { videoData, setVideoData } = useContext(VideoDataContext);

  // Handle Input Change
  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };

  // ==============================
  // 1️⃣ MAIN FUNCTION (Controls Loading)
  // ==============================
  const GetVideoScript = async () => {
    try {
      setloading(true);
      setLoadingMessage("📝 Generating video script...");
      const prompt = `Write a script to generate strictly in this time range of ${formData.duration} video on topic: ${formData.topic}
      story along with AI image prompt in ${formData.image} format for each scene
      and give result in JSON format with imagePrompt and ContentText as field`;

      const resp = await axios.post("/api/get-video-script", {
        prompt: prompt,
      });

      setVideoData((prev) => ({
        ...prev,
        videoScript: resp.data,
      }));

      setVideoScript(resp.data);

      await GenerateAudioFile(resp.data);
    } catch (error) {
      console.error("Error in GetVideoScript:", error);
    } finally {
       setLoadingMessage("✅ Finalizing your video...");
       setTimeout(() => {
      setloading(false);
      setLoadingMessage("");
    }, 800);
    }
  };

  // ==============================
  // 2️⃣ Generate Audio
  // ==============================
  const GenerateAudioFile = async (videoScript) => {
    setLoadingMessage("🔊 Generating voice audio...");
    let script = "";
    const id = uuidv4();

    videoScript.forEach((element) => {
      script += element.contentText || element.ContentText || "";
    });

    const resp = await axios.post("/api/generate-audio", {
      text: script,
      id: id,
    });

    setVideoData((prev) => ({
      ...prev,
      audioFileUrl: resp.data.audioUrl,
    }));

    setaudioUrl(resp.data.audioUrl);

    if (resp.data.audioUrl) {
      await GenerateAudioCaption(resp.data.audioUrl);
    }
  };

  // ==============================
  // 3️⃣ Generate Captions
  // ==============================
  const GenerateAudioCaption = async (audioUrl) => {
    setLoadingMessage("🎬 Generating captions...");
    const resp = await axios.post("/api/generate-caption", {
      audioFileUrl: audioUrl,
    });

    setVideoData((prev) => ({
      ...prev,
      captions: resp.data.result,
    }));

    setCaptions(resp.data.result);

    await GenerateImage();
  };

  // ==============================
  // 4️⃣ Generate Images
  // ==============================
  const GenerateImage = async () => {
    setLoadingMessage("🖼 Creating AI images...");
    const imageUrls = [
      "https://picsum.photos/seed/1/600/400",
      "https://picsum.photos/seed/2/600/400",
      "https://picsum.photos/seed/3/600/400",
      "https://picsum.photos/seed/4/600/400",
      "https://picsum.photos/seed/5/600/400",
    ];

    const base64Images = [];

    for (let url of imageUrls) {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString("base64");

      const mimeType = response.headers.get("content-type");
      const base64Image = `data:${mimeType};base64,${base64}`;

      base64Images.push(base64Image);
    }

    const uploadResponse = await axios.post("/api/upload-images", {
      images: base64Images,
    });

    setVideoData((prev) => ({
      ...prev,
      imageList: uploadResponse.data.urls,
    }));

    setimageList(uploadResponse.data.urls);
  };

  // Debug
  useEffect(() => {
    console.log(videoData);
    if(Object.keys(videoData).length==4) SaveVideoData(videoData);
  }, [videoData]);

  const SaveVideoData=async(videoData)=>{
    setloading(true)
    const result=await db.insert(VideoData).values({
        script:videoData?.videoScript,
        audioFileUrl:videoData?.audioFileUrl,
        captions:videoData?.captions,
        imageList:videoData?.imageList,
        createdBy:user?.primaryEmailAddress?.emailAddress
    }).returning({id:VideoData?.id})
    setVideoId(result[0].id);
    setPlayVideo(true);
    console.log(result)
    setloading(false);
  }

  const onCreateClickHandler = () => {
    GetVideoScript();
  };

  return (
    <div className="md:px-20">
      <h2 className="font-bold text-4xl text-primary text-center">
        Create New
      </h2>

      <div className="mt-10 shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <SelectDuration onUserSelect={onHandleInputChange} />

        <Button
          onClick={onCreateClickHandler}
          className="mt-10 w-full"
        >
          Create Short Video
        </Button>
      </div>

      <CustomLoading loading={loading} message={loadingMessage} />
      <PlayerDialog playVideo={playVideo} videoId={videoId}/>
    </div>
  );
}

export default CreateNew;