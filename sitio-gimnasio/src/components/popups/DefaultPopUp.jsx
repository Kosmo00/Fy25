import React from 'react';
import ReactDOM from 'react-dom';

export default function DefaultPopupWrapper({ show, onClose, centered, children }) {

    if (!show)
        return null;

    return ReactDOM.createPortal(
        <div className='flex flex-col fixed bg-black/50 w-full h-full top-0 left-0 justify-center items-center z-50'
            onClick={onClose} onTouchEnd={onClose}>
            <div className={`flex flex-col items-center w-full h-full ${centered ? '' : 'mb-auto'}`}
                onClick={(e) => {
                    e.stopPropagation()
                    onClose()
                }}
                onTouchEnd={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div >,
        document.body
    );
};