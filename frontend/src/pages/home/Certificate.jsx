import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import domtoimage from "dom-to-image";
import logo from "/image.svg";
import signature from "/signature.png";

const Certificate = ({
  studentName,
  courseName,
  completionDate,
  instructor = "EduSphere Nepal",
}) => {
  const certificateRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    const node = certificateRef.current;
    if (!node) return;

    setIsGenerating(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));

      const scale = 3;

      const dataUrl = await domtoimage.toPng(node, {
        cacheBust: true,
        quality: 1,
        height: node.offsetHeight * scale,
        width: node.offsetWidth * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        },
      });

      const pdf = new jsPDF("landscape", "mm", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${studentName}-${courseName}-certificate.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div
        ref={certificateRef}
        className="w-[1123px] h-[794px] bg-white border-[8px] border-amber-600 p-10"
        style={{
          fontFamily: "'Times New Roman', Times, serif",
        }}
      >
        <div className="h-full border-[4px] border-amber-500 flex flex-col justify-center items-center text-black relative">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{
              backgroundImage: `url(${logo})`,
              backgroundSize: "50%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <h1 className="text-4xl font-bold text-amber-800 mb-4 z-10">
            Certificate of Completion
          </h1>
          <p className="text-xl z-10">This is proudly presented to</p>
          <h2 className="text-3xl font-bold my-2 capitalize z-10">
            {studentName}
          </h2>
          <p className="text-xl z-10">for successfully completing</p>
          <h3 className="text-2xl capitalize italic text-blue-700 font-semibold my-2 z-10">
            &quot;{courseName}&quot;
          </h3>
          <p className="mt-4 z-10">Date of Completion</p>
          <p className="z-10">{completionDate}</p>
          <div className="mt-12 text-right self-end pr-20">
            <img
              src={signature}
              alt="Signature"
              style={{ height: "80px" }}
              crossOrigin="anonymous"
            />
            <div className="border-t w-40 mt-1 text-sm pt-1">{instructor}</div>
          </div>
        </div>
      </div>

      <button
        onClick={generatePDF}
        disabled={isGenerating}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
      >
        {isGenerating ? "Generating..." : "Download Certificate"}
      </button>
    </div>
  );
};

export default Certificate;
