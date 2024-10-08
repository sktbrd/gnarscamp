import Image from "next/image";
import React from "react";

export default function Loading({ text }: { text?: string }) {
  return (
    <div className="flex w-full h-full flex-col justify-center items-center">
      {text && (
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-4xl lg:text-2xl font-semibold tracking-tight text-black">
            {text}
          </h1>
        </div>
      )}
      <Image alt="image" src="/sktloading.gif" width={500} height={500} className="object-cover scale-[0.2]" />
    </div>
  );
}