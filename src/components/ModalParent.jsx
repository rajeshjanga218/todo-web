import React, { useState } from "react";
import Modal from "./Modal";

function ModalParent() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div className="bg-red-500 text-red-200">
      <h1>Modal Parent page</h1>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isOpen} closeModal={closeModal} />
    </div>
  );
}

export default ModalParent;
