import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { images } = await req.json();

    const uploadedUrls = [];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "ai-short-videos",
      });

      uploadedUrls.push(result.secure_url);
    }

    return NextResponse.json({ urls: uploadedUrls });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}