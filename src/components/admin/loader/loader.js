import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Importing a loading icon from react-icons

const Loader = ({ active }) => {
  return (
    <div
      className={`loader position-absolute ${active ? '' : 'd-none'}`}
      style={containerStyle}
    >
      {active && (
        <AiOutlineLoading3Quarters className="loading-icon" style={iconStyle} />
      )}
    </div>
  );
};

const containerStyle = {
  width: '92%',
  height: '50%', 
  zIndex: 10000,
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center', // Center the icon vertically
  overflow: 'hidden',
};

const iconStyle = {
  fontSize: '50px', // Size of the loading icon
  color: '#3B8F4F', // Color of the loading icon
  animation: 'spin 1s linear infinite', // Adding spin animation
};

// Adding keyframes for spinning animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(
  `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}`,
  styleSheet.cssRules.length,
);

export default Loader;
