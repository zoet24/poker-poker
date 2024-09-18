// Generic modal component that when opened it appears on top of rest of app
// It has a close modal in top right corner and can also be closed by clicking on outside of modal
// It has a title
// And a row of action buttons at bottom

import { ReactNode } from "react";
import FocusLock from "react-focus-lock";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content">
        <FocusLock autoFocus={false}>
          <div onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-5 bg-blue-200">
              {title && <h2 className="modal-title">{title}</h2>}
              <button className="modal-close-button" onClick={onClose}>
                &times;
              </button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </FocusLock>
      </div>
    </div>
  );
};

export default Modal;
