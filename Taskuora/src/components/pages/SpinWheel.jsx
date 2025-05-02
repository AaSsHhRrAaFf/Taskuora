
import React, { useState } from "react";
import { Clock, ChevronDown } from "lucide-react";

const SpinWheel = () => {
  const [selectedCategory, setSelectedCategory] = useState("Art and Craft");

  const categories = [
    "Art and Craft",
    "Nature",
    "Family",
    "Sport",
    "Friends",
    "Meditation",
  ];

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-[804px] w-full bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md p-8 w-[1320px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Spin Wheel</h2>
        </div>

        {/* Spin Wheel Container */}
        <div className="flex flex-col items-center">
          {/* Spin Wheel */}
          <div className="relative w-64 h-64 rounded-full bg-gradient-to-r from-blue-300 to-green-300 border-orange-500 border-8 border-dashed">
            <div className="absolute w-3 h-3 bg-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            {/* Segments would be implemented here using SVG or Canvas */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-green-500">
              &#9650;
            </div>
          </div>
          <p className="mt-4 text-gray-500">Spin Wheel to pick your task</p>

          {/* Controls */}
          <div className="mt-8 flex flex-col items-center">
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <button className="mt-6 bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-2 px-4 rounded-full shadow-md flex items-center justify-center">
              <span>Spin</span>
              <Clock className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
