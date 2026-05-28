import React, { useState, useEffect } from "react";
import "./PopupModule.css";

const PopupModule = ({
  isOpen,
  onClose,
  title,
  content,
  onConfirm,
  onCancel,
  image,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer;

    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "auto";
      }, 300);
    }

    return () => {
      clearTimeout(timer);
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
        {/* HEADER */}
        <div className="popup-header">
          <h3 className="popup-title">{title}</h3>
          <button className="popup-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* BODY */}
        <div className="popup-body split-layout">
          {image && (
            <div className="popup-image">
              <img src={image} alt="story visual" />
            </div>
          )}

          <div className="popup-content">{content}</div>
        </div>

        {/* FOOTER */}
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

export const usePopup = () => {
  const [popupState, setPopupState] = useState({
    isOpen: false,
    title: "",
    content: "",
    image: null,
    onConfirm: null,
    onCancel: null,
  });

  const closePopup = () => {
    setPopupState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const showPopup = (
    title,
    content,
    onConfirm = null,
    onCancel = null,
    image = null,
  ) => {
    setPopupState({
      isOpen: true,
      title,
      content,
      image,
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

  return {
    popupProps: {
      isOpen: popupState.isOpen,
      onClose: closePopup,
      title: popupState.title,
      content: popupState.content,
      image: popupState.image,
      onConfirm: popupState.onConfirm,
      onCancel: popupState.onCancel,
    },
    showPopup,
    closePopup,
  };
};

export default PopupModule;
