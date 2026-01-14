"use client";
const PDFViewer = ({ pdfUrl }) => {
  const viewerUrl = `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(
    pdfUrl
  )}`;
  return (
    <iframe
      src={viewerUrl}
      width="100%"
      height="900px"
      style={{ border: "none" }}
    />
  );
};

export default PDFViewer;
