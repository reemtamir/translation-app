import React from 'react';

export const Button = ({ type, onClick, className, icon }) => {
  return (
    <button onClick={onClick} type={type} className="btn">
      {icon}
    </button>
  );
};
