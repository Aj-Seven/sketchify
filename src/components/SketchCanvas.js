import React, { useRef, useEffect } from "react";

const SketchCanvas = ({
  imageSrc,
  imageBitmap,
  grayscale,
  blurAmount,
  contrast,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (imageBitmap) {
      processImage();
    }
  }, [imageBitmap, grayscale, blurAmount, contrast]);

  const applyFilter = (bmp, filters = "") => {
    const canvas = document.createElement("canvas");
    canvas.width = bmp.width;
    canvas.height = bmp.height;
    const ctx = canvas.getContext("2d");
    ctx.filter = filters;
    ctx.drawImage(bmp, 0, 0);
    return canvas;
  };

  const generateSketch = (bnw, blur) => {
    const canvas = document.createElement("canvas");
    canvas.width = bnw.width;
    canvas.height = bnw.height;
    canvas.__skipFilterPatch = true;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(bnw, 0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "color-dodge";
    ctx.drawImage(blur, 0, 0, canvas.width, canvas.height);

    ctx.globalCompositeOperation = "source-over";
    ctx.filter = `contrast(${contrast})`;
    ctx.drawImage(canvas, 0, 0);

    return canvas;
  };

  const processImage = async () => {
    if (!imageBitmap) return;

    const bnw = applyFilter(imageBitmap, `grayscale(${grayscale})`);
    const blur = applyFilter(
      imageBitmap,
      `grayscale(${grayscale}) invert(1) blur(${blurAmount}px)`
    );

    const sketchCanvas = generateSketch(bnw, blur);
    const mainCanvas = canvasRef.current;
    const ctx = mainCanvas.getContext("2d");

    mainCanvas.width = sketchCanvas.width;
    mainCanvas.height = sketchCanvas.height;
    ctx.drawImage(sketchCanvas, 0, 0);
  };

  const downloadSketch = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "sketch.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center items-center gap-6 mt-6">
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Original"
            className="border border-gray-300 shadow-lg w-64 h-auto"
          />
        )}
        <canvas
          ref={canvasRef}
          className="border border-gray-300 shadow-lg w-64 h-auto"
        ></canvas>
      </div>
      <button
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
        onClick={downloadSketch}
      >
        Download Sketch
      </button>
    </div>
  );
};

export default SketchCanvas;
