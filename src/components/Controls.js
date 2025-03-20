import React from "react";

const Controls = ({
  grayscale,
  setGrayscale,
  blurAmount,
  setBlurAmount,
  contrast,
  setContrast,
}) => {
  return (
    <div className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mt-6">
      <label className="block text-gray-700 font-medium">Grayscale</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={grayscale}
        onChange={(e) => setGrayscale(parseFloat(e.target.value))}
        className="w-full mb-2"
      />

      <label className="block text-gray-700 font-medium">Blur</label>
      <input
        type="range"
        min="1"
        max="10"
        step="0.5"
        value={blurAmount}
        onChange={(e) => setBlurAmount(parseFloat(e.target.value))}
        className="w-full mb-2"
      />

      <label className="block text-gray-700 font-medium">Contrast</label>
      <input
        type="range"
        min="1"
        max="3"
        step="0.1"
        value={contrast}
        onChange={(e) => setContrast(parseFloat(e.target.value))}
        className="w-full"
      />
    </div>
  );
};

export default Controls;
