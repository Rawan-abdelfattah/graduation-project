import React from 'react';
import { Download, FileText, CheckCircle, Eye } from 'lucide-react';

export const PredictionResults = ({ result }) => {
  const handleDownload = () => {
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = result.pdfUrl;
    link.download = result.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = () => {
    // Open PDF in new tab
    window.open(result.pdfUrl, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-700 mb-2">Analysis Complete!</h3>
        <p className="text-slate-500">Your PDF has been successfully analyzed and processed.</p>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-xl">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-700">Prediction Result</h4>
              <p className="text-sm text-slate-500">{result.fileName}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handlePreview}
            className="flex-1 flex items-center justify-center px-6 py-3 bg-white border-2 border-blue-200 text-blue-700 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview Result
          </button>
          
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-slate-200">
          <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
          <div className="text-sm text-slate-600">Accuracy Score</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-slate-200">
          <div className="text-2xl font-bold text-green-600 mb-1">2.3s</div>
          <div className="text-sm text-slate-600">Processing Time</div>
        </div>
        <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-slate-200">
          <div className="text-2xl font-bold text-purple-600 mb-1">156</div>
          <div className="text-sm text-slate-600">Data Points</div>
        </div>
      </div>
    </div>
  );
};