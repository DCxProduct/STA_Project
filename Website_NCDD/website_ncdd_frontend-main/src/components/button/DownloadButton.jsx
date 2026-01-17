"use client";

import Image from "next/image";
import downloadIcon from "@/assets/images/icons/download.png"; // Update path if needed

function DownloadButton({ fileUrl }) {
  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("Failed to fetch file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "document.pdf"; // Optional: change filename
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-3 py-2 px-5 mt-3 rounded-lg border-[#C7DAED] border text-default shrink-0 shadow-md"
    >
      <span>ទាញយកឯកសារ</span>
      <Image src={downloadIcon} width={30} height={30} alt="icon" />
    </button>
  );
}

export default DownloadButton;
