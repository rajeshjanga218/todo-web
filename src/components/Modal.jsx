import React from "react";
import ReactDOM from "react-dom";

function Modal({ isOpen, closeModal }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-white p-6 rounded-lg shadow-lg">
        <button
          type="button"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          Close
        </button>
        <h1 className="text-2xl font-semibold mb-4">Modal</h1>
        <p className="text-gray-600">This is the content of the modal.</p>
      </div>
    </div>,
    document.body
  );
}

export default Modal;
