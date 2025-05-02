
import React from "react";

const SuccessModal = ({ onClose, imageSrc }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="relative max-w-lg p-5 border w-full shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center  rounded-full bg-green-100">
            <img
              src={imageSrc}
              alt="Success"
              className="h-full w-full object-contain text-green-600"
            />
          </div>

          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Task Completed Successfully!
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Congratulations! You have successfully completed the task.
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Okay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
