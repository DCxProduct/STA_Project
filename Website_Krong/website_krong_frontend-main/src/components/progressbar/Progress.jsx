"use client";
import React from "react";
import NextNProgress from "nextjs-progressbar";

const Progress = () => {
  return (
    <NextNProgress
      color="#29D"
      startPosition={0.3}
      stopDelayMs={200}
      height={3}
      showOnShallow={true}
    />
  );
};

export default Progress;
