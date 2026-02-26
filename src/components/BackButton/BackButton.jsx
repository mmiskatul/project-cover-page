"use client";

import React from "react";
import { useRouter } from "next/navigation";

function BackButton() {
  const router = useRouter();

  return (
    <div className="mb-8 items-start">
      <button
        onClick={() => router.back()}
        className="bg-indigo-600 text-xl font-bold text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition duration-300 active:scale-95"
      >
        Back
      </button>
    </div>
  );
}

export default BackButton;
