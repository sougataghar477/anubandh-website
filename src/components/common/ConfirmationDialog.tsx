import React, { useEffect, useRef } from "react";

interface ConfirmationDialogProps {
  type: string;
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  loading?: boolean;
  onConfirm?: () => void;
  onCancel: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  type,
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "#DC2626",
  loading = false,
  onConfirm,
  onCancel,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (visible && !dialog.open) {
      dialog.showModal();
    } else if (!visible && dialog.open) {
      dialog.close();
    }
  }, [visible]);

  const titleColor = () => {
    if (type === "success") return "text-green-500";
    if (type === "failure") return "text-red-500";
    return "text-white";
  };

  // Handles Escape key press and backdrop close
  const handleClose = () => {
    if (visible) {
      onCancel();
    }
  };
function testingClickOnOutside(e: React.MouseEvent<HTMLDialogElement>) {
  if (!(e.target instanceof HTMLElement)) return;
  const dialog = dialogRef.current;
  if(!dialog) return;
  const clickedOutsidePopup =
    !e.target.parentElement?.closest("#confirmPopup");
  if(clickedOutsidePopup){
    dialog.close();
  }
}
  return (
    <dialog
      id = "confirmPopup"
      onClick={testingClickOnOutside}
      ref={dialogRef}
      onClose={handleClose}
      className="rounded-3xl bg-[#111111] p-0 border border-[#2B2B2B] shadow-2xl backdrop:bg-black/60 w-full max-w-sm m-auto"
    >
      <div className="p-6">
        <h2 className={`text-xl font-bold ${titleColor()}`}>{title}</h2>

        <p className="mt-3 text-base text-gray-300">{message}</p>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-2xl border border-gray-600 py-3 font-semibold text-white transition hover:bg-gray-700 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>

          {type === "confirmation" && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              style={{ backgroundColor: confirmColor }}
              className="flex-1 rounded-2xl py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed"
            >
              {loading ? "Please wait..." : confirmText}
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmationDialog;