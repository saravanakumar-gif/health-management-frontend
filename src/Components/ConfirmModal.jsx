import React from 'react'
import'../Styles/ConfirmModal.css';

const ConfirmModal = ({isOpen,title,message,onConfirm,onCancel}) => {
    if(!isOpen) return null;

  return (
    <div>
        <div className='model-content' onClick={(e)=>e.stopPropagation()}>
            <h2>{title}</h2>
            <p>{message}</p>
            <div className='modal-actions'>
                <button className='btn-cancel' onClick={onCancel}>Cancel</button>
                <button className='btn-confirm' onClick={onConfirm}>Confirm</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal