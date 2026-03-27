"use client";
import React from "react";
import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 px-4">
      
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700"
      >
        

        {/* Clerk SignUp Component */}
        <SignUp signInUrl="/sign-in" />

        <p className="text-center text-gray-400 mt-6 text-sm">
          Start creating AI-powered videos in seconds
        </p>
      </motion.div>
    </div>
  );
}
