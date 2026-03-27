"use client";
import React from "react";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";

function CustomLoading({ loading, message }) {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent className="bg-white border-none shadow-2xl rounded-2xl">
        <div className="flex flex-col items-center justify-center my-10 gap-6">

          <Image
            src="/load-time.gif"
            width={120}
            height={120}
            alt="Loading animation"
            className="rounded-full"
          />

          <h2 className="text-lg font-semibold text-center animate-pulse">
            {message || "Processing... Please wait"}
          </h2>

          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="h-2 bg-primary animate-progress"></div>
          </div>

        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomLoading;