import { NextResponse } from "next/server";
import cloudinary from "@/configs/cloudinary";

export async function POST(req) {
  try {
    const { text, id } = await req.json();

    const url =
      `https://api.voicerss.org/?key=${process.env.TTS_KEY}` +
      `&hl=en-us&v=Linda&r=0&c=MP3&f=44khz_16bit_stereo` +
      `&src=${encodeURIComponent(text)}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("VoiceRSS failed");
    }

    const audioBuffer = Buffer.from(await response.arrayBuffer());

    // 🚀 Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: "video",
          folder: "ai-shorts/audio",
          public_id: id,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(audioBuffer);
    });

    console.log("✅ Uploaded:", uploadResult.secure_url);

    return NextResponse.json({
      success: true,
      audioUrl: uploadResult.secure_url,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Audio generation failed" },
      { status: 500 }
    );
  }
}