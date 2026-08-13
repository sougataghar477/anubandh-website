import React, { useEffect, useRef } from "react";

export type PopupType = "success" | "failure" | "confirmation";

export interface PopupProps {
  type: PopupType;
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

const Popup: React.FC<PopupProps> = ({
  type,
  visible,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Exit",
  confirmColor,
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

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          title: "text-emerald-400",
          badgeBg: "bg-emerald-500/10 text-emerald-400 ",
          defaultConfirmBg: "bg-emerald-600 hover:bg-emerald-500",
        };
      case "failure":
        return {
          title: "text-rose-400",
          badgeBg: "bg-rose-500/10 text-rose-400 ",
          defaultConfirmBg: "bg-rose-600 hover:bg-rose-500",
        };
      default:
        return {
          title: "text-zinc-100",
          badgeBg: "bg-lime-500/10 text-lime-400  ",
          defaultConfirmBg: "bg-lime-600 hover:bg-lime-500",
        };
    }
  };

  const styles = getTypeStyles();

  const handleClose = () => {
    if (visible) onCancel();
  };

  const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onCancel();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleOutsideClick}
      onClose={handleClose}
      className={`rounded-2xl bg-zinc-900   p-0 shadow-2xl backdrop:bg-black/20 backdrop:backdrop-blur-xs w-full max-w-sm m-auto text-zinc-100 overflow-hidden`}
    >
      <div className="px-5 py-10">
        {/* Status Header */}


        <h2 className={`text-xl font-semibold tracking-tight ${styles.title}`}>
          {title}
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-xl border border-zinc-700/60 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-700 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>

          {type === "confirmation" && (
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              style={confirmColor ? { backgroundColor: confirmColor } : undefined}
              className={`flex-1 border border-zinc-700/60 rounded-xl py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed ${
                !confirmColor ? styles.defaultConfirmBg : ""
              }`}
            >
              {loading ? "Processing..." : confirmText}
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default Popup;