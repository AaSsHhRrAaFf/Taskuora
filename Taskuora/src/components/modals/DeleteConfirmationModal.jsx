

import React from "react";

const DeleteConfirmationModal = ({ onConfirm, onCancel, imageSrc }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
      <div className="relative max-w-md w-full bg-white rounded-3xl shadow-xl">
        <div className="p-6 text-center">
          {/* Illustration */}
          <div className="mx-auto flex items-center justify-center rounded-full bg-red-100">
            <img src={imageSrc} alt="Delete" className=" text-red-600" />
          </div>

          {/* Text content */}
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Are you Sure!!
          </h2>
          <p className="text-gray-500 mb-6">
            Do you want to delete this Task on this app?
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onConfirm}
              className="px-8 py-2 bg-emerald-400 text-gray-800 font-medium rounded-full hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-colors"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="px-8 py-2 bg-red-200 text-red-500 font-medium rounded-full hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-200 transition-colors"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
