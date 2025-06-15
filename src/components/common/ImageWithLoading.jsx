import React, { useState } from 'react';

const ImageWithLoading = ({ src, alt, className }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="relative">
      {isImageLoading && (
        <div className={`${className} bg-gray-200 relative overflow-hidden`}>
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isImageLoading ? 'hidden' : 'block'}`}
        onLoad={() => setIsImageLoading(false)}
      />
    </div>
  );
};

export default ImageWithLoading; 