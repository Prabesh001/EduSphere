import { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import domtoimage from "dom-to-image";
import logo from "/image.svg";
import signature from "/signature.png";
import { toast } from "react-toastify";
import { FiDownload, FiX, FiEye } from "react-icons/fi";

const Certificate = ({
  studentName,
  courseName,
  completionDate,
  instructor = "EduSphere Nepal",
}) => {
  const certificateRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const generatePDF = async () => {
    const node = certificateRef.current;
    if (!node) return;

    setIsGenerating(true);
    try {
      // Add a small delay to ensure all elements are properly rendered
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Increase scale for better quality
      const scale = 2;

      // Use improved options for dom-to-image
      const dataUrl = await domtoimage.toPng(node, {
        quality: 1,
        width: node.offsetWidth * scale,
        height: node.offsetHeight * scale,
        style: {
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        },
        bgcolor: "#ffffff", // Ensure white background
        cacheBust: true,
      });

      // Create PDF in landscape orientation
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Calculate dimensions to fit the PDF
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // Add image to PDF
      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        "FAST"
      );

      // Save the PDF
      pdf.save(`${studentName}-${courseName}-certificate.pdf`);
      toast.success("Certificate downloaded successfully! 🎉");
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Certificate Preview UI */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
        <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Congratulations🎉
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setIsViewerOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
            >
              <FiEye /> View Certificate
            </button>
            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <FiDownload />
              {isGenerating ? "Generating..." : "Download"}
            </button>
          </div>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold dark:text-gray-800 text-white text-lg">
                Certificate of Completion
              </h3>
              <p className="text-gray-600">
                Issued to {studentName} for completing {courseName} course
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actual Certificate */}
      <div className="fixed -left-[9999px] -top-[9999px]">
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
              <div className="border-t w-40 mt-1 text-sm pt-1">
                {instructor}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate for UI */}
      {isViewerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-screen overflow-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">Certificate Preview</h3>
              <button
                onClick={() => setIsViewerOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="p-4 flex justify-center">
              <div className="w-full max-w-4xl border-[8px] border-amber-600 p-10 bg-white">
                <div className="h-full border-[4px] border-amber-500 flex flex-col justify-center items-center text-black relative p-8">
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
                    <div className="border-t w-40 mt-1 text-sm pt-1">
                      {instructor}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end">
              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <FiDownload />
                {isGenerating ? "Generating..." : "Download Certificate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;
