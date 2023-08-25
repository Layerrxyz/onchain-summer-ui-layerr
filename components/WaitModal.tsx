import React from "react";

interface WaitModalProps {
  setIsOpen: Function;
  isOpen: boolean;
  modalTitle: string;
  modalBody: string;
}

function WaitModal({
  setIsOpen,
  isOpen,
  modalTitle,
  modalBody,
}: WaitModalProps) {
  return (
    isOpen && (
      <div
        className="fixed z-10 overflow-y-auto top-0 w-full left-0"
        id="modal"
      >
        <div className="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-900 opacity-75" />
          </div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
            &#8203;
          </span>
          <div
            className="inline-block align-center bg-white dark:bg-bg-secondary-dark rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white dark:bg-bg-secondary-dark px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <p className="font-medium text-gray-800">{modalTitle}</p>
              <p className="text-gray-600">{modalBody}</p>
            </div>
            <div className="px-4 py-3 flex justify-center py-4">
              <svg
                className="animate-spin -ml-1 mr-3 h-8 w-8 text-black dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  stroke="currentColor"
                  stroke-width="4"
                  cx="12"
                  cy="12"
                  r="10"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default WaitModal;
