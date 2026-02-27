import React from 'react'
import '../Styles/Emptystate.css';

const EmptyState = ({icon='📭',title='No Data Found',message='There are no items to display',actionLabel,onAction}) => {
  return (
    <div className='empty-state'>
        <div className='empty-icon'>{icon}</div>
        <h3>{title}</h3>
        <p>{message}</p>
        {actionLabel&&onAction &&(
            <button className='empty-action-btn' onClick={onAction}>{actionLabel}</button>
        )}
    </div>
  );
};

export default EmptyState