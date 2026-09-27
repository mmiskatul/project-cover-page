"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";

type BackButtonProps = {
  className?: string;
};

function BackButton({ className = "" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`group inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-transparent text-slate-600 text-sm font-semibold transition-all duration-200 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white active:scale-95 ${className}`}
    >
      <FiArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      Back
    </button>
  );
}

export default BackButton;


