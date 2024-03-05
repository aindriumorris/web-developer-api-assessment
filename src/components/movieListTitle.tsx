import React from "react";

export const Title = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center justify-center p-[10px] gap-[10px]">
      <h1 className="font-oxanium font-normal text-6xl line-height-[48px] text-center mx-auto">
        {text}
      </h1>
    </div>
  );
};
