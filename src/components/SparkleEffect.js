import React, { useEffect } from 'react';
import Sparkle from 'react-sparkle';

const SparkleEffect = ({ children, color = '#FFD700', count = 20 }) => {
  useEffect(() => {
    // Suppress ResizeObserver loop limit exceeded error
    const resizeObserverError = window.addEventListener('error', (e) => {
      if (e.message === 'ResizeObserver loop limit exceeded') {
        e.stopPropagation();
        e.preventDefault();
      }
    });

    return () => {
      window.removeEventListener('error', resizeObserverError);
    };
  }, []);

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Sparkle
        color={color}
        count={count}
        minSize={7}
        maxSize={12}
        overflowPx={0}
        fadeOutSpeed={10}
        flicker={false}
      />
      {children}
    </div>
  );
};

export default SparkleEffect; 