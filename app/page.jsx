"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";

export default function HomePage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  const handleGetStarted = () => {
    if (!isLoaded) return;

    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-up");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      
      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-5">
        <h1 className="text-2xl font-bold">AI Shorts</h1>
        
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Create AI-Powered Short Videos in Seconds 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-6 text-lg text-gray-300 max-w-2xl"
        >
          Generate stunning short videos using AI. Just enter your idea, and let the magic happen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10"
        >
          <Button
            className="px-8 py-4 text-lg"
            onClick={handleGetStarted}
          >
            Get Started
          </Button>
        </motion.div>
      </div>

      {/* Features Section (same as before) */}
      {/* Previous Scripts Section */}
<div className="mt-24 px-8 max-w-3xl mx-auto">
  <h2 className="text-3xl font-bold text-center mb-10">
    Sample AI Scripts ✍️
  </h2>

  <div className="space-y-6">
    {[
      "Success doesn't come overnight. It's built through small daily efforts.",
      "Imagine a world where AI creates your videos in seconds — that's the future.",
      "Discipline beats motivation. Show up every day, no matter what.",
      "Start before you're ready. Progress comes from action, not perfection.",
    ].map((line, index) => (
      <div
        key={index}
        className="bg-gray-900 p-5 rounded-xl border border-gray-700 hover:scale-[1.02] transition-all cursor-pointer"
        onClick={handleGetStarted}
      >
        <p className="text-gray-300 text-base leading-relaxed">
          {line}
        </p>
      </div>
    ))}
  </div>
</div>
    </div>
  );
}