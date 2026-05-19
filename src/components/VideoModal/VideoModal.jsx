import { useEffect, useRef } from 'react';

const VIDEO_ID = 'Wymz1-xInvs';

export function VideoModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (isOpen) {
      if (typeof el.showModal === 'function') el.showModal();
    } else {
      if (typeof el.close === 'function') el.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const handleCancel = (e) => { e.preventDefault(); onClose(); };
    el.addEventListener('cancel', handleCancel);
    return () => el.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) onClose();
  };

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      className="video-modal"
      aria-label="Conference talk video"
      onClick={handleBackdropClick}
    >
      <div className="video-modal-inner">
        <div className="video-modal-header">
          <span className="video-modal-title">
            Our adventure in building an internal developer platform
          </span>
          <button className="video-modal-close" onClick={onClose} aria-label="Close video">
            ×
          </button>
        </div>
        <div className="video-modal-embed">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1`}
            title="Conference talk: Our adventure in building an internal developer platform"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </dialog>
  );
}
