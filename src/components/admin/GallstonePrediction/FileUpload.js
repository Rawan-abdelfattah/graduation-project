import React, { useCallback, useState } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';

export const FileUpload= ({
  onFileUpload,
  uploadedFile,
  isProcessing
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState(null);

  const validateFile = (file)=> {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file only');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return false;
    }
    setError(null);
    return true;
  };

  const handleFileSelection = (file) => {
    if (validateFile(file)) {
      onFileUpload(file);
    }
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const removeFile = () => {
    onFileUpload(null );
    setError(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {!uploadedFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer hover:border-green-600
            ${isDragOver 
              ? 'bg-green-50 scale-105 border-green-600' 
              : 'border-slate-300 hover:bg-slate-50'
            }`}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isProcessing}
          />
          
          <div className="space-y-4">
            <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
              ${isDragOver ? 'bg-green-100' : 'bg-slate-100'}`}>
              <Upload className={`w-8 h-8 transition-colors duration-300`} style={{color: isDragOver ? '#3B8F4F' : '#64748b'}} />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                {isDragOver ? 'Drop your PDF here' : 'Upload PDF Document'}
              </h3>
              <p className="text-slate-500 mb-4">
                Drag and drop your PDF file here, or click to browse
              </p>
              <div className="inline-flex items-center px-6 py-3 text-white rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:opacity-90" style={{background: '#3B8F4F'}}>
                <Upload className="w-4 h-4 mr-2" />
                Choose File
              </div>
            </div>
            
            <p className="text-sm text-slate-400">
              Supports PDF files up to 10MB
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  {uploadedFile.name}
                </h4>
                <p className="text-sm text-slate-500">
                  {formatFileSize(uploadedFile.size)} • Ready for analysis
                </p>
              </div>
            </div>
            
            {!isProcessing && (
              <button
                onClick={removeFile}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <div className="bg-red-100 p-2 rounded-lg mr-3">
              <X className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-red-700 font-medium">Upload Error</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};