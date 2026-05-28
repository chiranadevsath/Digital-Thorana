import React, { useState, useEffect } from "react";
import "./PopupModule.css";

const PopupModule = ({
  isOpen,
  onClose,
  title,
  content,
  onConfirm,
  onCancel,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "auto";
      }, 300);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div
      className={`popup-overlay ${isOpen ? "show" : "hide"}`}
      onClick={onClose}
    >
      <div
        className={`popup-container ${isOpen ? "show" : "hide"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="popup-header">
          <h3 className="popup-title">{title}</h3>
          <button className="popup-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="popup-body">
          <div className="popup-content">{content}</div>
        </div>
        <div className="popup-footer">
          {onCancel && (
            <button className="popup-btn popup-btn-cancel" onClick={onCancel}>
              Cancel
            </button>
          )}
          {onConfirm && (
            <button className="popup-btn popup-btn-confirm" onClick={onConfirm}>
              Confirm
            </button>
          )}
          {!onConfirm && !onCancel && (
            <button className="popup-btn popup-btn-close" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Custom hook for managing popup state
export const usePopup = () => {
  const [popupState, setPopupState] = useState({
    isOpen: false,
    title: "",
    content: "",
    onConfirm: null,
    onCancel: null,
  });

  const showPopup = (title, content, onConfirm = null, onCancel = null) => {
    setPopupState({
      isOpen: true,
      title,
      content,
      onConfirm: onConfirm
        ? () => {
            onConfirm();
            closePopup();
          }
        : null,
      onCancel: onCancel
        ? () => {
            onCancel();
            closePopup();
          }
        : null,
    });
  };

  const closePopup = () => {
    setPopupState((prev) => ({ ...prev, isOpen: false }));
  };

  return {
    popupProps: {
      isOpen: popupState.isOpen,
      onClose: closePopup,
      title: popupState.title,
      content: popupState.content,
      onConfirm: popupState.onConfirm,
      onCancel: popupState.onCancel,
    },
    showPopup,
    closePopup,
  };
};

export default PopupModule;
